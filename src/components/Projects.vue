<template>
  <section class="projects" id="projects">
    <div class="container">
      <h2 class="section-title">{{ labels.projects }}</h2>
      <div class="projects-container">
        <div v-for="(project, index) in projects" :key="project.id"
             class="project-item"
             :class="`project-${index + 1}`">
          <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
            </div>
            <div class="project-actions">
              <a :href="project.link" target="_blank" rel="noopener">
                <span>{{ labels.code }}</span>
                <span class="arrow">→</span>
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener">
                <span>{{ labels.demo }}</span>
                <span class="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects',
  props: {
    projects: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.projects {
  padding: 6rem 2rem;
  background: #0a0a0a;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: left;
  margin: 0 0 4rem 2rem;
  font-weight: 300;
  color: #f4f4f5;
  letter-spacing: 2px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 0;
  width: 60px;
  height: 1px;
  background: #f4f4f5;
}

.projects-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.project-item {
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  padding: 3rem 2rem;
  border-bottom: 1px solid #1a1a1a;
  transition: all 0.5s ease;
  position: relative;
}

.project-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.01);
  transition: width 0.5s ease;
  z-index: 0;
}

.project-item:hover::before {
  width: 100%;
}

.project-item:hover {
  border-bottom-color: #2a2a2a;
}

.project-number {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  min-width: 120px;
  transition: all 0.5s ease;
  position: relative;
  z-index: 1;
}

.project-item:hover .project-number {
  color: #2a2a2a;
  transform: translateX(10px);
}

.project-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.project-title {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 400;
  color: #f4f4f5;
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.project-item:hover .project-title {
  letter-spacing: 2px;
}

.project-description {
  color: #a1a1aa;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
  font-size: 1rem;
  max-width: 600px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.project-tech span {
  color: #71717a;
  font-size: 0.85rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;
  position: relative;
}

.project-tech span::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 1px;
  background: #71717a;
  transition: width 0.3s ease;
}

.project-item:hover .project-tech span::after {
  width: 100%;
}

.project-actions {
  display: flex;
  gap: 2rem;
}

.project-actions a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e4e4e7;
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.project-actions a .arrow {
  transition: transform 0.3s ease;
}

.project-actions a:hover {
  color: #f4f4f5;
}

.project-actions a:hover .arrow {
  transform: translateX(5px);
}

/* Variations de positionnement */
.project-1 {
  padding-left: 1rem;
}

.project-2 {
  padding-left: 4rem;
}

.project-3 {
  padding-left: 2.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    margin-left: 0;
    text-align: center;
  }

  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .project-item {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 1rem;
  }

  .project-1,
  .project-2,
  .project-3 {
    padding-left: 1rem;
  }

  .project-number {
    min-width: auto;
    font-size: 2.5rem;
  }

  .project-tech {
    gap: 0.75rem;
  }

  .project-actions {
    gap: 1.5rem;
  }
}
</style>
