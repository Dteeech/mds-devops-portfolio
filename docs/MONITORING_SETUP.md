# Guide de Configuration - Monitoring Grafana Cloud

Ce guide vous accompagne dans la configuration complète du monitoring pour votre application Next.js avec Grafana Faro (frontend) et OpenTelemetry (backend).

## 📋 Prérequis

- Un compte Grafana Cloud actif sur `https://dteeech.grafana.net`
- Node.js et npm installés
- Docker et Docker Compose (pour la production)

## 🔧 Configuration des Credentials

### 1. Grafana Faro (Frontend Monitoring)

#### Étape 1 : Créer une application Faro

1. Connectez-vous à `https://dteeech.grafana.net`
2. Dans le menu latéral : **Application → Frontend Observability**
3. Cliquez sur **"Add Frontend App"** ou sélectionnez une app existante
4. Notez les informations suivantes :
   - **URL du collecteur** : `https://faro-collector-prod-eu-west-2.grafana.net/collect/XXX`
   - **Instance ID** : visible dans l'URL

#### Étape 2 : Configuration locale

Éditez `.env.local` :

```bash
NEXT_PUBLIC_FARO_URL=https://faro-collector-prod-eu-west-2.grafana.net/collect/VOTRE_INSTANCE_ID
NEXT_PUBLIC_FARO_APP_NAME=mds-devops-portfolio
NEXT_PUBLIC_FARO_ENV=development
```

### 2. OpenTelemetry (Backend Traces)

#### Étape 1 : Générer un token OTLP

1. Dans Grafana Cloud : **Connections → Add new connection**
2. Recherchez **"OpenTelemetry"** ou **"OTLP"**
3. Cliquez sur **"Generate API Token"**
4. Copiez :
   - **Instance ID** (généralement un nombre comme `123456`)
   - **API Token** (chaîne longue générée)

#### Étape 2 : Encoder les credentials en Base64

```bash
# Remplacez INSTANCE_ID et TOKEN par vos valeurs
echo -n "INSTANCE_ID:TOKEN" | base64
```

Exemple :
```bash
echo -n "123456:glc_eyJrIjoiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoifQ==" | base64
# Résultat : MTIzNDU2OmdsY19leUp...
```

#### Étape 3 : Configuration locale

Éditez `.env.local` :

```bash
OTEL_SERVICE_NAME=mds-devops-portfolio
OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp-gateway-prod-eu-west-2.grafana.net/otlp
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic VOTRE_BASE64_ICI
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

## 🚀 Démarrage en Local

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer le serveur de développement

```bash
npm run dev
```

### 3. Vérifier les logs

Vous devriez voir dans la console :

```
✅ OpenTelemetry SDK initialisé avec succès
   Service: mds-devops-portfolio
   Endpoint: https://otlp-gateway-prod-eu-west-2.grafana.net/otlp

✅ Grafana Faro initialisé avec succès
✅ Core Web Vitals tracking activé
```

### 4. Tester l'envoi de données

1. Naviguez sur `http://localhost:3000`
2. Interagissez avec l'application (clic, scroll, navigation)
3. Vérifiez dans Grafana Cloud :
   - **Faro** : Application → Frontend Observability → Votre app
   - **Traces** : Explore → Tempo → Recherchez `mds-devops-portfolio`

## 🐳 Déploiement Docker

### 1. Créer le fichier .env pour Docker

```bash
cp .env.docker.example .env
```

### 2. Éditer .env avec vos credentials

```bash
# Même format que .env.local mais avec ENV=production
NEXT_PUBLIC_FARO_URL=https://faro-collector-prod-eu-west-2.grafana.net/collect/VOTRE_INSTANCE_ID
NEXT_PUBLIC_FARO_APP_NAME=mds-devops-portfolio
NEXT_PUBLIC_FARO_ENV=production

OTEL_SERVICE_NAME=mds-devops-portfolio
OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp-gateway-prod-eu-west-2.grafana.net/otlp
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic VOTRE_BASE64_ICI
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

### 3. Build et démarrage

```bash
docker-compose up -d --build
```

### 4. Vérifier les logs Docker

```bash
docker logs portfolio-isaac
```

## 📊 Créer le Dashboard Grafana

### Dashboard 1 : Frontend Performance (Faro)

1. Dans Grafana Cloud : **Dashboards → New → New Dashboard**
2. Ajoutez les panels suivants :

#### Panel 1 : Core Web Vitals

```promql
# Query pour LCP (Largest Contentful Paint)
faro_web_vitals_lcp_bucket

# Query pour FID (First Input Delay)
faro_web_vitals_fid_bucket

# Query pour CLS (Cumulative Layout Shift)
faro_web_vitals_cls_bucket
```

**Configuration** :
- Type : **Time series**
- Thresholds :
  - LCP : Vert < 2.5s, Orange 2.5-4s, Rouge > 4s
  - FID : Vert < 100ms, Orange 100-300ms, Rouge > 300ms
  - CLS : Vert < 0.1, Orange 0.1-0.25, Rouge > 0.25

#### Panel 2 : Erreurs JavaScript

```promql
# Nombre d'erreurs par type
sum by (error_type) (rate(faro_exceptions_total[5m]))
```

**Configuration** :
- Type : **Bar chart**
- Grouper par : `error_type`

#### Panel 3 : Sessions & Utilisateurs

```promql
# Sessions actives
faro_session_count

# Pages vues
sum(rate(faro_page_views_total[1m]))
```

**Configuration** :
- Type : **Stat**
- Affichage : Valeur actuelle + sparkline

#### Panel 4 : Performance par Page

```promql
# Temps de chargement moyen par page
histogram_quantile(0.95, sum(rate(faro_page_load_time_bucket[5m])) by (le, page))
```

**Configuration** :
- Type : **Table**
- Grouper par : `page`

### Dashboard 2 : Backend Traces (OpenTelemetry)

1. **Dashboards → New → New Dashboard**

#### Panel 1 : Latence des Requêtes

```promql
# P95 latence
histogram_quantile(0.95, sum(rate(http_server_duration_bucket[5m])) by (le))

# P99 latence
histogram_quantile(0.99, sum(rate(http_server_duration_bucket[5m])) by (le))
```

**Configuration** :
- Type : **Time series**
- Légende : P95, P99

#### Panel 2 : Taux d'Erreur

```promql
# Taux d'erreurs HTTP
sum(rate(http_server_requests_total{status=~"5.."}[5m])) / sum(rate(http_server_requests_total[5m])) * 100
```

**Configuration** :
- Type : **Gauge**
- Thresholds : Vert < 1%, Orange 1-5%, Rouge > 5%
- Unité : Percent

#### Panel 3 : Traces Service Map

**Configuration** :
- Type : **Node Graph**
- Source : **Tempo**
- Query : `{service.name="mds-devops-portfolio"}`

#### Panel 4 : Top Endpoints

```promql
# Requêtes les plus fréquentes
topk(10, sum by (http_route) (rate(http_server_requests_total[5m])))
```

**Configuration** :
- Type : **Table**
- Colonnes : Endpoint, Requêtes/min, Latence P95

### Dashboard 3 : Overview Complet

Créez un dashboard combinant :
- **Row 1** : Core Web Vitals (3 gauges : LCP, FID, CLS)
- **Row 2** : Erreurs Frontend + Backend (2 time series)
- **Row 3** : Utilisateurs actifs + Pages vues + Taux d'erreur (3 stats)
- **Row 4** : Latence P95/P99 Backend (1 time series)
- **Row 5** : Traces récentes (1 table)

## 🔔 Configuration des Alertes

### Alerte 1 : Core Web Vitals Dégradés

```yaml
Name: "CLS Trop Élevé"
Condition: faro_web_vitals_cls > 0.1
For: 5m
Severity: Warning
```

### Alerte 2 : Erreurs Frontend Élevées

```yaml
Name: "Pic d'Erreurs JavaScript"
Condition: rate(faro_exceptions_total[5m]) > 10
For: 2m
Severity: Critical
```

### Alerte 3 : Latence Backend Élevée

```yaml
Name: "Latence P95 Élevée"
Condition: histogram_quantile(0.95, http_server_duration_bucket) > 1000
For: 5m
Severity: Warning
```

## 📈 Métriques Recommandées

### Frontend (Faro)

- ✅ **Core Web Vitals** : LCP, FID, CLS, FCP, TTFB
- ✅ **Erreurs** : Exceptions JavaScript, console.error
- ✅ **Performance** : Page load time, TTI (Time to Interactive)
- ✅ **Engagement** : Scroll depth, click tracking, session duration
- ✅ **Navigation** : Client-side routing, SPA transitions

### Backend (OpenTelemetry)

- ✅ **HTTP** : Request rate, latency distribution, error rate
- ✅ **Server Components** : SSR rendering time, data fetching duration
- ✅ **Resources** : CPU usage, memory, garbage collection
- ✅ **External Calls** : API latency, database queries (si ajoutées)

## 🧪 Tester le Monitoring

### Test Frontend (Faro)

```javascript
// Déclencher une erreur intentionnelle
console.error('Test error for Grafana Faro');

// Ou via browser console
throw new Error('Test exception');
```

### Test Backend (OpenTelemetry)

```bash
# Générer du trafic
for i in {1..100}; do curl http://localhost:3000; done
```

Vérifiez dans Grafana :
- Faro : Les erreurs apparaissent dans "Exceptions"
- Tempo : Les traces apparaissent dans "Explore → Tempo"

## 🔍 Dépannage

### Faro ne se connecte pas

```bash
# Vérifier les variables d'environnement
echo $NEXT_PUBLIC_FARO_URL

# Vérifier dans browser console
# Devrait voir : "✅ Grafana Faro initialisé avec succès"
```

### OpenTelemetry ne se connecte pas

```bash
# Vérifier les variables
env | grep OTEL

# Vérifier les logs serveur
# Devrait voir : "✅ OpenTelemetry SDK initialisé avec succès"
```

### Pas de données dans Grafana

1. Vérifiez les credentials (Base64, URL)
2. Testez la connectivité réseau
3. Vérifiez les logs : `docker logs portfolio-isaac`
4. Attendez 30-60 secondes (latence d'ingestion)

## 📚 Ressources

- [Grafana Faro Documentation](https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/)
- [OpenTelemetry Next.js](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/)
- [Next.js Instrumentation](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation)
- [Core Web Vitals](https://web.dev/vitals/)

## ✅ Checklist de Validation

- [ ] `.env.local` configuré avec credentials valides
- [ ] `npm run dev` démarre sans erreurs
- [ ] Console affiche "✅ Grafana Faro initialisé"
- [ ] Console affiche "✅ OpenTelemetry SDK initialisé"
- [ ] Données visibles dans Grafana Cloud Frontend Observability
- [ ] Traces visibles dans Grafana Cloud Explore → Tempo
- [ ] Dashboard créé avec panels Core Web Vitals
- [ ] Alertes configurées pour métriques critiques
- [ ] `.env` créé pour Docker avec credentials production
- [ ] `docker-compose up` fonctionne en production

---

**Support** : En cas de problème, vérifiez d'abord les logs console et Docker, puis consultez la documentation Grafana Cloud.
