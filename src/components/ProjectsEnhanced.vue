<template>
  <section class="projects" id="projects">
    <div class="container">
      <h2 class="section-title">{{ labels.projects }}</h2>

      <!-- Filter Buttons -->
      <div class="filters">
        <button
          @click="filterProjects('all')"
          :class="{ active: activeFilter === 'all' }"
          class="filter-btn"
        >
          {{ labels.all || 'Tous' }}
        </button>
        <button
          v-for="tech in allTechnologies"
          :key="tech"
          @click="filterProjects(tech)"
          :class="{ active: activeFilter === tech }"
          class="filter-btn"
        >
          {{ tech }}
        </button>
      </div>

      <!-- Projects Grid -->
      <transition-group name="project-list" tag="div" class="projects-container">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-item"
          :class="`project-${(index % 3) + 1}`"
        >
          <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="project-info">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                :class="{ highlight: tech === activeFilter }"
              >
                {{ tech }}
              </span>
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
      </transition-group>

      <!-- No results -->
      <div v-if="filteredProjects.length === 0" class="no-results">
        <p>{{ labels.noProjects || 'Aucun projet trouvé pour ce filtre' }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProjectsEnhanced',
  props: {
    projects: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeFilter: 'all'
    }
  },
  computed: {
    allTechnologies() {
      const techs = new Set()
      this.projects.forEach(project => {
        project.technologies.forEach(tech => techs.add(tech))
      })
      return Array.from(techs).sort()
    },
    filteredProjects() {
      if (this.activeFilter === 'all') {
        return this.projects
      }
      return this.projects.filter(project =>
        project.technologies.includes(this.activeFilter)
      )
    }
  },
  methods: {
    filterProjects(filter) {
      this.activeFilter = filter
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
  margin: 0 0 3rem 2rem;
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

/* Filters */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 0 2rem 3rem 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.filter-btn {
  padding: 0.6rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.filter-btn.active {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

/* Projects Container */
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
  transition: all 0.3s ease;
}

.project-tech span.highlight {
  color: #f4f4f5;
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

.project-tech span.highlight::after {
  background: #f4f4f5;
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

/* No Results */
.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
}

/* Transitions */
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}

.project-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.project-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
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

  .filters {
    margin: 0 1rem 2rem 1rem;
    justify-content: center;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
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
