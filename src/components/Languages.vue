<template>
  <section class="languages" id="languages">
    <div class="container">
      <h3 class="languages-title">{{ labels.languages || 'Langues' }}</h3>

      <div class="languages-list">
        <div
          v-for="(language, index) in languages"
          :key="language.name"
          class="language-item"
          :style="`animation-delay: ${index * 0.05}s`"
        >
          <div class="language-content">
            <span class="language-name">{{ language.name }}</span>
            <span class="language-level" :class="getLevelClass(language.level)">
              {{ getShortLevel(language.level) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Languages',
  props: {
    languages: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  },
  methods: {
    getLevelClass(level) {
      const levelLower = level.toLowerCase()
      if (levelLower.includes('maternelle') || levelLower.includes('native')) {
        return 'level-native'
      }
      if (levelLower.includes('courant') || levelLower.includes('fluent')) {
        return 'level-fluent'
      }
      if (levelLower.includes('intermédiaire') || levelLower.includes('intermediate')) {
        return 'level-intermediate'
      }
      return 'level-basic'
    },
    getShortLevel(level) {
      const levelLower = level.toLowerCase()
      if (levelLower.includes('maternelle') || levelLower.includes('native')) {
        return 'Natif'
      }
      if (levelLower.includes('courant') || levelLower.includes('fluent')) {
        return 'Courant'
      }
      if (levelLower.includes('b2')) {
        return 'B2'
      }
      if (levelLower.includes('b1')) {
        return 'B1'
      }
      if (levelLower.includes('intermédiaire') || levelLower.includes('intermediate')) {
        return 'Intermédiaire'
      }
      return level
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.languages {
  padding: 0 2rem 4rem;
  background: transparent;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Title */
.languages-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 3rem;
  letter-spacing: 1.5px;
  position: relative;
  display: inline-block;
  opacity: 0.95;
}

.languages-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(
    to right,
    var(--text-primary),
    transparent
  );
  opacity: 0.3;
}

/* Languages List */
.languages-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  align-items: stretch;
}

.language-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.language-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.75rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.01) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.language-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: left 0.6s ease;
}

.language-content:hover::before {
  left: 100%;
}

.language-content:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

/* Language Name */
.language-name {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.language-name::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-primary);
  opacity: 0.4;
}

/* Language Level Badge */
.language-level {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.language-level::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s ease;
}

.language-content:hover .language-level::before {
  left: 100%;
}

.level-native {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.4);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.15);
}

.language-content:hover .level-native {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.15));
  border-color: rgba(16, 185, 129, 0.6);
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.25);
}

.level-fluent {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
}

.language-content:hover .level-fluent {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.15));
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.25);
}

.level-intermediate {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1));
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.4);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.15);
}

.language-content:hover .level-intermediate {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.15));
  border-color: rgba(245, 158, 11, 0.6);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.25);
}

.level-basic {
  background: linear-gradient(135deg, rgba(107, 114, 128, 0.2), rgba(107, 114, 128, 0.1));
  color: #9ca3af;
  border: 1px solid rgba(107, 114, 128, 0.4);
  box-shadow: 0 0 20px rgba(107, 114, 128, 0.15);
}

.language-content:hover .level-basic {
  background: linear-gradient(135deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.15));
  border-color: rgba(107, 114, 128, 0.6);
  box-shadow: 0 0 30px rgba(107, 114, 128, 0.25);
}

/* Responsive */
@media (max-width: 768px) {
  .languages {
    padding: 0 1rem 3rem;
  }

  .languages-title {
    font-size: 1.5rem;
  }

  .languages-list {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .language-content {
    padding: 1rem 1.5rem;
  }

  .language-name {
    font-size: 1rem;
  }

  .language-level {
    font-size: 0.7rem;
    padding: 0.4rem 0.85rem;
  }
}
</style>
