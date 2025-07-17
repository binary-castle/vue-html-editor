import '../style.css'

// Main component export
export { default as VHtmlEditor } from './VHtmlEditor.vue'

// Export all plugin types and utilities
export * from './plugins'
export * from './types/plugin'

// Re-export specific items for convenience
export { EditorPluginRegistry, defaultPlugins } from './plugins'
export type { EditorPlugin, PluginRegistry } from './types/plugin' 