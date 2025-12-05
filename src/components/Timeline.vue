<template>
  <section class="timeline" id="timeline">
    <div class="timeline-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ labels.timeline }}</h2>
        <div class="title-line"></div>
      </div>

      <!-- Timeline Items -->
      <div class="timeline-wrapper">
        <div class="timeline-line"></div>

        <div
          v-for="(item, index) in timelineData"
          :key="index"
          class="timeline-item"
          :class="{ 'left': index % 2 === 0, 'right': index % 2 !== 0 }"
          :data-index="index"
        >
          <div class="timeline-content">
            <div class="timeline-date">{{ item.date }}</div>
            <div class="timeline-card">
              <div class="card-icon" v-if="item.icon">
                <component :is="getIcon(item.icon)" />
              </div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <h4 class="timeline-subtitle" v-if="item.subtitle">{{ item.subtitle }}</h4>
              <p class="timeline-description">{{ item.description }}</p>
              <div class="timeline-tags" v-if="item.tags && item.tags.length">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          <div class="timeline-dot"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    timelineData: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIcon(iconName) {
      const icons = {
        education: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          `
        },
        work: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          `
        },
        achievement: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          `
        },
        project: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          `
        }
      }
      return icons[iconName] || icons.achievement
    }
  },
  mounted() {
    this.observeTimeline()
  },
  methods: {
    observeTimeline() {
      const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      }, options)

      document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item)
      })
    },
    getIcon(iconName) {
      const icons = {
        education: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          `
        },
        work: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
          `
        },
        achievement: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          `
        },
        project: {
          template: `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          `
        }
      }
      return icons[iconName] || icons.achievement
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.timeline {
  padding: 6rem 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.timeline-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 5rem;
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

/* Timeline Structure */
.timeline-wrapper {
  position: relative;
  padding: 2rem 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.1) 10%,
    rgba(255, 255, 255, 0.1) 90%,
    transparent
  );
  transform: translateX(-50%);
}

/* Timeline Items */
.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item.left .timeline-content {
  padding-right: calc(50% + 40px);
  text-align: right;
}

.timeline-item.right .timeline-content {
  padding-left: calc(50% + 40px);
  text-align: left;
}

/* Timeline Dot */
.timeline-dot {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: #0a0a0a;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-item.visible .timeline-dot {
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
}

/* Timeline Content */
.timeline-content {
  position: relative;
}

.timeline-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  margin-bottom: 1rem;
  font-weight: 500;
}

.timeline-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.timeline-item.visible .timeline-card::before {
  transform: scaleX(1);
}

.timeline-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.6);
}

.timeline-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.timeline-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  font-weight: 400;
}

.timeline-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 1rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.timeline-item.left .timeline-tags {
  justify-content: flex-end;
}

.timeline-item.right .timeline-tags {
  justify-content: flex-start;
}

.tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-dot {
    left: 20px;
  }

  .timeline-item.left .timeline-content,
  .timeline-item.right .timeline-content {
    padding-left: 60px;
    padding-right: 0;
    text-align: left;
  }

  .timeline-item.left .timeline-tags,
  .timeline-item.right .timeline-tags {
    justify-content: flex-start;
  }

  .timeline-card {
    padding: 1.5rem;
  }

  .timeline {
    padding: 4rem 1.5rem;
  }
}
</style>
