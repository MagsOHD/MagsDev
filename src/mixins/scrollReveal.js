// Mixin pour ajouter des animations de révélation au scroll
export const scrollRevealMixin = {
  data() {
    return {
      observer: null,
      isRevealed: false
    }
  },
  mounted() {
    this.initScrollReveal()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    initScrollReveal() {
      const options = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            this.isRevealed = true
            // Optionnel : arrêter d'observer après révélation
            if (this.observer && entry.target) {
              this.observer.unobserve(entry.target)
            }
          }
        })
      }, options)

      // Observer l'élément racine du composant
      if (this.$el) {
        this.observer.observe(this.$el)
      }
    }
  }
}

// Utilisation dans un composant :
// import { scrollRevealMixin } from '@/mixins/scrollReveal'
// export default {
//   mixins: [scrollRevealMixin],
//   ...
// }
