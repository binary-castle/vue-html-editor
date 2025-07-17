import type { EditorPlugin } from '../types/plugin'

// SVG Icons
const svgIcons = {
  createLink: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  insertImage: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>'
}

export const linkPlugin: EditorPlugin = {
  command: 'createLink',
  icon: svgIcons.createLink,
  title: 'Link',
  execute: () => {
    const url = prompt('Enter URL:')
    if (url) {
      document.execCommand('createLink', false, url)
    }
  },
  isActive: () => false
}

export const imagePlugin: EditorPlugin = {
  command: 'insertImage',
  icon: svgIcons.insertImage,
  title: 'Image',
  execute: () => {
    const url = prompt('Enter image URL (http/https only):')
    if (url) {
      // Validate that the URL starts with http or https
      if (url.startsWith('http://') || url.startsWith('https://')) {
        document.execCommand('insertImage', false, url)
      } else {
        alert('Only HTTP/HTTPS image URLs are allowed.')
      }
    }
  },
  isActive: () => false
} 