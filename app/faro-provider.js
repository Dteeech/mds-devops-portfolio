'use client';

import PropTypes from 'prop-types';

/**
 * FaroProvider - Monitoring désactivé
 * Pour activer le monitoring Grafana Faro, configurez NEXT_PUBLIC_FARO_URL
 */
export function FaroProvider({ children }) {
  // Monitoring désactivé pour éviter les erreurs console
  // Pour réactiver, décommentez le code d'initialisation Faro
  return <>{children}</>;
}

FaroProvider.propTypes = {
  children: PropTypes.node.isRequired
};
