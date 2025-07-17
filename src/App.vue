<script setup lang="ts">
import {ref} from 'vue'
import VHtmlEditor from './lib/VHtmlEditor.vue'
import {
  boldPlugin,
  italicPlugin,
  underlinePlugin,
  strikeThroughPlugin,
  removeFormatPlugin,
  unorderedListPlugin,
  orderedListPlugin
} from './lib/plugins'

// Content models
const basicContent = ref(`

<div class="hero-section">
    <div class="hero-content">
        <h1 class="hero-title">Modern Web Design</h1>
        <p class="hero-subtitle">Creating beautiful, responsive interfaces with clean HTML and CSS</p>
        <div class="hero-buttons">
            <button class="btn btn-primary">Get Started</button>
            <button class="btn btn-secondary">Learn More</button>
        </div>
    </div>
    <div class="hero-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-square"></div>
    </div>
</div>

`)

// CSS styles that will be automatically applied to the editor
const css = ref(`
.hero-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 400px;
    padding: 60px 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    overflow: hidden;
    color: white;
    font-family: 'Arial', sans-serif;
}

.hero-content {
    flex: 1;
    max-width: 600px;
    z-index: 2;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0 0 20px 0;
    line-height: 1.2;
    background: linear-gradient(45deg, #ffffff, #f0f0f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin: 0 0 30px 0;
    opacity: 0.9;
    line-height: 1.6;
}

.hero-buttons {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.btn {
    padding: 14px 28px;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-block;
    text-align: center;
}

.btn-primary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-primary:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.4);
}

.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
}

.hero-decoration {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 300px;
    z-index: 1;
}

.decoration-circle {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    top: 0;
    right: 0;
    animation: float 6s ease-in-out infinite;
}

.decoration-square {
    position: absolute;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(15px);
    border-radius: 20px;
    bottom: 20px;
    left: 20px;
    transform: rotate(45deg);
    animation: float 8s ease-in-out infinite reverse;
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
}

@media (max-width: 768px) {
    .hero-section {
        flex-direction: column;
        text-align: center;
        padding: 40px 20px;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .hero-decoration {
        position: relative;
        right: auto;
        top: auto;
        transform: none;
        margin-top: 40px;
        width: 200px;
        height: 200px;
    }

    .decoration-circle {
        width: 150px;
        height: 150px;
    }

    .decoration-square {
        width: 80px;
        height: 80px;
    }
}
`)


const alwaysShowContent = ref('<p>This editor always shows the toolbar. Try clicking anywhere to position it.</p>')
const customPluginsContent = ref('<p>This editor has <em>formatting</em> and <strong>list</strong> plugins only.</p>')
const minimalContent = ref('<p>Minimal setup with only <strong>bold</strong> and <em>italic</em>.</p>')

// Plugin configurations
const formattingPlugins = [
  boldPlugin,
  italicPlugin,
  underlinePlugin,
  strikeThroughPlugin,
  removeFormatPlugin,
  unorderedListPlugin,
  orderedListPlugin
]

const minimalPlugins = [
  boldPlugin,
  italicPlugin
]
</script>

<template>
  <div class="app">
    <div class="container mx-auto py-8 px-4">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Vue HTML Editor</h1>
        <p class="text-gray-600">A powerful and extensible HTML editor for Vue 3</p>
      </header>

      <div class="grid gap-8 md:grid-cols-2">
        <!-- Basic Example -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">Styled Content Editor</h2>
          <p class="text-sm text-gray-600">Edit the hero section content with live styling applied</p>
          <VHtmlEditor v-model="basicContent" :css="css"/>
          <details class="text-sm">
            <summary class="cursor-pointer text-gray-600 hover:text-gray-800">View HTML Output</summary>
            <pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{{ basicContent }}</pre>
          </details>
        </section>

        <!-- CSS Editor -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">CSS Editor</h2>
          <p class="text-sm text-gray-600">Edit CSS directly - it automatically applies to the editor above</p>
          <textarea
              v-model="css"
              class="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm"
              placeholder="Write your CSS here..."
          ></textarea>
          <details class="text-sm">
            <summary class="cursor-pointer text-gray-600 hover:text-gray-800">View Raw CSS</summary>
            <pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{{ css }}</pre>
          </details>
        </section>

        <!-- Always Show Toolbar -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">Always Show Toolbar</h2>
          <VHtmlEditor v-model="alwaysShowContent" :toolbar-always-show="true"/>
          <details class="text-sm">
            <summary class="cursor-pointer text-gray-600 hover:text-gray-800">View HTML Output</summary>
            <pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{{ alwaysShowContent }}</pre>
          </details>
        </section>

        <!-- Custom Plugins -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">Custom Plugin Set</h2>
          <p class="text-sm text-gray-600">Only formatting and list plugins enabled</p>
          <VHtmlEditor v-model="customPluginsContent" :plugins="formattingPlugins"/>
          <details class="text-sm">
            <summary class="cursor-pointer text-gray-600 hover:text-gray-800">View HTML Output</summary>
            <pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{{ customPluginsContent }}</pre>
          </details>
        </section>

        <!-- Minimal Setup -->
        <section class="space-y-4">
          <h2 class="text-xl font-semibold text-gray-800">Minimal Setup</h2>
          <p class="text-sm text-gray-600">Only bold and italic</p>
          <VHtmlEditor v-model="minimalContent" :plugins="minimalPlugins"/>
          <details class="text-sm">
            <summary class="cursor-pointer text-gray-600 hover:text-gray-800">View HTML Output</summary>
            <pre class="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">{{ minimalContent }}</pre>
          </details>
        </section>
      </div>

      <!-- Usage Instructions -->
      <section class="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 class="text-xl font-semibold text-blue-900 mb-4">How to Use</h2>
        <ul class="space-y-2 text-blue-800 text-sm">
          <li>• <strong>CSS Props:</strong> Pass CSS directly to VHtmlEditor component via the <code>css</code> prop
          </li>
          <li>• <strong>Auto-Scoping:</strong> CSS is automatically scoped to avoid conflicts with other styles</li>
          <li>• <strong>Normal CSS:</strong> Write regular CSS without prefixes - component handles scoping</li>
          <li>• <strong>Styled Editing:</strong> Click anywhere in the styled content to edit it directly</li>
          <li>• <strong>Live Updates:</strong> Changes to CSS or HTML reflect immediately in the editor</li>
          <li>• <strong>WYSIWYG:</strong> See your content styled in real-time as you edit</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  background: white;
  min-height: 100vh;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.1);
}

details[open] summary {
  margin-bottom: 0.5rem;
}


</style>
