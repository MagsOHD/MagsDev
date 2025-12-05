<template>
  <section class="availability" id="availability-section">
    <div class="availability-container">
      <!-- Title Section -->
      <div class="section-header">
        <h2 class="section-title">{{ labels.availability }}</h2>
        <div class="title-line"></div>
      </div>

      <!-- Status Card -->
      <div class="status-card">
        <div class="status-indicator" :class="availabilityData.status">
          <div class="pulse-dot"></div>
          <span class="status-text">{{ getStatusText() }}</span>
        </div>
        <p class="status-description">{{ availabilityData.message }}</p>
      </div>

      <!-- Calendar Grid -->
      <div class="calendar-section">
        <div class="calendar-header">
          <button @click="previousMonth" class="nav-btn" aria-label="Mois précédent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h3 class="calendar-title">{{ currentMonthYear }}</h3>
          <button @click="nextMonth" class="nav-btn" aria-label="Mois suivant">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <!-- Days of week -->
        <div class="calendar-weekdays">
          <div v-for="day in weekDays" :key="day" class="weekday">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Days -->
        <div class="calendar-grid">
          <div
            v-for="day in calendarDays"
            :key="day.date"
            class="calendar-day"
            :class="{
              'other-month': !day.currentMonth,
              'available': day.available,
              'busy': day.busy,
              'today': day.isToday
            }"
          >
            <span class="day-number">{{ day.day }}</span>
            <span v-if="day.available" class="day-badge available-badge">
              {{ labels.availableShort || 'Libre' }}
            </span>
            <span v-else-if="day.busy" class="day-badge busy-badge">
              {{ labels.busyShort || 'Occupé' }}
            </span>
          </div>
        </div>

        <!-- Legend -->
        <div class="calendar-legend">
          <div class="legend-item">
            <span class="legend-dot available"></span>
            <span class="legend-text">{{ labels.availableDays || 'Disponible' }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot busy"></span>
            <span class="legend-text">{{ labels.busyDays || 'Occupé' }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot today"></span>
            <span class="legend-text">{{ labels.today || 'Aujourd\'hui' }}</span>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section">
        <p class="cta-text">{{ labels.availabilityCta || 'Vous avez un projet en tête ?' }}</p>
        <a href="#contact" class="cta-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          {{ labels.contactMe || 'Me contacter' }}
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Availability',
  props: {
    availabilityData: {
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
      currentDate: new Date(),
      weekDays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    }
  },
  computed: {
    currentMonthYear() {
      const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
      ]
      return `${months[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()

      // Premier jour du mois
      const firstDay = new Date(year, month, 1)
      // Dernier jour du mois
      const lastDay = new Date(year, month + 1, 0)

      // Jour de la semaine du premier jour (0=Dimanche, 1=Lundi, etc.)
      let firstDayOfWeek = firstDay.getDay()
      // Convertir pour que Lundi = 0
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

      const days = []
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Jours du mois précédent
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const date = new Date(year, month, -i)
        days.push({
          day: date.getDate(),
          date: date.toISOString(),
          currentMonth: false,
          available: false,
          busy: false,
          isToday: false
        })
      }

      // Jours du mois actuel
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day)
        const dateStr = this.formatDate(date)
        const isToday = date.getTime() === today.getTime()

        days.push({
          day,
          date: date.toISOString(),
          currentMonth: true,
          available: this.availabilityData.availableDates?.includes(dateStr) || false,
          busy: this.availabilityData.busyDates?.includes(dateStr) || false,
          isToday
        })
      }

      // Jours du mois suivant pour compléter la grille
      const remainingDays = 42 - days.length // 6 semaines × 7 jours
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day)
        days.push({
          day,
          date: date.toISOString(),
          currentMonth: false,
          available: false,
          busy: false,
          isToday: false
        })
      }

      return days
    }
  },
  methods: {
    getStatusText() {
      const statusTexts = {
        available: this.labels.statusAvailable || 'Disponible maintenant',
        limited: this.labels.statusLimited || 'Disponibilité limitée',
        busy: this.labels.statusBusy || 'Occupé actuellement'
      }
      return statusTexts[this.availabilityData.status] || statusTexts.available
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      )
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      )
    }
  },
  mounted() {
    // Ajuster les jours de la semaine selon la langue
    if (this.labels.language === 'en') {
      this.weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  }
}
</script>

<style scoped>
.availability {
  padding: 6rem 2rem;
  position: relative;
}

.availability-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 3rem;
  font-family: 'Playfair Display', serif;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
}

.title-line {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--text-primary), transparent);
  margin: 0 auto;
}

/* Status Card */
.status-card {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
  box-shadow: 0 4px 12px var(--shadow);
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
}

.status-indicator.available .pulse-dot {
  background: #22c55e;
  animation: pulse 2s infinite;
}

.status-indicator.limited .pulse-dot {
  background: #f59e0b;
  animation: pulse 2s infinite;
}

.status-indicator.busy .pulse-dot {
  background: #ef4444;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 currentColor;
    opacity: 1;
  }
  50% {
    box-shadow: 0 0 0 8px transparent;
    opacity: 0.7;
  }
}

.status-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.status-description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
}

/* Calendar Section */
.calendar-section {
  background: var(--card-bg);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px var(--shadow);
  margin-bottom: 3rem;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.calendar-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  color: var(--text-primary);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: var(--bg-secondary);
  border-color: var(--text-secondary);
  transform: scale(1.05);
}

/* Calendar Grid */
.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.weekday {
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-tertiary);
  padding: 0.5rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.calendar-day {
  aspect-ratio: 1;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
  background: var(--bg-secondary);
}

.calendar-day.other-month {
  opacity: 0.3;
}

.calendar-day.today {
  border-color: var(--accent-light);
  border-width: 2px;
  background: rgba(37, 99, 235, 0.05);
}

.calendar-day.available {
  background: rgba(34, 197, 94, 0.08);
  border-color: #22c55e;
}

.calendar-day.busy {
  background: rgba(239, 68, 68, 0.08);
  border-color: #ef4444;
}

.calendar-day:hover:not(.other-month) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px var(--shadow-md);
}

.day-number {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.day-badge {
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  text-transform: uppercase;
}

.available-badge {
  background: #22c55e;
  color: white;
}

.busy-badge {
  background: #ef4444;
  color: white;
}

/* Legend */
.calendar-legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-dot.available {
  background: #22c55e;
}

.legend-dot.busy {
  background: #ef4444;
}

.legend-dot.today {
  background: var(--accent-light);
}

.legend-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* CTA Section */
.cta-section {
  text-align: center;
}

.cta-text {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  color: var(--text-primary);
  padding: 1rem 2.5rem;
  border: 2px solid var(--text-primary);
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  letter-spacing: 0.3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--text-primary);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.cta-btn:hover::before {
  transform: translateX(0);
}

.cta-btn:hover {
  color: #ffffff;
  box-shadow: 0 8px 24px var(--shadow-lg);
  transform: translateY(-2px);
}

.cta-btn svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.cta-btn:hover svg {
  transform: translateX(3px);
}

/* Responsive */
@media (max-width: 768px) {
  .availability {
    padding: 4rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .calendar-section {
    padding: 1.5rem;
  }

  .calendar-grid {
    gap: 0.25rem;
  }

  .calendar-day {
    padding: 0.25rem;
  }

  .day-number {
    font-size: 0.75rem;
  }

  .day-badge {
    display: none;
  }

  .calendar-legend {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .weekday {
    font-size: 0.75rem;
  }
}
</style>
