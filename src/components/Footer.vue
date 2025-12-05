<template>
  <footer class="footer" id="contact">
    <div class="container">
      <p>&copy; {{ currentYear }} {{ personal.name }}. {{ labels.allRightsReserved }}.</p>
      <p class="contact-email">
        {{ labels.contact }}: <a :href="`mailto:${personal.email}`">{{ personal.email }}</a>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    personal: {
      type: Object,
      required: true
    },
    labels: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: #0f0f0f;
  color: #e4e4e7;
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid #2a2a2a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer p {
  margin: 0.5rem 0;
}

.contact-email a {
  color: #a1a1aa;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-email a:hover {
  color: #f4f4f5;
}
</style>
