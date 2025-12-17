<template>
  <div class="language-switcher">
    <button
      @click="switchLanguage('fr')"
      :class="{ active: currentLanguage === 'fr' }"
      aria-label="Français"
    >
      FR
    </button>
    <button
      @click="switchLanguage('en')"
      :class="{ active: currentLanguage === 'en' }"
      aria-label="English"
    >
      EN
    </button>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  props: {
    currentLanguage: {
      type: String,
      required: true
    }
  },
  methods: {
    switchLanguage(lang) {
      this.$emit('language-changed', lang)
    }
  }
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 0.25rem;
  background: rgba(26, 26, 26, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 0.5rem;
  padding: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border: 1px solid #3a3a3a;
}

.language-switcher button {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: #a1a1aa;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.875rem;
  /* Optimisations tactiles */
  min-width: 44px;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  /* Centrer le texte */
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-switcher button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e7;
}

.language-switcher button:active {
  transform: scale(0.95);
}

.language-switcher button.active {
  background: #e4e4e7;
  color: #0a0a0a;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Amélioration du feedback visuel sur mobile */
@media (hover: none) and (pointer: coarse) {
  .language-switcher {
    gap: 0.375rem;
    padding: 0.375rem;
    border-radius: 0.625rem;
  }

  .language-switcher button {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
    min-width: 52px;
    min-height: 48px;
    border-radius: 0.5rem;
  }

  .language-switcher button:active {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(0.92);
  }

  .language-switcher button.active:active {
    background: #d4d4d8;
  }
}

/* Optimisations pour petits écrans */
@media (max-width: 480px) {
  .language-switcher {
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.75rem;
  }

  .language-switcher button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    min-width: 56px;
    min-height: 52px;
    font-weight: 700;
    letter-spacing: 0.025em;
  }
}

/* Support du mode clair */
:root.light .language-switcher {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:root.light .language-switcher button {
  color: #52525b;
}

:root.light .language-switcher button:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #18181b;
}

:root.light .language-switcher button.active {
  background: #18181b;
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

@media (hover: none) and (pointer: coarse) {
  :root.light .language-switcher button:active {
    background: rgba(0, 0, 0, 0.1);
  }

  :root.light .language-switcher button.active:active {
    background: #27272a;
  }
}
</style>
