<script>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Timeline from './components/Timeline.vue'
import ProjectsEnhanced from './components/ProjectsEnhanced.vue'
import Skills from './components/Skills.vue'
import Certifications from './components/Certifications.vue'
import GitHubActivity from './components/GitHubActivity.vue'
import Availability from './components/Availability.vue'
import ContactForm from './components/ContactForm.vue'
import Footer from './components/Footer.vue'
import portfolioDataFr from './data/portfolio.json'
import portfolioDataEn from './data/portfolio.en.json'

export default {
  name: 'App',
  components: {
    Header,
    Hero,
    About,
    Timeline,
    ProjectsEnhanced,
    Skills,
    Certifications,
    GitHubActivity,
    Availability,
    ContactForm,
    Footer
  },
  data() {
    return {
      currentLanguage: 'fr',
      languages: {
        fr: portfolioDataFr,
        en: portfolioDataEn
      }
    }
  },
  computed: {
    portfolioData() {
      return this.languages[this.currentLanguage]
    }
  },
  methods: {
    changeLanguage(lang) {
      this.currentLanguage = lang
      localStorage.setItem('preferredLanguage', lang)
    },
    initScrollAnimations() {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Optionnel : observer une seule fois
            // observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      // Observer toutes les sections sauf le hero
      this.$nextTick(() => {
        const sections = document.querySelectorAll('section:not(.hero)')
        sections.forEach(section => {
          observer.observe(section)
        })
      })
    }
  },
  mounted() {
    const savedLanguage = localStorage.getItem('preferredLanguage')
    if (savedLanguage && this.languages[savedLanguage]) {
      this.currentLanguage = savedLanguage
    }

    // Initialiser les animations au scroll
    this.initScrollAnimations()
  }
}
</script>

<template>
  <div id="app">
    <Header
      :personal="portfolioData.personal"
      :labels="portfolioData.labels"
      :currentLanguage="currentLanguage"
      @language-changed="changeLanguage"
    />
    <Hero :personal="portfolioData.personal" />
    <About
      :aboutData="portfolioData.about"
      :labels="portfolioData.labels"
    />
    <Timeline
      :timelineData="portfolioData.timeline"
      :labels="portfolioData.labels"
    />
    <ProjectsEnhanced
      :projects="portfolioData.projects"
      :labels="portfolioData.labels"
    />
    <Skills
      :skills="portfolioData.skills"
      :labels="portfolioData.labels"
    />
    <Certifications
      :certificationsData="portfolioData.certifications"
      :labels="portfolioData.labels"
    />
    <GitHubActivity
      :githubUsername="portfolioData.github.username"
      :gitlabUsername="portfolioData.personal.gitlab.split('/').pop()"
      :labels="portfolioData.labels"
    />
    <Availability
      :availabilityData="portfolioData.availability"
      :labels="portfolioData.labels"
    />
    <ContactForm
      :personal="portfolioData.personal"
      :labels="portfolioData.labels"
    />
    <Footer
      :personal="portfolioData.personal"
      :labels="portfolioData.labels"
    />
  </div>
</template>

<style>
/* Global CSS Variables for Theming */
:root {
  /* Mode sombre - élégant et sobre */
  --bg-primary: #0a0a0a;
  --bg-secondary: #121212;
  --bg-tertiary: #1a1a1a;
  --text-primary: #e4e4e7;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  --border-color: rgba(255, 255, 255, 0.1);
  --border-light: rgba(255, 255, 255, 0.05);
  --card-bg: rgba(255, 255, 255, 0.02);
  --card-hover: rgba(255, 255, 255, 0.05);
  --shadow: rgba(0, 0, 0, 0.3);
}

:root.light {
  /* Mode clair - élégant et sobre avec contrastes optimaux */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #1a1a1a;
  --text-secondary: #495057;
  --text-tertiary: #6c757d;
  --border-color: rgba(0, 0, 0, 0.12);
  --border-light: rgba(0, 0, 0, 0.06);
  --card-bg: #ffffff;
  --card-hover: #fafbfc;
  --shadow: rgba(0, 0, 0, 0.06);
  --shadow-md: rgba(0, 0, 0, 0.1);
  --shadow-lg: rgba(0, 0, 0, 0.15);
  --accent-light: #2563eb;
  --accent-dark: #1e40af;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  background: var(--bg-primary);
  transition: background-color 0.4s ease, color 0.4s ease;
}

html {
  scroll-behavior: smooth;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Séparateurs élégants avec animation */
section:not(.hero)::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  max-width: 800px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--border-color),
    transparent
  );
  opacity: 0;
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
}

section:not(.hero).visible::before {
  transform: translateX(-50%) scaleX(1);
  opacity: 0.6;
}

/* Espace et positionnement */
section:not(.hero) {
  position: relative;
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

section:not(.hero).visible {
  opacity: 1;
  transform: translateY(0);
}

/* Backgrounds alternés pour distinction visuelle */
section:nth-child(odd):not(.hero) {
  background: var(--bg-primary);
}

section:nth-child(even):not(.hero) {
  background: var(--bg-secondary);
}

/* Transitions fluides pour les thèmes */
section {
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hero sans animation */
.hero {
  opacity: 1 !important;
  transform: none !important;
}

/* Effet de parallaxe subtil sur les titres de section */
section:not(.hero) .section-title {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

section:not(.hero).visible .section-title {
  opacity: 1;
  transform: translateY(0);
}

/* Animation en cascade pour les enfants */
section:not(.hero).visible > *:nth-child(2) {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards;
}

section:not(.hero).visible > *:nth-child(3) {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;
}

section:not(.hero).visible > *:nth-child(4) {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
