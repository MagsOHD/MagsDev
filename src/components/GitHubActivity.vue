<template>
  <section class="github-activity" id="github">
    <div class="github-container">
      <!-- Section Header -->
      <div class="section-header">
        <h2 class="section-title">{{ labels.githubActivity || 'Activité GitHub' }}</h2>
        <div class="title-line"></div>
      </div>

      <!-- GitHub Stats Grid -->
      <div class="stats-wrapper">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div class="stat-value">{{ githubStats.repos }}</div>
            <div class="stat-label">{{ labels.repositories || 'Repositories' }}</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div class="stat-value">{{ githubStats.stars }}</div>
            <div class="stat-label">{{ labels.stars || 'Stars' }}</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="stat-value">{{ githubStats.followers }}</div>
            <div class="stat-label">{{ labels.followers || 'Followers' }}</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            </div>
            <div class="stat-value">{{ githubStats.contributions }}</div>
            <div class="stat-label">{{ labels.contributions || 'Contributions' }}</div>
          </div>
        </div>

        <!-- GitHub & GitLab Links -->
        <div class="git-links-wrapper">
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="git-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="external-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <a :href="gitlabUrl" target="_blank" rel="noopener noreferrer" class="git-link gitlab">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="m23.6004 9.5927-.0337-.0862L20.3.9814a.851.851 0 0 0-.3362-.405.8748.8748 0 0 0-.9997.0539.8748.8748 0 0 0-.29.4399l-2.2055 6.748H7.5375l-2.2057-6.748a.8573.8573 0 0 0-.29-.4412.8748.8748 0 0 0-.9997-.0539.8573.8573 0 0 0-.3362.4049L.4332 9.5015l-.0325.0862a6.0657 6.0657 0 0 0 2.0119 7.0009l.0113.0087.03.0213 4.976 3.7264 2.462 1.8633 1.4995 1.1321a1.0085 1.0085 0 0 0 1.2197 0l1.4995-1.1321 2.4619-1.8633 5.006-3.7489.0125-.01a6.0682 6.0682 0 0 0 2.0094-7.003z"/>
            </svg>
            <span>GitLab</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="external-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      <!-- Language Stats -->
      <div class="languages-section" v-if="topLanguages && topLanguages.length > 0">
        <h3 class="subsection-title">{{ labels.topLanguages || 'Langages les plus utilisés' }}</h3>
        <div class="languages-grid">
          <div
            v-for="lang in topLanguages"
            :key="lang.name"
            class="language-item"
          >
            <div class="language-info">
              <span class="language-name">{{ lang.name }}</span>
              <span class="language-percentage">{{ lang.percentage }}%</span>
            </div>
            <div class="language-bar">
              <div
                class="language-progress"
                :style="{ width: lang.percentage + '%', background: lang.color }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GitHubActivity',
  props: {
    githubUsername: {
      type: String,
      required: true
    },
    gitlabUsername: {
      type: String,
      required: false,
      default: ''
    },
    labels: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      githubStats: {
        repos: '--',
        stars: '--',
        followers: '--',
        contributions: '--'
      },
      topLanguages: [],
      isLoading: true
    }
  },
  computed: {
    githubUrl() {
      return `https://github.com/${this.githubUsername}`
    },
    gitlabUrl() {
      return this.gitlabUsername ? `https://gitlab.com/${this.gitlabUsername}` : '#'
    }
  },
  mounted() {
    // Utilisation de l'API GitHub réelle avec langages personnalisés
    // Note: Avec token, limité à 5000 requêtes/heure
    this.fetchGitHubData()
    // Pour utiliser des données statiques uniquement, décommentez :
    // this.loadMockData()
  },
  methods: {
    loadMockData() {
      // Données réelles à mettre à jour manuellement ou utiliser fetchGitHubData()
      this.githubStats = {
        repos: '12',
        stars: '8',
        followers: '5',
        contributions: '200+'
      }
      this.topLanguages = [
        { name: 'PHP', percentage: 35, color: '#777BB4' },
        { name: 'JavaScript', percentage: 30, color: '#f1e05a' },
        { name: 'SQL', percentage: 15, color: '#e38c00' },
        { name: 'CSS', percentage: 5, color: '#563d7c' },
        { name: 'Vue.js', percentage: 5, color: '#41b883' },
        { name: 'Java', percentage: 5, color: '#b07219' },
        { name: 'HTML', percentage: 5, color: '#e34c26' }
      ]
      this.isLoading = false
    },
    async fetchGitHubData() {
      // Implémentation pour récupérer les vraies données GitHub
      try {
        const username = this.githubUsername
        const token = import.meta.env.VITE_GITHUB_TOKEN

        const headers = token ? {
          'Authorization': `token ${token}`
        } : {}

        // Récupérer les infos utilisateur
        const userResponse = await fetch(`https://api.github.com/users/${username}`, { headers })
        const userData = await userResponse.json()

        this.githubStats.repos = userData.public_repos
        this.githubStats.followers = userData.followers

        // Récupérer les repos pour compter les stars
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers })
        const reposData = await reposResponse.json()

        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        this.githubStats.stars = totalStars

        // Statistiques de contributions (estimation basée sur les repos récents)
        this.githubStats.contributions = '200+'

        // Utiliser les pourcentages de langages personnalisés
        this.topLanguages = [
          { name: 'PHP', percentage: 35, color: '#777BB4' },
          { name: 'JavaScript', percentage: 30, color: '#f1e05a' },
          { name: 'SQL', percentage: 15, color: '#e38c00' },
          { name: 'CSS', percentage: 5, color: '#563d7c' },
          { name: 'Vue.js', percentage: 5, color: '#41b883' },
          { name: 'Java', percentage: 5, color: '#b07219' },
          { name: 'HTML', percentage: 5, color: '#e34c26' }
        ]

        this.isLoading = false
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        this.loadMockData()
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.github-activity {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #121212 50%, #0a0a0a 100%);
  position: relative;
}

.github-container {
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

/* Stats Grid */
.stats-wrapper {
  margin-bottom: 4rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.stat-card:hover .stat-icon {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.1);
}

.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Git Links (GitHub & GitLab) */
.git-links-wrapper {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.git-link {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
}

.git-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.git-link svg {
  transition: transform 0.3s ease;
}

.git-link:hover .external-icon {
  transform: translate(2px, -2px);
}

.git-link.gitlab:hover {
  border-color: rgba(252, 109, 38, 0.5);
}

.git-link svg:first-child {
  flex-shrink: 0;
}

/* Languages Section */
.languages-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.subsection-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 1px;
}

.languages-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.language-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.language-item:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

.language-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}

.language-name {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-size: 0.95rem;
}

.language-percentage {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.language-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.language-progress {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .github-activity {
    padding: 4rem 1.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .stat-card {
    padding: 1.5rem;
  }

  .stat-value {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
