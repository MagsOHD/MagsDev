<template>
  <section class="skills" id="skills">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ labels.skills }}</h2>
        <div class="title-line"></div>
      </div>

      <div class="skills-grid">
        <div v-for="(skillGroup, index) in skills" :key="skillGroup.category"
             class="skill-group"
             :style="`animation-delay: ${index * 0.1}s`">
          <div class="group-header">
            <h3 class="skill-category">{{ skillGroup.category }}</h3>
            <span class="category-badge" :class="getCategoryLevelClass(skillGroup.level)">
              {{ getCategoryLevelLabel(skillGroup.level) }}
            </span>
          </div>

          <div class="skill-items">
            <div v-for="item in skillGroup.items" :key="item.name" class="skill-item">
              <span class="skill-name">{{ item.name }}</span>
              <span class="skill-badge" :class="getSkillLevelClass(item.level)">
                {{ getSkillLevelLabel(item.level) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Skills',
  props: {
    skills: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCategoryLevelLabel(level) {
      if (level >= 90) return 'Expert'
      if (level >= 75) return 'Avancé'
      if (level >= 50) return 'Intermédiaire'
      return 'Débutant'
    },
    getCategoryLevelClass(level) {
      if (level >= 90) return 'level-expert'
      if (level >= 75) return 'level-advanced'
      if (level >= 50) return 'level-intermediate'
      return 'level-beginner'
    },
    getSkillLevelLabel(level) {
      if (level >= 90) return 'Expert'
      if (level >= 75) return 'Avancé'
      if (level >= 50) return 'Intermédiaire'
      return 'Débutant'
    },
    getSkillLevelClass(level) {
      if (level >= 90) return 'level-expert'
      if (level >= 75) return 'level-advanced'
      if (level >= 50) return 'level-intermediate'
      return 'level-beginner'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.skills {
  padding: 6rem 2rem;
  background: #0f0f0f;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #ffffff;
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.title-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  margin: 0 auto;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 3rem;
}

.skill-group {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-group:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

/* Group Header */
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-category {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e4e4e7;
  letter-spacing: 0.5px;
}

/* Category Badge */
.category-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

/* Skill Items */
.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.skill-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.skill-name {
  font-size: 1rem;
  font-weight: 500;
  color: #d4d4d8;
}

/* Skill Badge */
.skill-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

/* Level Colors */
.level-expert {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
}

.level-advanced {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
}

.level-intermediate {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
}

.level-beginner {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(107, 114, 128, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .skills {
    padding: 4rem 1rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skill-group {
    padding: 1.5rem;
  }

  .skill-category {
    font-size: 1.25rem;
  }

  .category-level {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

/* Dark mode is default, no additional styles needed */
</style>
