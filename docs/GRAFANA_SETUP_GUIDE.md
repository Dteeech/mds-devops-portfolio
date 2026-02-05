# Guide Complet - Configuration Grafana Cloud pour mds-devops-portfolio

Guide détaillé pour configurer Grafana Cloud, créer des datasources, des dashboards personnalisés et des alertes pour monitorer votre application Next.js avec Grafana Faro (frontend) et OpenTelemetry (backend).

---

## 📚 Table des matières

1. [Configuration initiale Grafana Cloud](#1-configuration-initiale-grafana-cloud)
2. [Configuration des Data Sources](#2-configuration-des-data-sources)
3. [Création du Dashboard Frontend (Faro)](#3-création-du-dashboard-frontend-faro)
4. [Création du Dashboard Backend (OpenTelemetry/Tempo)](#4-création-du-dashboard-backend-opentelemetrytempo)
5. [Dashboard Unifié - Vue d'ensemble](#5-dashboard-unifié---vue-densemble)
6. [Configuration des Alertes](#6-configuration-des-alertes)
7. [Variables de Dashboard](#7-variables-de-dashboard)
8. [Import/Export de Dashboards](#8-importexport-de-dashboards)
9. [Best Practices](#9-best-practices)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Configuration initiale Grafana Cloud

### 1.1. Accès à votre instance

1. Naviguez vers **https://dteeech.grafana.net**
2. Connectez-vous avec vos identifiants
3. Vous arrivez sur le **Home Dashboard**

### 1.2. Navigation dans l'interface

```
Menu principal (barre latérale gauche):
├── Home
├── Dashboards
├── Explore
├── Alerting
├── Connections
│   ├── Data sources
│   └── Add new connection
├── Application
│   ├── Frontend Observability
│   └── Application Observability
└── Administration
```

### 1.3. Vérification de votre plan

1. Menu **Administration** → **General**
2. Section **Stack** : Vérifiez votre plan (Free, Pro, Advanced)
3. Notez vos limites :
   - **Metrics** : Nombre de séries actives
   - **Logs** : Volume GB/mois
   - **Traces** : Spans/mois
   - **Frontend Sessions** : Sessions/mois

---

## 2. Configuration des Data Sources

### 2.1. Grafana Faro (Frontend Observability)

#### Étape 1 : Créer l'application Faro

1. Menu **Application** → **Frontend Observability**
2. Cliquez **"Create new app"**
3. Remplissez :
   - **App name** : `mds-devops-portfolio`
   - **Description** : Portfolio DevOps avec monitoring RUM
   - **Environment** : `production` (créez aussi `development` si besoin)

4. Cliquez **"Create"**

#### Étape 2 : Récupérer les credentials

Après création, vous verrez :

```javascript
// Instrumentation snippet
const faro = initializeFaro({
  url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/abc123def456',
  app: {
    name: 'mds-devops-portfolio',
    version: '1.0.0',
  }
});
```

**Copiez l'URL** : `https://faro-collector-prod-eu-west-2.grafana.net/collect/abc123def456`

#### Étape 3 : Configurer .env.local

```bash
NEXT_PUBLIC_FARO_URL=https://faro-collector-prod-eu-west-2.grafana.net/collect/abc123def456
NEXT_PUBLIC_FARO_APP_NAME=mds-devops-portfolio
NEXT_PUBLIC_FARO_ENV=development
```

#### Étape 4 : Vérifier la connexion

1. Démarrez votre app : `npm run dev`
2. Naviguez sur `http://localhost:3000`
3. Retournez dans **Frontend Observability** → `mds-devops-portfolio`
4. Onglet **"Overview"** : Vous devriez voir des sessions actives après ~30 secondes

### 2.2. Tempo (OpenTelemetry Traces)

#### Étape 1 : Accéder à Tempo

1. Menu **Connections** → **Add new connection**
2. Recherchez **"OpenTelemetry"** ou **"OTLP"**
3. Sélectionnez **"OpenTelemetry Protocol (OTLP)"**

#### Étape 2 : Générer le token

1. Section **"Authentication"**
2. Cliquez **"Generate now"** pour créer un nouveau token
3. **Copiez immédiatement** :
   - **Instance ID** : `123456` (exemple)
   - **Token** : `glc_eyJrIjoiYWJj...` (très long)

⚠️ **Important** : Le token ne sera plus visible après fermeture de la fenêtre !

#### Étape 3 : Encoder en Base64

```bash
# Format: INSTANCE_ID:TOKEN
echo -n "123456:glc_eyJrIjoiYWJjZGVm..." | base64
```

**Résultat** (exemple) :
```
MTIzNDU2OmdsY19leUpyIjoiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoifQ==
```

#### Étape 4 : Configurer .env.local

```bash
OTEL_SERVICE_NAME=mds-devops-portfolio
OTEL_EXPORTER_OTLP_ENDPOINT=https://otlp-gateway-prod-eu-west-2.grafana.net/otlp
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic MTIzNDU2OmdsY19leUpyIjoiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoifQ==
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

#### Étape 5 : Vérifier la connexion

1. Redémarrez votre app
2. Menu **Explore** → Datasource : **Tempo**
3. Query type : **Search**
4. Service name : `mds-devops-portfolio`
5. Cliquez **"Run query"**
6. Vous devriez voir des traces après quelques requêtes à votre app

### 2.3. Prometheus (Métriques - optionnel)

Si vous ajoutez des métriques custom :

1. **Connections** → **Data sources** → **Prometheus**
2. Votre instance a déjà Prometheus configuré par défaut
3. URL : `https://prometheus-prod-XX-XXX.grafana.net/api/prom`
4. Utilisez cette datasource pour les queries de métriques

---

## 3. Création du Dashboard Frontend (Faro)

### 3.1. Créer un nouveau Dashboard

1. Menu **Dashboards** → **New** → **New Dashboard**
2. Cliquez **"Add visualization"**
3. Sélectionnez datasource : **Grafana Cloud Logs** (Faro utilise Loki en backend)
4. Nommez le dashboard : **"Frontend Performance - mds-devops-portfolio"**

### 3.2. Panel 1 : Core Web Vitals - LCP

**Configuration** :

1. Cliquez **"Add panel"** → **"Time series"**
2. Panel title : `LCP - Largest Contentful Paint`

**Query** :

```logql
# Query pour Loki (Faro logs)
{app="mds-devops-portfolio", kind="measurement", type="web-vitals"} 
  | json 
  | name="LCP" 
  | unwrap value 
  | __error__=""
```

**Transformations** :

- **Calculation** : Mean
- **Group by** : Time interval (auto)

**Panel options** :

- **Unit** : milliseconds (ms)
- **Min** : 0
- **Max** : Auto

**Thresholds** :

```yaml
Base: Green
Steps:
  - Value: 2500 (2.5s) - Orange
  - Value: 4000 (4s)   - Red
```

**Standard options** :

- **Display name** : LCP
- **Color scheme** : From thresholds

### 3.3. Panel 2 : FID (First Input Delay)

**Configuration similaire** :

```logql
{app="mds-devops-portfolio", kind="measurement", type="web-vitals"} 
  | json 
  | name="FID" 
  | unwrap value
```

**Thresholds** :

```yaml
Base: Green
Steps:
  - Value: 100  - Orange (100ms)
  - Value: 300  - Red (300ms)
```

### 3.4. Panel 3 : CLS (Cumulative Layout Shift)

```logql
{app="mds-devops-portfolio", kind="measurement", type="web-vitals"} 
  | json 
  | name="CLS" 
  | unwrap value
```

**Thresholds** :

```yaml
Base: Green
Steps:
  - Value: 0.1  - Orange
  - Value: 0.25 - Red
```

**Unit** : None (score sans unité)

### 3.5. Panel 4 : Erreurs JavaScript

**Type de panel** : **Stat**

```logql
# Compte les exceptions
sum(count_over_time({app="mds-devops-portfolio", kind="exception"}[5m]))
```

**Options** :

- **Graph mode** : Area
- **Color mode** : Value
- **Text mode** : Value and name
- **Unit** : Errors

**Thresholds** :

```yaml
Base: Green
Steps:
  - Value: 1   - Orange
  - Value: 10  - Red
```

### 3.6. Panel 5 : Sessions actives

**Type** : **Stat** avec sparkline

```logql
# Sessions uniques
count(count_over_time({app="mds-devops-portfolio", kind="session"}[5m]) > 0)
```

**Options** :

- **Graph mode** : Area
- **Orientation** : Horizontal
- **Text mode** : Value
- **Unit** : Sessions

### 3.7. Panel 6 : Pages vues par URL

**Type** : **Bar chart**

```logql
sum by (view_name) (count_over_time({app="mds-devops-portfolio", kind="view"}[1h]))
```

**Options** :

- **Orientation** : Horizontal
- **Show values** : Always
- **Group by** : view_name
- **Sort** : Descending

### 3.8. Panel 7 : Performance par page

**Type** : **Table**

```logql
{app="mds-devops-portfolio", kind="measurement", type="web-vitals"} 
  | json 
  | line_format "{{.view_name}} | {{.name}} | {{.value}}"
```

**Transformations** :

1. **Extract fields** : 
   - Source : labels
   - Fields : view_name, name, value
2. **Group by** : view_name
3. **Calculate** : Mean (value)

**Colonnes** :

- Page
- LCP (ms)
- FID (ms)
- CLS (score)

### 3.9. Panel 8 : Browser Distribution

**Type** : **Pie chart**

```logql
sum by (browser_name) (count_over_time({app="mds-devops-portfolio", kind="session"}[24h]))
```

**Options** :

- **Legend** : Right side
- **Display labels** : Name and percent
- **Pie type** : Donut

### 3.10. Organiser le Dashboard

**Layout suggéré** (utiliser drag & drop) :

```
Row 1 - Core Web Vitals (height: 200px)
├── LCP Gauge (width: 33%)
├── FID Gauge (width: 33%)
└── CLS Gauge (width: 33%)

Row 2 - Erreurs & Sessions (height: 150px)
├── Erreurs JS (width: 50%)
└── Sessions actives (width: 50%)

Row 3 - Performance détaillée (height: 300px)
├── Performance par page - Table (width: 60%)
└── Browser Distribution - Pie (width: 40%)

Row 4 - Pages vues (height: 250px)
└── Pages vues par URL - Bar chart (width: 100%)
```

**Sauvegarder** :

1. Cliquez l'icône **💾 Save** en haut à droite
2. **Title** : `Frontend Performance - mds-devops-portfolio`
3. **Folder** : New folder → `MDS DevOps Portfolio`
4. **Save**

---

## 4. Création du Dashboard Backend (OpenTelemetry/Tempo)

### 4.1. Créer le Dashboard

1. **Dashboards** → **New** → **New Dashboard**
2. Title : **"Backend Traces - mds-devops-portfolio"**

### 4.2. Panel 1 : Request Rate

**Type** : **Time series**

**Datasource** : **Tempo** (avec metrics generator enabled)

```promql
# Si Tempo metrics generator est activé
rate(traces_spanmetrics_calls_total{service="mds-devops-portfolio"}[5m])
```

**Alternative avec TraceQL** :

```traceql
# Count spans over time
{ resource.service.name="mds-devops-portfolio" } | rate() by (span.name)
```

**Options** :

- **Unit** : requests/sec (reqps)
- **Draw style** : Lines
- **Fill opacity** : 10
- **Stack series** : Normal

### 4.3. Panel 2 : P95/P99 Latency

**Type** : **Time series**

```promql
# P95
histogram_quantile(0.95, 
  sum(rate(traces_spanmetrics_latency_bucket{service="mds-devops-portfolio"}[5m])) by (le)
)

# P99
histogram_quantile(0.99, 
  sum(rate(traces_spanmetrics_latency_bucket{service="mds-devops-portfolio"}[5m])) by (le)
)
```

**Options** :

- **Unit** : milliseconds (ms)
- **Legend** : {{__name__}} - P95 / P99
- **Thresholds** :
  - Green : < 500ms
  - Orange : 500-1000ms
  - Red : > 1000ms

### 4.4. Panel 3 : Error Rate

**Type** : **Stat** avec graph

```promql
sum(rate(traces_spanmetrics_calls_total{service="mds-devops-portfolio", status_code="STATUS_CODE_ERROR"}[5m])) 
/ 
sum(rate(traces_spanmetrics_calls_total{service="mds-devops-portfolio"}[5m])) * 100
```

**Options** :

- **Unit** : Percent (0-100)
- **Decimals** : 2
- **Thresholds** :
  - Green : < 1%
  - Orange : 1-5%
  - Red : > 5%

### 4.5. Panel 4 : Service Map (Node Graph)

**Type** : **Node graph**

**Datasource** : **Tempo**

```traceql
# Récupère le service graph
{ resource.service.name="mds-devops-portfolio" }
```

**Options** :

- **Arc** : Detail: Server
- **Show** : Service dependencies
- **Layout** : Force-directed

### 4.6. Panel 5 : Recent Traces (Table)

**Type** : **Table**

```traceql
# 50 dernières traces
{ resource.service.name="mds-devops-portfolio" } 
| limit = 50
```

**Columns** :

- Trace ID
- Duration
- Spans
- Root service
- Root operation
- Start time

**Options** :

- **Column width** : Auto
- **Cell display mode** : Color text
- **Pagination** : Enable (20 per page)

### 4.7. Panel 6 : Slow Traces (> 1s)

**Type** : **Table**

```traceql
{ 
  resource.service.name="mds-devops-portfolio" 
  && duration > 1s 
}
| limit = 20
```

**Transform** :

- **Sort by** : Duration (descending)

### 4.8. Panel 7 : Operations Breakdown

**Type** : **Bar gauge**

```promql
topk(10, sum by (span_name) (rate(traces_spanmetrics_calls_total{service="mds-devops-portfolio"}[5m])))
```

**Options** :

- **Orientation** : Horizontal
- **Display mode** : Gradient
- **Show** : Calculate (sum)

### 4.9. Sauvegarder

**Save** → Folder : `MDS DevOps Portfolio` → **Save**

---

## 5. Dashboard Unifié - Vue d'ensemble

Créer un dashboard combinant frontend et backend.

### 5.1. Structure

```
Dashboard: "Overview - mds-devops-portfolio"

Row 1 - Real User Monitoring (Faro)
├── Core Web Vitals Summary (3 Gauges)

Row 2 - Application Health
├── Active Sessions (Stat)
├── Error Rate Frontend (Stat)
├── Error Rate Backend (Stat)
├── P95 Latency Backend (Stat)

Row 3 - Performance Trends
├── Frontend Page Load Time (Time series - 50%)
├── Backend Request Duration (Time series - 50%)

Row 4 - Error Tracking
├── JavaScript Exceptions (Time series - 50%)
├── Backend Error Traces (Table - 50%)

Row 5 - User Behavior
├── Pages vues (Bar chart - 60%)
├── Browser/Device (Pie chart - 40%)
```

### 5.2. Variables de Dashboard

Ajouter des **variables** pour filtrer :

1. Cliquez ⚙️ **Dashboard settings** → **Variables** → **New variable**

**Variable 1 : Environment**

```yaml
Name: environment
Type: Custom
Values: development,production
Current: production
Multi-value: No
Include All: Yes
```

**Variable 2 : Time Window**

```yaml
Name: time_window
Type: Interval
Values: 5m,15m,30m,1h,6h,24h
Current: 5m
```

**Utilisation dans les queries** :

```logql
{app="mds-devops-portfolio", env="$environment"} [${time_window}]
```

### 5.3. Annotations

Ajouter des **annotations** pour marquer les déploiements :

1. **Dashboard settings** → **Annotations** → **New annotation**

```yaml
Name: Deployments
Data source: Grafana Cloud Logs
Query: {job="deployments", app="mds-devops-portfolio"} | json | line_format "{{.version}}"
Tags: deployment, release
Color: Blue
```

---

## 6. Configuration des Alertes

### 6.1. Accéder aux Alertes

1. Menu **Alerting** → **Alert rules** → **New alert rule**

### 6.2. Alerte 1 : CLS Dégradé

**Step 1 : Set alert rule name**

```yaml
Rule name: CLS élevé - mds-devops-portfolio
Folder: MDS DevOps Portfolio
Group: Frontend Performance
```

**Step 2 : Define query**

**Query A** (Faro - Loki):

```logql
avg(
  avg_over_time({app="mds-devops-portfolio", kind="measurement", type="web-vitals"} 
    | json 
    | name="CLS" 
    | unwrap value [5m])
)
```

**Expression B** (Threshold):

```
WHEN last() OF A IS ABOVE 0.1
```

**Step 3 : Set evaluation behavior**

```yaml
Evaluate every: 1m
Pending for: 5m
```

**Step 4 : Configure labels and notifications**

**Labels** :

```yaml
severity: warning
component: frontend
metric: cls
```

**Contact point** : Default (email)

**Message** :

```
⚠️ CLS élevé détecté sur mds-devops-portfolio

Valeur actuelle: {{ $values.A }}
Seuil: 0.1

Dashboard: [Voir →](https://dteeech.grafana.net/d/frontend-perf)
```

**Step 5 : Save**

### 6.3. Alerte 2 : Erreurs JavaScript Élevées

**Query A** :

```logql
sum(rate({app="mds-devops-portfolio", kind="exception"}[5m]))
```

**Expression B** :

```
WHEN last() OF A IS ABOVE 10
```

**Evaluation** :

```yaml
Evaluate every: 1m
Pending for: 2m
```

**Labels** :

```yaml
severity: critical
component: frontend
metric: errors
```

### 6.4. Alerte 3 : Latence Backend Élevée

**Query A** (Tempo metrics):

```promql
histogram_quantile(0.95, 
  sum(rate(traces_spanmetrics_latency_bucket{service="mds-devops-portfolio"}[5m])) by (le)
)
```

**Expression B** :

```
WHEN last() OF A IS ABOVE 1000
```

**Evaluation** :

```yaml
Evaluate every: 1m
Pending for: 5m
```

**Labels** :

```yaml
severity: warning
component: backend
metric: latency_p95
```

### 6.5. Contact Points

**Configuration email** :

1. **Alerting** → **Contact points** → **New contact point**

```yaml
Name: DevOps Team
Integration: Email
Addresses: votre-email@domain.com

Optional settings:
- Subject: [Grafana Alert] {{ .GroupLabels.severity | toUpper }} - {{ .CommonLabels.alertname }}
- Message: 
  {{ range .Alerts }}
    Status: {{ .Status }}
    Summary: {{ .Annotations.summary }}
    Description: {{ .Annotations.description }}
    Labels: {{ .Labels }}
  {{ end }}
```

**Tester** :

1. Cliquez **"Test"**
2. Vérifiez la réception de l'email

### 6.6. Notification Policies

1. **Alerting** → **Notification policies** → **Edit**

**Structure** :

```yaml
Default policy:
  Receiver: DevOps Team
  Group by: alertname, component
  Group wait: 30s
  Group interval: 5m
  Repeat interval: 4h

Nested policies:
  - Match: severity = critical
    Receiver: DevOps Team
    Repeat interval: 1h
    
  - Match: component = frontend
    Receiver: Frontend Team
    Group by: metric
```

---

## 7. Variables de Dashboard

### 7.1. Variable Custom - Environment

**Utilité** : Filtrer par environnement

```yaml
Name: env
Type: Custom
Label: Environment
Values: development,staging,production
Default: production
Multi-value: Yes
Include All: Yes
```

**Usage dans les queries** :

```logql
{app="mds-devops-portfolio", env=~"$env"}
```

### 7.2. Variable Query - Pages

**Utilité** : Filtrer par page

```yaml
Name: page
Type: Query
Label: Page
Data source: Grafana Cloud Logs
Query: 
  label_values({app="mds-devops-portfolio", kind="view"}, view_name)
Refresh: On dashboard load
Multi-value: Yes
Include All: Yes
```

**Usage** :

```logql
{app="mds-devops-portfolio", view_name=~"$page"}
```

### 7.3. Variable Interval

**Utilité** : Ajuster la fenêtre de temps

```yaml
Name: interval
Type: Interval
Values: 1m,5m,10m,30m,1h
Auto: Yes (auto-adjust based on time range)
```

**Usage** :

```logql
rate({app="mds-devops-portfolio"}[$interval])
```

---

## 8. Import/Export de Dashboards

### 8.1. Exporter un Dashboard

1. Ouvrez le dashboard
2. Cliquez ⚙️ → **JSON model**
3. **Copy to clipboard** ou **Save to file**
4. Sauvegardez dans votre repo : `grafana/dashboards/frontend-performance.json`

### 8.2. Importer un Dashboard

1. **Dashboards** → **New** → **Import**
2. **Upload JSON file** ou collez le JSON
3. Sélectionnez le **folder** de destination
4. **Import**

### 8.3. Modèle de Dashboard JSON

Créez `grafana/dashboards/overview-dashboard.json` :

```json
{
  "dashboard": {
    "title": "Overview - mds-devops-portfolio",
    "tags": ["frontend", "backend", "rum", "opentelemetry"],
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "type": "gauge",
        "title": "LCP - Largest Contentful Paint",
        "targets": [
          {
            "expr": "{app=\"mds-devops-portfolio\", kind=\"measurement\", type=\"web-vitals\"} | json | name=\"LCP\" | unwrap value",
            "refId": "A"
          }
        ],
        "fieldConfig": {
          "defaults": {
            "unit": "ms",
            "thresholds": {
              "steps": [
                { "value": 0, "color": "green" },
                { "value": 2500, "color": "orange" },
                { "value": 4000, "color": "red" }
              ]
            }
          }
        }
      }
    ]
  }
}
```

### 8.4. Versionner vos Dashboards

**Structure recommandée** :

```
grafana/
├── dashboards/
│   ├── frontend-performance.json
│   ├── backend-traces.json
│   ├── overview.json
│   └── README.md
├── alerts/
│   ├── frontend-alerts.yaml
│   ├── backend-alerts.yaml
│   └── README.md
└── provisioning/
    └── datasources.yaml
```

**Commit dans git** :

```bash
git add grafana/
git commit -m "feat: add Grafana dashboards and alerts"
git push origin main
```

---

## 9. Best Practices

### 9.1. Organisation des Dashboards

**Structure de dossiers** :

```
Grafana Cloud
└── Dashboards
    └── MDS DevOps Portfolio/
        ├── 📊 Overview (start here)
        ├── 🎨 Frontend Performance
        ├── ⚡ Backend Traces
        ├── 🚨 Errors & Exceptions
        └── 👥 User Analytics
```

### 9.2. Naming Conventions

**Dashboards** :

```
Pattern: [Emoji] [Scope] - [App Name]
Examples:
- 📊 Overview - mds-devops-portfolio
- 🎨 Frontend Performance - mds-devops-portfolio
- ⚡ Backend Traces - mds-devops-portfolio
```

**Panels** :

```
Pattern: [Metric] - [Context]
Examples:
- LCP - 95th percentile
- Error Rate - Last 5 minutes
- Active Sessions - Real-time
```

**Variables** :

```
Pattern: lowercase_with_underscores
Examples:
- environment
- time_window
- page_name
```

### 9.3. Performance des Queries

**❌ Éviter** :

```logql
# Trop large - scanne tous les logs
{app="mds-devops-portfolio"}
```

**✅ Recommandé** :

```logql
# Filtres spécifiques - plus rapide
{app="mds-devops-portfolio", kind="measurement", type="web-vitals"}
  | name="LCP"
```

**Optimisations** :

1. **Utilisez des filtres** : Toujours ajouter `kind=`, `type=`, etc.
2. **Limitez le range** : `[5m]` au lieu de `[24h]` si possible
3. **Aggregez tôt** : `sum by (label)` plutôt que `sum` global
4. **Cache les queries** : Dashboard settings → **Cache timeout** : 1m

### 9.4. Thresholds Standards

**Core Web Vitals (Google recommendations)** :

```yaml
LCP:
  Good: < 2500ms
  Needs Improvement: 2500-4000ms
  Poor: > 4000ms

FID:
  Good: < 100ms
  Needs Improvement: 100-300ms
  Poor: > 300ms

CLS:
  Good: < 0.1
  Needs Improvement: 0.1-0.25
  Poor: > 0.25
```

**Latency Backend** :

```yaml
P95:
  Excellent: < 200ms
  Good: 200-500ms
  Acceptable: 500-1000ms
  Poor: > 1000ms
```

**Error Rate** :

```yaml
Error Rate:
  Excellent: < 0.1%
  Good: 0.1-1%
  Warning: 1-5%
  Critical: > 5%
```

### 9.5. Refresh Rates

**Dashboard settings** :

```yaml
Development:
  Auto-refresh: 10s
  Time range: Last 15 minutes

Production:
  Auto-refresh: 1m
  Time range: Last 1 hour

Historical analysis:
  Auto-refresh: Off
  Time range: Custom
```

### 9.6. Permissions

1. **Dashboard settings** → **Permissions**

**Recommandations** :

```yaml
Viewers:
  - Team members (View only)
  - Stakeholders (View only)

Editors:
  - DevOps team (Edit)
  - SRE team (Edit)

Admins:
  - Tech leads (Admin)
```

---

## 10. Troubleshooting

### 10.1. Pas de données dans Faro

**Symptômes** :

- Dashboard Frontend vide
- Aucune session visible

**Solutions** :

1. **Vérifier la console navigateur** :

```javascript
// Devrait voir :
✅ Grafana Faro initialisé avec succès
✅ Core Web Vitals tracking activé
```

2. **Vérifier .env.local** :

```bash
echo $NEXT_PUBLIC_FARO_URL
# Doit retourner l'URL complète (pas YOUR_INSTANCE_ID)
```

3. **Tester manuellement** :

```bash
# Depuis votre app
curl -X POST "$NEXT_PUBLIC_FARO_URL" \
  -H "Content-Type: application/json" \
  -d '{"test": "connection"}'
```

4. **Vérifier les logs Faro** :

- Grafana Cloud → **Explore** → **Loki**
- Query : `{app="mds-devops-portfolio"}`
- Si vide après 2 minutes : problème de credentials

### 10.2. Pas de traces dans Tempo

**Symptômes** :

- Dashboard Backend vide
- Pas de traces dans Explore

**Solutions** :

1. **Vérifier les logs serveur** :

```bash
npm run dev
# Devrait voir :
✅ OpenTelemetry SDK initialisé avec succès
   Service: mds-devops-portfolio
   Endpoint: https://otlp-gateway-prod-eu-west-2.grafana.net/otlp
```

2. **Vérifier Base64 encoding** :

```bash
# Décoder pour vérifier
echo "VOTRE_BASE64" | base64 -d
# Devrait retourner : INSTANCE_ID:TOKEN
```

3. **Tester la connexion OTLP** :

```bash
curl -X POST "https://otlp-gateway-prod-eu-west-2.grafana.net/otlp/v1/traces" \
  -H "Authorization: Basic VOTRE_BASE64" \
  -H "Content-Type: application/json" \
  -d '{"test": "connection"}'

# Succès = 200/202
# Erreur 401 = Mauvais credentials
```

4. **Vérifier instrumentation.js** :

```javascript
// Devrait être chargé au démarrage
console.log('instrumentation.js loaded');
```

### 10.3. Queries trop lentes

**Symptômes** :

- Panels qui timeout
- Dashboard qui charge > 10 secondes

**Solutions** :

1. **Réduire le time range** :

```
Au lieu de: Last 24 hours
Utilisez: Last 1 hour
```

2. **Optimiser les queries** :

```logql
# ❌ Lent
{app="mds-devops-portfolio"} | json

# ✅ Rapide
{app="mds-devops-portfolio", kind="measurement"} | json | name="LCP"
```

3. **Activer le cache** :

- Dashboard settings → **General**
- **Cache timeout** : `60` (secondes)

4. **Utiliser Streaming** :

- Panel options → **Query options**
- **Enable streaming** : Yes

### 10.4. Alertes qui ne se déclenchent pas

**Symptômes** :

- Condition remplie mais pas de notification

**Solutions** :

1. **Vérifier l'état de l'alerte** :

- **Alerting** → **Alert rules**
- Status : Normal / Pending / Firing

2. **Vérifier Contact Points** :

- **Alerting** → **Contact points** → **Test**
- Confirmez la réception

3. **Vérifier Notification Policies** :

- **Alerting** → **Notification policies**
- Assurez-vous que les labels matchent

4. **Vérifier les silences** :

- **Alerting** → **Silences**
- Supprimez les silences actifs si présents

### 10.5. Panels avec "No data"

**Solutions** :

1. **Vérifier la datasource** :

- Panel edit → **Query** → Datasource dropdown
- Testez avec **Run query**

2. **Vérifier les labels** :

```logql
# Lister toutes les apps disponibles
{} | json | __name__="app" | distinct
```

3. **Élargir le time range** :

- De `Last 5 minutes` à `Last 24 hours`

4. **Vérifier les filtres** :

- Dashboard variables : `$env`, `$page`
- Temporarily select **All**

---

## 📚 Ressources Supplémentaires

### Documentation Officielle

- [Grafana Dashboards Guide](https://grafana.com/docs/grafana/latest/dashboards/)
- [Panel Visualizations](https://grafana.com/docs/grafana/latest/panels-visualizations/)
- [Grafana Faro Web SDK](https://grafana.com/docs/grafana-cloud/monitor-applications/frontend-observability/faro-web-sdk/)
- [OpenTelemetry with Grafana](https://grafana.com/docs/grafana-cloud/monitor-applications/application-observability/)
- [Grafana Alerting](https://grafana.com/docs/grafana/latest/alerting/)
- [LogQL Language](https://grafana.com/docs/loki/latest/query/)
- [PromQL Language](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [TraceQL Language](https://grafana.com/docs/tempo/latest/traceql/)

### Templates de Dashboards

- [Grafana Dashboard Repository](https://grafana.com/grafana/dashboards/)
- Search: "Next.js", "React", "Frontend RUM", "OpenTelemetry"

### Tutoriels Vidéo

- [Building Advanced Grafana Dashboards](https://grafana.com/go/webinar/building-advanced-grafana-dashboards/)
- [Getting Started with LGTM Stack](https://grafana.com/go/webinar/getting-started-with-grafana-lgtm-stack/)

---

## ✅ Checklist Finale

### Configuration initiale

- [ ] Compte Grafana Cloud créé et accessible sur dteeech.grafana.net
- [ ] Application Faro créée dans Frontend Observability
- [ ] Token OTLP généré et encodé en Base64
- [ ] Variables d'environnement configurées dans .env.local
- [ ] Application démarrée sans erreurs

### Datasources

- [ ] Grafana Cloud Logs (Faro) fonctionnel
- [ ] Tempo (OTLP) fonctionnel
- [ ] Données visibles dans Explore

### Dashboards

- [ ] Dashboard "Frontend Performance" créé avec 8+ panels
- [ ] Dashboard "Backend Traces" créé avec 7+ panels
- [ ] Dashboard "Overview" créé combinant frontend + backend
- [ ] Variables ajoutées (environment, page, interval)
- [ ] Dashboards sauvegardés dans le folder "MDS DevOps Portfolio"

### Alertes

- [ ] Alerte "CLS élevé" configurée
- [ ] Alerte "Erreurs JavaScript" configurée
- [ ] Alerte "Latence backend" configurée
- [ ] Contact Point email configuré et testé
- [ ] Notification Policies configurées

### Best Practices

- [ ] Dashboards versionés dans Git (grafana/dashboards/)
- [ ] Thresholds configurés selon standards Google
- [ ] Queries optimisées avec filtres spécifiques
- [ ] Cache activé sur les dashboards
- [ ] Permissions configurées par équipe

### Production

- [ ] Variables d'environnement ajoutées à docker-compose.yml
- [ ] Dashboard testé avec données de production
- [ ] Alertes testées et validées
- [ ] Documentation partagée avec l'équipe

---

**🎉 Félicitations !** Votre monitoring Grafana Cloud est maintenant opérationnel. Consultez régulièrement vos dashboards pour optimiser les performances de votre application.

**Support** : En cas de problème, référez-vous à la section [Troubleshooting](#10-troubleshooting) ou consultez la [documentation Grafana](https://grafana.com/docs/).
