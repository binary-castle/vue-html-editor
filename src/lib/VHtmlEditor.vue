<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { createPopper, type Instance as PopperInstance } from '@popperjs/core'
import { EditorPluginRegistry, defaultPlugins, type EditorPlugin } from './plugins'

interface Props {
  toolbarAlwaysShow?: boolean
  plugins?: EditorPlugin[]
  css?: string
  noEditorClasses?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  toolbarAlwaysShow: false,
  plugins: () => defaultPlugins,
  css: '',
  noEditorClasses: false
})

const model = defineModel<string>()

// Auto-scope CSS for the editor
const scopedCss = computed(() => {
  if (!props.css) return ''
  
  // Split CSS into rules and scope each one
  return props.css
    .replace(/([^{}]+){/g, (match, selector) => {
      // Clean up the selector
      const cleanSelector = selector.trim()
      
      // Skip keyframes, media queries, and other @ rules
      if (cleanSelector.startsWith('@')) {
        return match
      }
      
      // Add .v-html-editor scope to each selector
      const scopedSelector = cleanSelector
        .split(',')
        .map((s: string) => `.v-html-editor ${s.trim()}`)
        .join(', ')
      
      return `${scopedSelector} {`
    })
})

const editorRef = ref<HTMLElement>()
const toolbarRef = ref<HTMLElement>()

let popperInstance: PopperInstance | null = null
const showToolbar = ref(false)
const isToolbarHovered = ref(false)
const isEditorFocused = ref(false)
let debounceTimer: number | null = null

// Initialize plugin registry
const pluginRegistry = new EditorPluginRegistry()

// Register all plugins
onMounted(() => {
  props.plugins.forEach(plugin => {
    pluginRegistry.register(plugin)
  })
})

// Watch for plugin changes
watch(() => props.plugins, (newPlugins) => {
  pluginRegistry.clear()
  newPlugins.forEach(plugin => {
    pluginRegistry.register(plugin)
  })
}, { deep: true })

// Handle content changes
const onInput = (event: Event) => {
  const target = event.target as HTMLElement
  model.value = target.innerHTML
}

// Cleanup popper instance
const cleanupPopper = () => {
  if (popperInstance) {
    popperInstance.destroy()
    popperInstance = null
  }
}

// Check if selection is within this editor instance
const isSelectionInEditor = (selection: Selection): boolean => {
  if (!selection.rangeCount || !editorRef.value) return false
  
  const range = selection.getRangeAt(0)
  const commonAncestor = range.commonAncestorContainer
  
  // Check if the selection is within our editor element
  return editorRef.value.contains(commonAncestor) || editorRef.value === commonAncestor
}

// Handle selection changes with debouncing
const onSelectionChange = () => {
  // Clear any existing debounce timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  debounceTimer = window.setTimeout(() => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
      hideToolbar()
      return
    }

    // Only proceed if selection is within this editor instance
    if (!isSelectionInEditor(selection)) {
      hideToolbar()
      return
    }

    const range = selection.getRangeAt(0)
    
    // Show toolbar if there's selected text OR if toolbarAlwaysShow is true
    if ((!range.collapsed && selection.toString().trim()) || props.toolbarAlwaysShow) {
      showToolbarAtSelection(range)
    } else {
      hideToolbar()
    }
  }, 50) // 50ms debounce to prevent rapid fire events
}

// Handle cursor position changes for always show mode
const onCursorChange = () => {
  if (props.toolbarAlwaysShow) {
    // Clear any existing debounce timer
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    debounceTimer = window.setTimeout(() => {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0 && isSelectionInEditor(selection)) {
        const range = selection.getRangeAt(0)
        showToolbarAtSelection(range)
      }
    }, 50)
  }
}

// Handle editor focus
const onEditorFocus = () => {
  isEditorFocused.value = true
}

// Handle editor blur
const onEditorBlur = () => {
  isEditorFocused.value = false
  // Hide toolbar when editor loses focus, unless toolbar is being hovered
  setTimeout(() => {
    if (!isToolbarHovered.value) {
      showToolbar.value = false
      cleanupPopper()
    }
  }, 100)
}

// Handle scroll events to update toolbar position
const onScroll = () => {
  if (showToolbar.value && popperInstance) {
    popperInstance.update()
  }
}

// Check if position is valid (not at 0,0 or outside editor)
const isValidPosition = (rect: DOMRect, editorElement: HTMLElement): boolean => {
  if (!editorElement) return false
  
  const editorRect = editorElement.getBoundingClientRect()
  
  // Check if the rect has valid dimensions and is within or near the editor
  return rect.top > 0 && 
         rect.left > 0 && 
         rect.top >= editorRect.top - 100 && 
         rect.top <= editorRect.bottom + 100 &&
         rect.left >= editorRect.left - 100 && 
         rect.left <= editorRect.right + 100
}

// Show toolbar at selection
const showToolbarAtSelection = (range: Range) => {
  if (!toolbarRef.value || !editorRef.value) return

  const rect = range.getBoundingClientRect()
  
  // Validate position before showing toolbar
  if (!isValidPosition(rect, editorRef.value)) {
    // If position is invalid, try to get the editor's position instead
    const editorRect = editorRef.value.getBoundingClientRect()
    if (editorRect.top === 0 && editorRect.left === 0) {
      // Editor itself is not visible, hide toolbar
      hideToolbar()
      return
    }
    
    // Use editor's top-left as fallback, but position it better
    const fallbackRect = new DOMRect(
      editorRect.left + 20,
      editorRect.top + 20,
      0,
      0
    )
    
    const virtualElement = {
      getBoundingClientRect: () => fallbackRect,
    }
    
    createToolbarPopper(virtualElement)
    return
  }
  
  // For collapsed ranges (cursor position), use the cursor position
  // For text selection, use the selection bounds
  const virtualElement = {
    getBoundingClientRect: (): DOMRect => {
      const domRect = new DOMRect(
        range.collapsed ? rect.left : rect.left + rect.width / 2,
        rect.top - 10,
        0,
        0
      )
      return domRect
    },
  }

  createToolbarPopper(virtualElement)
}

// Create popper instance
const createToolbarPopper = (virtualElement: any) => {
  if (!toolbarRef.value) return
  
  // Always cleanup existing popper first
  cleanupPopper()

  popperInstance = createPopper(virtualElement, toolbarRef.value, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'viewport',
          padding: 8,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom', 'top'],
        },
      },
    ],
  })

  showToolbar.value = true
}

// Hide toolbar
const hideToolbar = () => {
  if (props.toolbarAlwaysShow) return // Don't hide if always show is enabled
  
  setTimeout(() => {
    if (!isToolbarHovered.value) {
      showToolbar.value = false
      cleanupPopper()
    }
  }, 100)
}

// Execute formatting command
const executeCommand = (command: string) => {
  if (editorRef.value) {
    pluginRegistry.executeCommand(command, editorRef.value)
    
    // Update model after command execution
    nextTick(() => {
      if (editorRef.value) {
        model.value = editorRef.value.innerHTML
      }
    })
  }
}

// Check if command is active
const isCommandActive = (command: string): boolean => {
  const plugin = pluginRegistry.getPlugin(command)
  return plugin?.isActive ? plugin.isActive() : false
}

// Watch for model changes from parent
watch(model, (newValue) => {
  if (editorRef.value && editorRef.value.innerHTML !== newValue) {
    editorRef.value.innerHTML = newValue || ''
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('selectionchange', onSelectionChange)
  window.addEventListener('scroll', onScroll, true) // Use capture to catch all scroll events
  
  // Set initial content
  if (editorRef.value && model.value) {
    editorRef.value.innerHTML = model.value
  }
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', onSelectionChange)
  window.removeEventListener('scroll', onScroll, true)
  
  // Clear debounce timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  // Cleanup popper
  cleanupPopper()
})
</script>

<template>
  <div class="v-html-editor relative">
    <!-- Main Editor -->
    <div
      ref="editorRef"
      contenteditable="true"
      @input="onInput"
      @mouseup="onSelectionChange"
      @keyup="onSelectionChange"
      @click="onCursorChange"
      @focus="onEditorFocus"
      @blur="onEditorBlur"
      :class="!props.noEditorClasses ? [
        'min-h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent prose prose-sm max-w-none',
        { 'editor-styled': props.css }
      ] : { 'editor-styled': props.css }"
      :style="!props.noEditorClasses ? 'white-space: pre-wrap;' : undefined"
    />

    <!-- Floating Toolbar -->
    <Teleport to="body">
      <div
        v-show="showToolbar"
        ref="toolbarRef"
        @mouseenter="isToolbarHovered = true"
        @mouseleave="isToolbarHovered = false; hideToolbar()"
        class="fixed z-10000 bg-gray-800 text-white rounded-lg shadow-lg p-2 flex items-center space-x-1"
      >
        <button
          v-for="plugin in pluginRegistry.getPlugins()"
          :key="plugin.command"
          @click="executeCommand(plugin.command)"
          :class="[
            'px-2 py-1 rounded text-sm font-medium transition-colors duration-150 flex items-center justify-center',
            isCommandActive(plugin.command)
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-700 text-gray-200'
          ]"
          :title="plugin.title"
        >
          <span v-html="plugin.icon" class="w-4 h-4"></span>
        </button>
      </div>
    </Teleport>

    <!-- Dynamic CSS injection -->
    <component :is="'style'" v-if="scopedCss">{{ scopedCss }}</component>
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: none;
}

/* When custom CSS is provided, remove default editor styling */
.editor-styled {
  border: none !important;
  padding: 0 !important;
  min-height: auto !important;
  background: transparent !important;
}

.editor-styled:focus {
  outline: none !important;
  ring: none !important;
  border: none !important;
  box-shadow: none !important;
}

[contenteditable] p {
  margin: 0.5rem 0;
}

[contenteditable] ul,
[contenteditable] ol {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

[contenteditable] li {
  margin: 0.25rem 0;
}

[contenteditable] a {
  color: #3b82f6;
  text-decoration: underline;
}

[contenteditable] strong,
[contenteditable] b {
  font-weight: bold;
}

[contenteditable] em,
[contenteditable] i {
  font-style: italic;
}

[contenteditable] u {
  text-decoration: underline;
}

[contenteditable] s,
[contenteditable] strike {
  text-decoration: line-through;
}

[contenteditable] img {
  max-width: 100%;
  height: auto;
  margin: 0.5rem 0;
  border-radius: 0.375rem;
}
</style>