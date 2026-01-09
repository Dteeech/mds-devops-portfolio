# 📋 Plan d'Intégration des Tests - Portfolio Isaac

## 🎯 Objectif
Mettre en place une suite de tests unitaires pour valider l'affichage des sections du portfolio avec une intégration dans le pipeline CI/CD GitHub Actions.

---

## 🔍 Analyse du Projet

### Stack Technique Identifiée
- **Framework** : Next.js 16 (Canary) avec App Router
- **React** : v19.2.3
- **Composants** : Mix de Server Components (page.js) et Client Components (ui-client.js)
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **CI/CD** : GitHub Actions
- **Déploiement** : Docker sur VPS

### Architecture des Composants
```
app/
├── page.js (Server Component)
│   ├── Hero Section
│   ├── About Section
│   ├── Skills Section
│   ├── Projects Section
│   └── Experience & Stack Section
└── components/
    └── ui-client.js (Client Components)
        ├── HeroSection
        ├── Reveal
        ├── ProjectCard
        ├── SkillBadge
        └── TechStack
```

---

## 🛠️ Stack de Tests Recommandée

### Outils Principaux
1. **Jest** (v29+) - Framework de test
2. **React Testing Library** - Tests de composants React
3. **@testing-library/jest-dom** - Matchers personnalisés pour le DOM
4. **jest-environment-jsdom** - Environnement DOM pour Jest

### Pourquoi ce choix ?
- ✅ Recommandé officiellement par Next.js et React
- ✅ Compatible avec React 19 et Server Components
- ✅ Approche centrée utilisateur (test du comportement visible)
- ✅ Excellent support pour les composants asynchrones
- ✅ Intégration native dans les workflows CI/CD

---

## 📦 Dépendances à Installer

```json
{
  "devDependencies": {
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.4",
    "@testing-library/user-event": "^14.5.2",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

---

## 🗂️ Structure des Tests Proposée

```
specs/
├── PLAN.md (ce fichier)
├── setup/
│   └── jest.setup.js
├── unit/
│   ├── components/
│   │   ├── HeroSection.test.js
│   │   ├── ProjectCard.test.js
│   │   ├── SkillBadge.test.js
│   │   └── TechStack.test.js
│   └── pages/
│       └── Home.test.js
└── config/
    └── jest.config.js
```

---

## ✅ Scénarios de Tests à Couvrir

### 1. Page d'Accueil (Home)
- ✓ Le composant s'affiche sans erreur
- ✓ La balise `<main>` est présente
- ✓ Toutes les sections sont rendues (Hero, About, Skills, Projects, Experience)
- ✓ Les IDs des sections sont corrects (#about, #skills, #projects)

### 2. Hero Section
- ✓ Le titre "Isaac" est affiché
- ✓ Le badge "Stack : Next.js 16 & Tailwind v4" est présent
- ✓ Les boutons CTA sont présents et cliquables
- ✓ Les liens pointent vers les bonnes ancres

### 3. About Section
- ✓ Le titre "À propos" est affiché
- ✓ Le texte contient "4 ans d'expérience"
- ✓ L'école "My Digital School Saint-Herblain" est mentionnée
- ✓ Le parcours professionnel est affiché

### 4. Skills Section
- ✓ Le titre "Compétences" est affiché
- ✓ Les sections "Tech Stack" et "Transverse & SEO" sont présentes
- ✓ Les compétences principales sont listées (Next.js 16, React 19, SEO Technique, etc.)

### 5. Projects Section
- ✓ Le titre "Projets Récents" est affiché
- ✓ Les 3 projets sont rendus (SaaS Audit SEO, E-commerce Headless, Dashboard Analytics)
- ✓ Chaque projet affiche son titre, description et tags

### 6. Experience & Stack Section
- ✓ Le titre "Mon Environnement" est affiché
- ✓ Les outils sont listés (VS Code, Figma, Docker, etc.)
- ✓ La section "Prêt à collaborer ?" est présente
- ✓ Le lien de contact est fonctionnel

---

## 🚀 Plan d'Exécution

### Phase 1 : Configuration (15 min)
1. ✅ Installer les dépendances de test
2. ✅ Créer le fichier de configuration Jest
3. ✅ Créer le fichier de setup Jest
4. ✅ Ajouter le script `test` dans package.json

### Phase 2 : Écriture des Tests (45 min)
1. ✅ Tests de la page Home
2. ✅ Tests de HeroSection
3. ✅ Tests des composants réutilisables (ProjectCard, SkillBadge)
4. ✅ Tests de TechStack

### Phase 3 : Intégration CI/CD (15 min)
1. ✅ Ajouter l'étape de tests dans `.github/workflows/main.yml`
2. ✅ Configurer le cache des dépendances
3. ✅ Vérifier que les tests s'exécutent avant le build Docker

### Phase 4 : Validation (10 min)
1. ✅ Exécuter les tests en local
2. ✅ Vérifier le passage des tests dans GitHub Actions
3. ✅ Ajuster la couverture de code si nécessaire

---

## 🐳 Intégration Docker

### Stratégie
- Les tests ne seront **PAS** exécutés dans le conteneur Docker final
- Les tests seront exécutés **AVANT** le build de l'image Docker dans GitHub Actions
- Cela garantit que seul le code validé est déployé

### Workflow GitHub Actions
```yaml
steps:
  - name: 📥 Checkout
  - name: 📦 Install dependencies
  - name: 🧪 Run tests          # ← NOUVEAU
  - name: 🔨 Build application
  - name: 🐳 Build Docker image
  - name: 🚀 Push to registry
```

---

## 📊 Métriques de Succès

- ✅ **Couverture de code** : Minimum 80% sur les composants UI
- ✅ **Temps d'exécution** : < 30 secondes pour l'ensemble des tests
- ✅ **Fiabilité** : 0 test flaky (instable)
- ✅ **CI/CD** : Les tests passent avant chaque déploiement

---

## 🔄 Maintenance Future

### Bonnes Pratiques
1. Ajouter des tests pour chaque nouveau composant
2. Maintenir la couverture de code > 80%
3. Utiliser des snapshots avec parcimonie (seulement pour les composants stables)
4. Privilégier les tests comportementaux plutôt que les tests d'implémentation

### Extensions Possibles
- Tests E2E avec Playwright (navigation complète du portfolio)
- Tests de performance avec Lighthouse CI
- Tests d'accessibilité avec jest-axe
- Tests de régression visuelle avec Percy ou Chromatic

---

## 📝 Notes Techniques

### Gestion de Framer Motion
Framer Motion peut causer des avertissements dans les tests. Solution :
```javascript
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    // ...
  },
}));
```

### Gestion des Server Components
Next.js 16 avec Server Components nécessite des mocks spécifiques. Les tests se concentrent sur le rendu HTML final plutôt que sur l'hydratation.

---

**Dernière mise à jour** : 9 janvier 2026  
**Statut** : 📝 En attente d'implémentation
