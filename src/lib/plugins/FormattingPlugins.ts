import type { EditorPlugin } from '../types/plugin'

// SVG Icons
const svgIcons = {
  bold: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>',
  italic: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>',
  underline: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>',
  strikeThrough: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><line x1="4" y1="12" x2="20" y2="12"/></svg>',
  removeFormat: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>',
}

export const boldPlugin: EditorPlugin = {
  command: 'bold',
  icon: svgIcons.bold,
  title: 'Bold',
  execute: () => {
    document.execCommand('bold', false)
  },
  isActive: () => document.queryCommandState('bold')
}

export const italicPlugin: EditorPlugin = {
  command: 'italic',
  icon: svgIcons.italic,
  title: 'Italic',
  execute: () => {
    document.execCommand('italic', false)
  },
  isActive: () => document.queryCommandState('italic')
}

export const underlinePlugin: EditorPlugin = {
  command: 'underline',
  icon: svgIcons.underline,
  title: 'Underline',
  execute: () => {
    document.execCommand('underline', false)
  },
  isActive: () => document.queryCommandState('underline')
}

export const strikeThroughPlugin: EditorPlugin = {
  command: 'strikeThrough',
  icon: svgIcons.strikeThrough,
  title: 'Strikethrough',
  execute: () => {
    document.execCommand('strikeThrough', false)
  },
  isActive: () => document.queryCommandState('strikeThrough')
}

export const removeFormatPlugin: EditorPlugin = {
  command: 'removeFormat',
  icon: svgIcons.removeFormat,
  title: 'Remove Format',
  execute: () => {
    document.execCommand('removeFormatting', false)
  },
  isActive: () => false
} 