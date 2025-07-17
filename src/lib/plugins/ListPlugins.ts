import type { EditorPlugin } from '../types/plugin'

// SVG Icons
const svgIcons = {
  insertUnorderedList: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  insertOrderedList: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1.5"/></svg>',
}

export const unorderedListPlugin: EditorPlugin = {
  command: 'insertUnorderedList',
  icon: svgIcons.insertUnorderedList,
  title: 'Bullet List',
  execute: () => {
    document.execCommand('insertUnorderedList', false)
  },
  isActive: () => document.queryCommandState('insertUnorderedList')
}

export const orderedListPlugin: EditorPlugin = {
  command: 'insertOrderedList',
  icon: svgIcons.insertOrderedList,
  title: 'Numbered List',
  execute: () => {
    document.execCommand('insertOrderedList', false)
  },
  isActive: () => document.queryCommandState('insertOrderedList')
} 