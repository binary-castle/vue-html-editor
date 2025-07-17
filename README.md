# Vue HTML Editor

A powerful and extensible HTML editor component for Vue 3 with plugin support.

## Features

- 🎨 Rich text editing with contenteditable
- 🔌 Extensible plugin system
- 🎯 Floating toolbar that appears on text selection
- 📱 Responsive and accessible design
- 🎛️ Customizable toolbar options
- 💾 Two-way data binding with v-model
- 🎨 Built with Tailwind CSS

## Installation

```bash
npm install vue-html-editor
```

Or with yarn:

```bash
yarn add vue-html-editor
```

## Basic Usage

```vue
<template>
  <div>
    <VHtmlEditor v-model="content" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VHtmlEditor } from 'vue-html-editor'
import 'vue-html-editor/dist/vue-html-editor.css'

const content = ref('<p>Hello World!</p>')
</script>
```

## Configuration Options

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toolbarAlwaysShow` | `boolean` | `false` | Show toolbar always instead of on selection |
| `plugins` | `EditorPlugin[]` | `defaultPlugins` | Array of plugins to use |

### Always Show Toolbar

```vue
<VHtmlEditor 
  v-model="content" 
  :toolbar-always-show="true" 
/>
```

### Custom Plugin Configuration

```vue
<template>
  <VHtmlEditor 
    v-model="content" 
    :plugins="customPlugins" 
  />
</template>

<script setup>
import { VHtmlEditor, boldPlugin, italicPlugin, linkPlugin } from 'vue-html-editor'

const customPlugins = [
  boldPlugin,
  italicPlugin,
  linkPlugin
]
</script>
```

## Available Plugins

### Formatting Plugins
- `boldPlugin` - Bold text (**Ctrl+B**)
- `italicPlugin` - Italic text (**Ctrl+I**)
- `underlinePlugin` - Underline text (**Ctrl+U**)
- `strikeThroughPlugin` - Strikethrough text
- `removeFormatPlugin` - Remove all formatting

### List Plugins
- `unorderedListPlugin` - Bullet lists
- `orderedListPlugin` - Numbered lists

### Media Plugins
- `linkPlugin` - Insert/edit links
- `imagePlugin` - Insert images

## Creating Custom Plugins

```typescript
import type { EditorPlugin } from 'vue-html-editor'

const myCustomPlugin: EditorPlugin = {
  command: 'myCommand',
  title: 'My Custom Action',
  icon: '<svg>...</svg>', // SVG icon
  execute: (editor: HTMLElement) => {
    // Your custom logic here
    document.execCommand('insertText', false, 'Custom text!')
  },
  isActive: () => {
    // Return true if the command is currently active
    return document.queryCommandState('bold')
  }
}

// Use it in your component
const plugins = [myCustomPlugin, ...defaultPlugins]
```

## Plugin Registry

You can also register plugins globally:

```typescript
import { EditorPluginRegistry } from 'vue-html-editor'

const registry = new EditorPluginRegistry()
registry.register(myCustomPlugin)
```

## Styling

The component comes with default Tailwind CSS styles. You can customize the appearance by overriding CSS classes:

```css
/* Custom editor styles */
.prose {
  /* Editor content area */
}

/* Custom toolbar styles */
.toolbar-button {
  /* Toolbar button styles */
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build:lib

# Build demo
npm run build
```

## License

MIT
