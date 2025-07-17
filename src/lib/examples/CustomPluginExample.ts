import type { EditorPlugin } from '../types/plugin'

// Example of creating a custom plugin
export const highlightPlugin: EditorPlugin = {
  command: 'highlight',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v17a1 1 0 0 1-1 1H4a2 2 0 0 1-2-2V3a1 1 0 0 1 1-1h3"/><path d="M8 3h4"/><path d="M8 7v13"/><path d="M16 5l-4 4"/><path d="M20 9l-4 4"/></svg>',
  title: 'Highlight Text',
  execute: () => {
    document.execCommand('hiliteColor', false, 'yellow')
  },
  isActive: () => false
}

// Example of a more complex custom plugin
export const insertDatePlugin: EditorPlugin = {
  command: 'insertDate',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  title: 'Insert Current Date',
  execute: () => {
    const now = new Date()
    const dateString = now.toLocaleDateString()
    document.execCommand('insertText', false, dateString)
  },
  isActive: () => false
}

// Example of a plugin that works with selected text
export const uppercasePlugin: EditorPlugin = {
  command: 'uppercase',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,9 12,3 18,9"/><path d="M12 3v18"/></svg>',
  title: 'Convert to Uppercase',
  execute: () => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      const selectedText = selection.toString()
      const uppercaseText = selectedText.toUpperCase()
      document.execCommand('insertText', false, uppercaseText)
    }
  },
  isActive: () => false
}

// Example usage:
/*
// In your Vue component:
import { VHtmlEditor } from './lib/VHtmlEditor.vue'
import { defaultPlugins } from './lib/plugins'
import { highlightPlugin, insertDatePlugin, uppercasePlugin } from './lib/examples/CustomPluginExample'

// Use with custom plugins
const customPlugins = [
  ...defaultPlugins,
  highlightPlugin,
  insertDatePlugin,
  uppercasePlugin
]

// In template:
<VHtmlEditor 
  v-model="content" 
  :plugins="customPlugins"
  :toolbar-always-show="true"
/>

// Or create your own plugin registry:
import { EditorPluginRegistry } from './lib/plugins'

const myRegistry = new EditorPluginRegistry()
myRegistry.register(highlightPlugin)
myRegistry.register(insertDatePlugin)

// Use only specific plugins
const myPlugins = [highlightPlugin, insertDatePlugin]
*/ 