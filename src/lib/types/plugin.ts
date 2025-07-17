export interface EditorPlugin {
  command: string
  icon: string
  title: string
  execute: (editorElement: HTMLElement) => void
  isActive?: () => boolean
}

export interface PluginRegistry {
  register: (plugin: EditorPlugin) => void
  unregister: (command: string) => void
  getPlugins: () => EditorPlugin[]
  getPlugin: (command: string) => EditorPlugin | undefined
  executeCommand: (command: string, editorElement: HTMLElement) => boolean
} 