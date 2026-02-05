/**
 * Next.js Instrumentation Hook
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 * 
 * Ce fichier permet d'instrumenter Next.js avec OpenTelemetry pour capturer:
 * - Traces des Server Components
 * - Métriques de performance SSR
 * - Requêtes HTTP sortantes
 * - Durée de génération des pages
 */

export async function register() {
  // Désactiver en développement - monitoring uniquement en production
  if (process.env.NODE_ENV !== 'production') {
    console.log('ℹ️ OpenTelemetry désactivé en développement');
    return;
  }

  // Instrumentation côté serveur uniquement
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { NodeSDK } = await import('@opentelemetry/sdk-node');
    const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
    const { Resource } = await import('@opentelemetry/resources');
    const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } = await import('@opentelemetry/semantic-conventions');
    const { getNodeAutoInstrumentations } = await import('@opentelemetry/auto-instrumentations-node');

    const serviceName = process.env.OTEL_SERVICE_NAME || 'mds-devops-portfolio';
    const otlpEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
    const otlpHeaders = process.env.OTEL_EXPORTER_OTLP_HEADERS;

    console.log('🔍 Debug OpenTelemetry configuration:');
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`   Service Name: ${serviceName}`);
    console.log(`   OTLP Endpoint: ${otlpEndpoint}`);
    console.log(`   Headers configured: ${otlpHeaders ? 'Yes' : 'No'}`);

    console.log('🔍 Debug OpenTelemetry configuration:');
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`   Service Name: ${serviceName}`);
    console.log(`   OTLP Endpoint: ${otlpEndpoint}`);
    console.log(`   Headers configured: ${otlpHeaders ? 'Yes' : 'No'}`);

    // Vérifier que les variables d'environnement sont configurées
    if (!otlpEndpoint) {
      console.error('❌ OpenTelemetry non initialisé: OTEL_EXPORTER_OTLP_ENDPOINT manquant');
      return;
    }

    if (!otlpHeaders || otlpHeaders.includes('YOUR_BASE64')) {
      console.error('❌ OpenTelemetry non initialisé: OTEL_EXPORTER_OTLP_HEADERS manquant ou invalide');
      return;
    }

    try {
      // Configuration du resource (métadonnées du service)
      const resource = new Resource({
        [ATTR_SERVICE_NAME]: serviceName,
        [ATTR_SERVICE_VERSION]: '1.0.0',
        'deployment.environment': process.env.NODE_ENV || 'development',
      });

      // Configuration de l'exporteur OTLP vers Grafana Cloud
      const fullUrl = `${otlpEndpoint}/v1/traces`;
      console.log(`📡 Configuring OTLP exporter to: ${fullUrl}`);
      
      const traceExporter = new OTLPTraceExporter({
        url: fullUrl,
        headers: {
          // Le header doit être au format: Authorization: Basic <base64>
          // Si OTEL_EXPORTER_OTLP_HEADERS contient déjà "Authorization=Basic XXX", on l'extrait
          ...(otlpHeaders.startsWith('Authorization=') 
            ? { Authorization: otlpHeaders.replace('Authorization=', '') }
            : { Authorization: otlpHeaders }
          )
        },
      });

      // Initialisation du SDK OpenTelemetry
      const sdk = new NodeSDK({
        resource,
        traceExporter,
        instrumentations: [
          getNodeAutoInstrumentations({
            // Configuration des auto-instrumentations
            '@opentelemetry/instrumentation-http': {
              enabled: true,
              // Capturer les requêtes sortantes
              requestHook: (span, request) => {
                span.setAttribute('http.request.method', request.method);
              },
            },
            '@opentelemetry/instrumentation-fs': {
              enabled: false, // Désactiver fs pour réduire le bruit
            },
            '@opentelemetry/instrumentation-dns': {
              enabled: false, // Désactiver DNS pour réduire le bruit
            },
          }),
        ],
      });

      // Démarrage du SDK
      sdk.start();
      console.log('✅ OpenTelemetry SDK initialisé avec succès');
      console.log(`   Service: ${serviceName}`);
      console.log(`   Endpoint: ${fullUrl}`);
      console.log(`   Environment: ${process.env.NODE_ENV}`);
      console.log('');
      console.log('🔍 Pour vérifier les traces dans Grafana Cloud:');
      console.log(`   1. Allez sur https://dteeech.grafana.net`);
      console.log(`   2. Menu: Explore → Tempo`);
      console.log(`   3. Recherchez: {resource.service.name="${serviceName}"}`);
      console.log('');

      // Graceful shutdown
      process.on('SIGTERM', () => {
        sdk
          .shutdown()
          .then(() => console.log('✅ OpenTelemetry SDK arrêté proprement'))
          .catch((error) => console.error('❌ Erreur lors de l\'arrêt d\'OpenTelemetry:', error))
          .finally(() => process.exit(0));
      });
    } catch (error) {
      console.error('❌ Erreur lors de l\'initialisation d\'OpenTelemetry:', error);
    }
  }
}
