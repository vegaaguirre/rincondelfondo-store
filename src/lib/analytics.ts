import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Inicializa Google Analytics. Debe llamarse una vez cuando la aplicación se carga.
 * Solo se activa en producción.
 */
export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("Google Analytics initialized");
  }
};

/**
 * Rastrea una vista de página.
 * @param path - La ruta de la página a rastrear (ej. /productos/rosas)
 */
export const trackPageView = (path: string) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

/**
 * Rastrea un evento personalizado.
 * @param category - La categoría del evento (ej. 'E-commerce')
 * @param action - La acción del evento (ej. 'Añadir al Carrito')
 * @param label - Una etiqueta opcional para el evento (ej. 'Ramo de Rosas')
 */
export const trackEvent = (category: string, action: string, label?: string) => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};