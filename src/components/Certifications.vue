<template>
  <section class="certifications" id="certifications">
    <div class="certifications-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ labels.certifications }}</h2>
        <div class="title-line"></div>
      </div>

      <!-- Certifications Grid -->
      <div class="certifications-grid">
        <div
          v-for="cert in certificationsData"
          :key="cert.id"
          class="cert-card"
        >
          <div class="cert-badge">
            <div class="badge-icon" v-html="getBadgeIcon(cert.type)"></div>
          </div>
          <div class="cert-content">
            <h3 class="cert-title">{{ cert.title }}</h3>
            <p class="cert-issuer">{{ cert.issuer }}</p>
            <p class="cert-date">{{ cert.date }}</p>
            <p class="cert-description" v-if="cert.description">{{ cert.description }}</p>
            <div class="cert-skills" v-if="cert.skills && cert.skills.length">
              <span v-for="skill in cert.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
            <a
              v-if="cert.link"
              :href="cert.link"
              target="_blank"
              rel="noopener noreferrer"
              class="cert-link"
            >
              {{ labels.viewCertificate }}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Certifications',
  props: {
    certificationsData: {
      type: Array,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  },
  methods: {
    getBadgeIcon(type) {
      const icons = {
        certification: `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
        `,
        formation: `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        `,
        course: `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        `
      }
      return icons[type] || icons.certification
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.certifications {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #121212 50%, #0a0a0a 100%);
  position: relative;
}

.certifications-container {
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

/* Certifications Grid */
.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.cert-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cert-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.1)
  );
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.cert-card:hover::before {
  transform: scaleX(1);
}

.cert-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-8px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Badge */
.cert-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin: 0 auto;
  transition: all 0.4s ease;
}

.cert-card:hover .cert-badge {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1) rotate(5deg);
}

.badge-icon {
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Content */
.cert-content {
  text-align: center;
}

.cert-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
  line-height: 1.3;
}

.cert-issuer {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.cert-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
}

.cert-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Skills */
.cert-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.skill-tag {
  display: inline-block;
  padding: 0.3rem 0.7rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
}

/* Link */
.cert-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  margin-top: 0.5rem;
}

.cert-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.cert-link svg {
  transition: transform 0.3s ease;
}

.cert-link:hover svg {
  transform: translate(2px, -2px);
}

/* Responsive */
@media (max-width: 768px) {
  .certifications {
    padding: 4rem 1.5rem;
  }

  .certifications-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .cert-card {
    padding: 1.5rem;
  }
}
</style>
