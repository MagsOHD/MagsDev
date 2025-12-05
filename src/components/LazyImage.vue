<template>
  <div class="lazy-image-wrapper" :class="{ loaded: isLoaded }">
    <img
      v-if="!isLoaded"
      :src="placeholder"
      :alt="alt"
      class="placeholder-image"
    />
    <img
      ref="image"
      :data-src="src"
      :alt="alt"
      :class="['lazy-image', { visible: isLoaded }]"
      @load="onLoad"
      @error="onError"
    />
    <div v-if="isLoading" class="loading-spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23111111"/%3E%3C/svg%3E'
    },
    alt: {
      type: String,
      default: ''
    },
    threshold: {
      type: Number,
      default: 0.1
    }
  },
  data() {
    return {
      isLoaded: false,
      isLoading: false,
      observer: null
    }
  },
  mounted() {
    this.initIntersectionObserver()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    initIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: this.threshold
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isLoaded) {
            this.loadImage()
          }
        })
      }, options)

      this.observer.observe(this.$refs.image)
    },
    loadImage() {
      this.isLoading = true
      const img = this.$refs.image
      const src = img.dataset.src

      if (src) {
        img.src = src
      }
    },
    onLoad() {
      this.isLoaded = true
      this.isLoading = false
      this.$emit('loaded')

      if (this.observer) {
        this.observer.disconnect()
      }
    },
    onError(error) {
      this.isLoading = false
      this.$emit('error', error)
      console.error('Error loading image:', this.src)
    }
  }
}
</script>

<style scoped>
.lazy-image-wrapper {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(10px);
  transition: opacity 0.3s ease;
}

.lazy-image-wrapper.loaded .placeholder-image {
  opacity: 0;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
}

.lazy-image.visible {
  opacity: 1;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
