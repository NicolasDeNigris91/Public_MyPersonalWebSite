type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
};

declare global {
  interface Window {
    plausible?: (event: string, options?: PlausibleOptions) => void;
  }
}

/**
 * Fire a Plausible custom event. No-op when Plausible is not configured
 * (NEXT_PUBLIC_PLAUSIBLE_DOMAIN unset) or the user has Do Not Track enabled.
 */
export function track(
  event: string,
  props?: Record<string, string | number | boolean>,
) {
  if (typeof window === 'undefined') return;
  if (typeof window.plausible !== 'function') return;
  try {
    window.plausible(event, props ? { props } : undefined);
  } catch {
    // never let analytics throw into product paths
  }
}
