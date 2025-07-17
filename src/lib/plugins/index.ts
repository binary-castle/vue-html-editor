// Export plugin types
export type { EditorPlugin, PluginRegistry } from '../types/plugin'

// Export plugin registry
export { EditorPluginRegistry, pluginRegistry } from './PluginRegistry'

// Export individual plugins
export {
  boldPlugin,
  italicPlugin,
  underlinePlugin,
  strikeThroughPlugin,
  removeFormatPlugin
} from './FormattingPlugins'

export {
  unorderedListPlugin,
  orderedListPlugin
} from './ListPlugins'

export {
  linkPlugin,
  imagePlugin
} from './MediaPlugins'

// Import all plugins
import {
  boldPlugin,
  italicPlugin,
  underlinePlugin,
  strikeThroughPlugin,
  removeFormatPlugin
} from './FormattingPlugins'

import {
  unorderedListPlugin,
  orderedListPlugin
} from './ListPlugins'

import {
  linkPlugin,
  imagePlugin
} from './MediaPlugins'

// Export default plugin set
export const defaultPlugins = [
  boldPlugin,
  italicPlugin,
  underlinePlugin,
  strikeThroughPlugin,
  removeFormatPlugin,
  unorderedListPlugin,
  orderedListPlugin,
  linkPlugin,
  imagePlugin
] 