<template>
  <section class="contact" id="contact">
    <div class="contact-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ labels.contact }}</h2>
        <div class="title-line"></div>
        <p class="section-subtitle">{{ labels.contactSubtitle }}</p>
      </div>

      <!-- Contact Grid -->
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info">
          <h3 class="info-title">{{ labels.getInTouch }}</h3>
          <p class="info-text">{{ labels.contactDescription }}</p>

          <div class="info-items">
            <div class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <p class="info-label">Email</p>
                <a :href="`mailto:${personal.email}`" class="info-value">{{ personal.email }}</a>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </div>
              <div>
                <p class="info-label">GitHub</p>
                <a :href="personal.github" target="_blank" rel="noopener" class="info-value">{{ getGitHubUsername(personal.github) }}</a>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div>
                <p class="info-label">LinkedIn</p>
                <a :href="personal.linkedin" target="_blank" rel="noopener" class="info-value">{{ getLinkedInUsername(personal.linkedin) }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <form @submit.prevent="handleSubmit" class="contact-form" novalidate>
            <div class="form-group">
              <label for="name" class="form-label">{{ labels.name }} *</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                @blur="validateField('name')"
                class="form-input"
                :class="{ 'error': errors.name }"
                placeholder="John Doe"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">{{ labels.email }} *</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                @blur="validateField('email')"
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="john.doe@example.com"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">{{ labels.subject }} *</label>
              <input
                type="text"
                id="subject"
                v-model="formData.subject"
                @blur="validateField('subject')"
                class="form-input"
                :class="{ 'error': errors.subject }"
                placeholder="Projet web"
              />
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">{{ labels.message }} *</label>
              <textarea
                id="message"
                v-model="formData.message"
                @blur="validateField('message')"
                class="form-textarea"
                :class="{ 'error': errors.message }"
                rows="5"
                placeholder="Votre message..."
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">{{ labels.send }}</span>
              <span v-else>{{ labels.sending }}</span>
              <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>

            <div v-if="submitStatus === 'success'" class="status-message success">
              {{ labels.successMessage }}
            </div>
            <div v-if="submitStatus === 'error'" class="status-message error">
              {{ labels.errorMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactForm',
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
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      submitStatus: null
    }
  },
  methods: {
    getGitHubUsername(url) {
      return url.split('/').pop() || 'GitHub'
    },
    getLinkedInUsername(url) {
      return url.split('/in/').pop()?.replace('/', '') || 'LinkedIn'
    },
    validateField(field) {
      this.errors[field] = ''

      if (!this.formData[field] || !this.formData[field].trim()) {
        this.errors[field] = this.labels.required || 'Ce champ est requis'
        return false
      }

      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.formData[field])) {
          this.errors[field] = this.labels.invalidEmail || 'Email invalide'
          return false
        }
      }

      if (field === 'message' && this.formData[field].length < 10) {
        this.errors[field] = this.labels.messageTooShort || 'Le message doit contenir au moins 10 caractères'
        return false
      }

      return true
    },
    validateForm() {
      let isValid = true
      Object.keys(this.formData).forEach(field => {
        if (!this.validateField(field)) {
          isValid = false
        }
      })
      return isValid
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        return
      }

      this.isSubmitting = true
      this.submitStatus = null

      try {
        // Simulation d'envoi (à remplacer par EmailJS ou votre backend)
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Pour implémenter EmailJS, installez: npm install @emailjs/browser
        // Puis utilisez:
        // import emailjs from '@emailjs/browser'
        // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this.formData, 'YOUR_PUBLIC_KEY')

        console.log('Form submitted:', this.formData)

        this.submitStatus = 'success'
        this.resetForm()
      } catch (error) {
        console.error('Error submitting form:', error)
        this.submitStatus = 'error'
      } finally {
        this.isSubmitting = false
        setTimeout(() => {
          this.submitStatus = null
        }, 5000)
      }
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      this.errors = {}
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.contact {
  padding: 6rem 2rem;
  background: #0a0a0a;
  position: relative;
}

.contact-container {
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
  margin-bottom: 1rem;
}

.section-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

/* Contact Info */
.contact-info {
  padding: 2rem;
}

.info-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: 1px;
}

.info-text {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.info-icon {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  flex-shrink: 0;
}

.info-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.3rem;
  letter-spacing: 0.5px;
}

.info-value {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.info-value:hover {
  color: #ffffff;
}

/* Contact Form */
.contact-form-wrapper {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.form-input,
.form-textarea {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.9rem 1.2rem;
  color: #ffffff;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.3);
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-input.error,
.form-textarea.error {
  border-color: rgba(239, 68, 68, 0.5);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  color: rgba(239, 68, 68, 0.9);
  font-size: 0.85rem;
  margin-top: -0.3rem;
}

/* Submit Button */
.submit-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem 2rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Status Messages */
.status-message {
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

.status-message.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: rgba(134, 239, 172, 1);
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: rgba(252, 165, 165, 1);
}

/* Responsive */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .contact {
    padding: 4rem 1.5rem;
  }

  .contact-form-wrapper {
    padding: 1.5rem;
  }

  .contact-info {
    padding: 1rem;
  }
}
</style>
