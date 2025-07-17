import type { EditorPlugin, PluginRegistry } from '../types/plugin'

export class EditorPluginRegistry implements PluginRegistry {
  private plugins: Map<string, EditorPlugin> = new Map()

  register(plugin: EditorPlugin): void {
    this.plugins.set(plugin.command, plugin)
  }

  unregister(command: string): void {
    this.plugins.delete(command)
  }

  getPlugins(): EditorPlugin[] {
    return Array.from(this.plugins.values())
  }

  getPlugin(command: string): EditorPlugin | undefined {
    return this.plugins.get(command)
  }

  executeCommand(command: string, editorElement: HTMLElement): boolean {
    const plugin = this.plugins.get(command)
    if (plugin) {
      plugin.execute(editorElement)
      return true
    }
    return false
  }

  clear(): void {
    this.plugins.clear()
  }
}

// Global registry instance
export const pluginRegistry = new EditorPluginRegistry() 