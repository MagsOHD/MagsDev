<template>
  <header class="header">
    <div class="header-controls">
      <ThemeToggle />
      <LanguageSwitcher
        :currentLanguage="currentLanguage"
        @language-changed="$emit('language-changed', $event)"
      />
    </div>
  </header>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'

export default {
  name: 'Header',
  components: {
    LanguageSwitcher,
    ThemeToggle
  },
  props: {
    personal: {
      type: Object,
      required: true
    },
    labels: {
      type: Object,
      required: true
    },
    currentLanguage: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media (max-width: 768px) {
  .header {
    top: 1rem;
    right: 1rem;
  }

  .header-controls {
    gap: 0.5rem;
  }
}
</style>
