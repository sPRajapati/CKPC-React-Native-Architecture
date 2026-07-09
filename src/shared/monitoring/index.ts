// Vendor-agnostic analytics + crash reporting seam. Swap `consoleMonitor` for a
// Sentry/Firebase-backed implementation via `setMonitor` — call sites don't change.
export interface Monitor {
  logEvent(name: string, props?: Record<string, unknown>): void;
  captureError(error: unknown, context?: Record<string, unknown>): void;
  setUser(user: { id: string; email?: string } | null): void;
}

const consoleMonitor: Monitor = {
  logEvent: (name, props) => {
    if (__DEV__) console.log('[event]', name, props ?? {});
  },
  captureError: (error, context) => {
    console.error('[error]', error, context ?? {});
  },
  setUser: (user) => {
    if (__DEV__) console.log('[user]', user?.id ?? 'anonymous');
  },
};

let current: Monitor = consoleMonitor;

export const setMonitor = (monitor: Monitor) => {
  current = monitor;
};

export const monitoring: Monitor = {
  logEvent: (name, props) => current.logEvent(name, props),
  captureError: (error, context) => current.captureError(error, context),
  setUser: (user) => current.setUser(user),
};
