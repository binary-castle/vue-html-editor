# HTML Editor Plugin System

This HTML editor uses a plugin-based architecture that allows you to easily extend functionality and create custom toolbar actions.

## Basic Usage

### Using Default Plugins

```vue
<template>
  <VHtmlEditor v-model="content" />
</template>

<script setup>
import { ref } from 'vue'
import VHtmlEditor from './lib/VHtmlEditor.vue'

const content = ref('<p>Start typing...</p>')
</script>
```

### Using Custom Plugin Set

```vue
<template>
  <VHtmlEditor v-model="content" :plugins="customPlugins" />
</template>

<script setup>
import { ref } from 'vue'
import VHtmlEditor from './lib/VHtmlEditor.vue'
import { boldPlugin, italicPlugin, linkPlugin } from './lib/plugins'

const content = ref('<p>Start typing...</p>')

// Use only specific plugins
const customPlugins = [
  boldPlugin,
  italicPlugin,
  linkPlugin
]
</script>
```

## Creating Custom Plugins

### Plugin Interface

Every plugin must implement the `EditorPlugin` interface:

```typescript
interface EditorPlugin {
  command: string           // Unique command identifier
  icon: string             // SVG icon as string
  title: string            // Tooltip text
  execute: (editorElement: HTMLElement) => void  // Function to execute
  isActive?: () => boolean // Optional: check if command is active
}
```

### Simple Plugin Example

```typescript
import type { EditorPlugin } from './lib/types/plugin'

export const highlightPlugin: EditorPlugin = {
  command: 'highlight',
  icon: '<svg>...</svg>', // Your SVG icon
  title: 'Highlight Text',
  execute: () => {
    document.execCommand('hiliteColor', false, 'yellow')
  },
  isActive: () => false
}
```

### Advanced Plugin Example

```typescript
export const insertDatePlugin: EditorPlugin = {
  command: 'insertDate',
  icon: '<svg>...</svg>',
  title: 'Insert Current Date',
  execute: () => {
    const now = new Date()
    const dateString = now.toLocaleDateString()
    document.execCommand('insertText', false, dateString)
  },
  isActive: () => false
}
```

### Plugin with User Input

```typescript
export const customLinkPlugin: EditorPlugin = {
  command: 'customLink',
  icon: '<svg>...</svg>',
  title: 'Insert Custom Link',
  execute: () => {
    const url = prompt('Enter URL:')
    const text = prompt('Enter link text:')
    
    if (url && text) {
      const link = `<a href="${url}" target="_blank">${text}</a>`
      document.execCommand('insertHTML', false, link)
    }
  },
  isActive: () => false
}
```

## Using the Plugin Registry

### Manual Registration

```typescript
import { EditorPluginRegistry } from './lib/plugins'
import { myCustomPlugin } from './my-plugins'

const registry = new EditorPluginRegistry()
registry.register(myCustomPlugin)

// Get all plugins
const allPlugins = registry.getPlugins()

// Execute a command
registry.executeCommand('myCommand', editorElement)
```

### Combining Default and Custom Plugins

```vue
<template>
  <VHtmlEditor v-model="content" :plugins="allPlugins" />
</template>

<script setup>
import { defaultPlugins } from './lib/plugins'
import { myCustomPlugin1, myCustomPlugin2 } from './my-plugins'

const allPlugins = [
  ...defaultPlugins,
  myCustomPlugin1,
  myCustomPlugin2
]
</script>
```

## Available Default Plugins

- **boldPlugin** - Bold text formatting
- **italicPlugin** - Italic text formatting  
- **underlinePlugin** - Underline text formatting
- **strikeThroughPlugin** - Strikethrough text formatting
- **removeFormatPlugin** - Remove all formatting
- **unorderedListPlugin** - Create bullet lists
- **orderedListPlugin** - Create numbered lists
- **linkPlugin** - Insert links
- **imagePlugin** - Insert images

## Plugin Development Tips

1. **Command Names**: Use unique, descriptive command names to avoid conflicts
2. **Icons**: Use SVG strings for scalable, customizable icons
3. **Error Handling**: Add proper error handling in your execute functions
4. **State Management**: Use the `isActive` function for toggleable commands
5. **Selection Awareness**: Check for text selection when relevant

## External Plugin Usage

You can create plugins in separate projects and import them:

```typescript
// my-external-plugin.ts
import type { EditorPlugin } from 'vue-html-editor/lib/types/plugin'

export const myExternalPlugin: EditorPlugin = {
  command: 'externalCommand',
  icon: '<svg>...</svg>',
  title: 'My External Plugin',
  execute: () => {
    // Your custom logic
  }
}
```

```vue
<!-- In your project -->
<template>
  <VHtmlEditor v-model="content" :plugins="pluginsWithExternal" />
</template>

<script setup>
import { defaultPlugins } from 'vue-html-editor/lib/plugins'
import { myExternalPlugin } from './my-external-plugin'

const pluginsWithExternal = [
  ...defaultPlugins,
  myExternalPlugin
]
</script>
```

This plugin system provides maximum flexibility while maintaining simplicity and performance. 