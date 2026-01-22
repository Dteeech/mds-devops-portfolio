'use client';

import { useEffect } from 'react';
import { getWebInstrumentations, initializeFaro } from '@grafana/faro-react';

let faro = null;

export function FaroProvider({ children }) {
  useEffect(() => {
    // Initialiser Faro uniquement côté client et une seule fois
    if (typeof window !== 'undefined' && !faro) {
      const faroUrl = process.env.NEXT_PUBLIC_FARO_URL;
      const faroAppName = process.env.NEXT_PUBLIC_FARO_APP_NAME;
      const faroEnv = process.env.NEXT_PUBLIC_FARO_ENV || 'development';

      // Ne pas initialiser si l'URL n'est pas configurée
      if (!faroUrl || faroUrl.includes('YOUR_INSTANCE_ID')) {
        console.warn('⚠️ Grafana Faro non initialisé: NEXT_PUBLIC_FARO_URL manquant ou invalide');
        return;
      }

      try {
        faro = initializeFaro({
          url: faroUrl,
          app: {
            name: faroAppName || 'mds-devops-portfolio',
            version: '1.0.0',
            environment: faroEnv,
          },
          instrumentations: [
            ...getWebInstrumentations({
              captureConsole: true,
              captureConsoleDisabledLevels: [], // Capturer tous les niveaux de console
            }),
          ],
          // Configuration des sessions
          sessionTracking: {
            enabled: true,
            persistent: true,
          },
          // Configuration du batching pour optimiser les requêtes réseau
          batching: {
            enabled: true,
            sendTimeout: 250, // Envoi toutes les 250ms
          },
          // Capturer les erreurs non gérées
          beforeSend: (item) => {
            // Vous pouvez filtrer ou enrichir les données ici
            return item;
          },
        });

        console.log('✅ Grafana Faro initialisé avec succès');

        // Capturer les Core Web Vitals (CLS, FID, LCP, FCP, TTFB)
        if ('PerformanceObserver' in window) {
          // Web Vitals sont automatiquement capturées par getWebInstrumentations
          console.log('✅ Core Web Vitals tracking activé');
        }
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de Grafana Faro:', error);
      }
    }
  }, []);

  return <>{children}</>;
}
