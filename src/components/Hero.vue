<template>
  <section class="hero" id="about">
    <!-- Parallax Background -->
    <div class="parallax-container">
      <div class="parallax-layer mountain-bg"></div>
      <div class="overlay"></div>
    </div>

    <!-- Content -->
    <div class="hero-content">
      <div class="container">
        <div class="name-container">
          <h1 class="title">{{ personal.name }}</h1>
          <div class="title-line"></div>
        </div>
        <p class="subtitle">{{ personal.title }}</p>
        <div class="social-links">
          <a :href="personal.github" target="_blank" rel="noopener">GitHub</a>
          <a :href="personal.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a :href="`mailto:${personal.email}`">Email</a>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero',
  props: {
    personal: {
      type: Object,
      required: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleParallax)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleParallax)
  },
  methods: {
    handleParallax() {
      const scrolled = window.pageYOffset
      const mountainBg = document.querySelector('.mountain-bg')

      if (mountainBg) {
        mountainBg.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Parallax Container */
.parallax-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.parallax-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

/* Mountain Background - Always dark */
.mountain-bg {
  background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
  filter: brightness(0.6);
}

/* Dark overlay - Always dark */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  text-align: left;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  min-height: 100vh;
  padding-bottom: 8rem;
}

.container {
  max-width: 1200px;
  margin: 0 0 0 4rem;
}

.name-container {
  position: relative;
  margin-bottom: 2rem;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  margin: 0;
  font-weight: 400;
  color: white;
  letter-spacing: 3px;
  position: relative;
  display: inline-block;
  padding-bottom: 0.75rem;
}

.subtitle {
  font-size: clamp(0.95rem, 2.5vw, 1.2rem);
  margin: 0 0 2.5rem 0;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  letter-spacing: 2px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.social-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 400;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-links a::before {
  content: '→';
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.social-links a:hover {
  color: white;
  padding-left: 0.5rem;
}

.social-links a:hover::before {
  opacity: 1;
  transform: translateX(0);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.mouse {
  width: 24px;
  height: 38px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  position: relative;
}

.wheel {
  width: 3px;
  height: 7px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    align-items: center;
    padding-bottom: 6rem;
  }

  .container {
    margin: 0 auto;
    text-align: center;
  }

  .social-links {
    align-items: center;
  }

  .title {
    letter-spacing: 1px;
  }

  .subtitle {
    letter-spacing: 1px;
  }

  .social-links a {
    letter-spacing: 0.5px;
  }
}
</style>
