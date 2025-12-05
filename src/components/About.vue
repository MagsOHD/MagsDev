<template>
  <section class="about" id="about-section">
    <div class="about-container">
      <!-- Title Section -->
      <div class="section-header">
        <h2 class="section-title">{{ labels.about }}</h2>
        <div class="title-line"></div>
      </div>

      <!-- Content Grid -->
      <div class="about-content">
        <!-- Main Bio -->
        <div class="bio-card">
          <div class="card-inner">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h3 class="card-title">{{ aboutData.bioTitle }}</h3>
            <p class="card-text">{{ aboutData.bio }}</p>
          </div>
        </div>

        <!-- Journey -->
        <div class="bio-card">
          <div class="card-inner">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 class="card-title">{{ aboutData.journeyTitle }}</h3>
            <p class="card-text">{{ aboutData.journey }}</p>
          </div>
        </div>

        <!-- Passion -->
        <div class="bio-card">
          <div class="card-inner">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 class="card-title">{{ aboutData.passionTitle }}</h3>
            <p class="card-text">{{ aboutData.passion }}</p>
          </div>
        </div>

        <!-- Current Focus -->
        <div class="bio-card highlight">
          <div class="card-inner">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <h3 class="card-title">{{ aboutData.focusTitle }}</h3>
            <p class="card-text">{{ aboutData.focus }}</p>
          </div>
        </div>
      </div>

      <!-- Stats Section (Optional - modern touch) -->
      <div class="stats-grid">
        <div class="stat-item" v-for="stat in aboutData.stats" :key="stat.label">
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  props: {
    aboutData: {
      type: Object,
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
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.about {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%);
  position: relative;
}

.about::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--border-light) 20%,
    var(--border-light) 80%,
    transparent
  );
}

.about-container {
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
  color: var(--text-primary);
  letter-spacing: 2px;
  margin-bottom: 1rem;
}

.title-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--border-color),
    transparent
  );
  margin: 0 auto;
}

/* Content Grid */
.about-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.bio-card {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow);
}

.bio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to right,
    transparent,
    var(--border-color),
    transparent
  );
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.bio-card:hover::before {
  transform: scaleX(1);
}

.bio-card:hover {
  background: var(--card-hover);
  border-color: var(--border-color);
  transform: translateY(-5px);
  box-shadow: 0 8px 30px var(--shadow);
}

.bio-card.highlight {
  border-color: rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
}

.card-inner {
  position: relative;
  z-index: 1;
}

.card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--text-tertiary);
  transition: all 0.3s ease;
}

.bio-card:hover .card-icon {
  color: var(--text-primary);
  transform: scale(1.1);
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.card-text {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
  letter-spacing: 0.3px;
}

/* Stats Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
  border-top: 1px solid var(--border-light);
}

.stat-item {
  text-align: center;
  padding: 1.5rem 1rem;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: scale(1.05);
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Responsive */
@media (max-width: 768px) {
  .about {
    padding: 4rem 1.5rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .bio-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
