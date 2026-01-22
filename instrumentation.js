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

    // Vérifier que les variables d'environnement sont configurées
    if (!otlpEndpoint || !otlpHeaders || otlpHeaders.includes('YOUR_BASE64')) {
      console.warn('⚠️ OpenTelemetry non initialisé: Variables d\'environnement OTEL manquantes ou invalides');
      console.warn('   Vérifiez OTEL_EXPORTER_OTLP_ENDPOINT et OTEL_EXPORTER_OTLP_HEADERS dans .env.local');
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
      const traceExporter = new OTLPTraceExporter({
        url: `${otlpEndpoint}/v1/traces`,
        headers: {
          Authorization: otlpHeaders.replace('Authorization=', ''),
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
      console.log(`   Endpoint: ${otlpEndpoint}`);

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
