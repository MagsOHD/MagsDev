<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="isDark ? 'Activer le mode clair' : 'Activer le mode sombre'"
    :title="isDark ? 'Mode clair' : 'Mode sombre'"
  >
    <transition name="icon-fade" mode="out-in">
      <svg
        v-if="isDark"
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg
        v-else
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </transition>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      isDark: true
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
    } else {
      this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    this.applyTheme()
  },
  methods: {
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      this.$emit('theme-changed', this.isDark ? 'dark' : 'light')
    },
    applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      } else {
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  position: relative;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.7);
  /* Désactiver le tap highlight sur mobile */
  -webkit-tap-highlight-color: transparent;
  /* Empêcher la sélection du texte */
  user-select: none;
  -webkit-user-select: none;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.theme-toggle:active {
  transform: scale(0.95);
}

/* Amélioration du feedback visuel sur mobile */
@media (hover: none) and (pointer: coarse) {
  .theme-toggle {
    width: 48px;
    height: 48px;
  }

  .theme-toggle:active {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(0.92);
  }

  .theme-toggle svg {
    width: 24px;
    height: 24px;
  }
}

/* Optimisations pour petits écrans */
@media (max-width: 480px) {
  .theme-toggle {
    width: 52px;
    height: 52px;
  }

  .theme-toggle svg {
    width: 26px;
    height: 26px;
  }
}

.icon-fade-enter-active,
.icon-fade-leave-active {
  transition: all 0.3s ease;
}

.icon-fade-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.icon-fade-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}
</style>

<style>
/* Global theme styles */
:root.light {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f1f3f5;
  --text-primary: #1a1a1a;
  --text-secondary: #4a4a4a;
  --text-tertiary: #6a6a6a;
  --border-color: rgba(0, 0, 0, 0.1);
  --card-bg: rgba(0, 0, 0, 0.02);
  --card-hover: rgba(0, 0, 0, 0.04);
}

:root.dark {
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --bg-tertiary: #1a1a1a;
  --text-primary: #e4e4e7;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  --border-color: rgba(255, 255, 255, 0.1);
  --card-bg: rgba(255, 255, 255, 0.02);
  --card-hover: rgba(255, 255, 255, 0.04);
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
