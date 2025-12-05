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
  border-radius: 0.25rem;
  padding: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  border: 1px solid #3a3a3a;
}

.language-switcher button {
  padding: 0.4rem 0.75rem;
  border: none;
  background: transparent;
  color: #a1a1aa;
  border-radius: 0.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
}

.language-switcher button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #e4e4e7;
}

.language-switcher button.active {
  background: #e4e4e7;
  color: #0a0a0a;
}
</style>
