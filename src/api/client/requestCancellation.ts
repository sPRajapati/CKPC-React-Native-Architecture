const controllers = new Set<AbortController>();

export const registerAbortController = (controller: AbortController): void => {
  controllers.add(controller);
  controller.signal.addEventListener('abort', () => controllers.delete(controller));
};

export const unregisterAbortController = (controller: AbortController): void => {
  controllers.delete(controller);
};

export const createAbortController = (): AbortController => {
  const controller = new AbortController();
  registerAbortController(controller);
  return controller;
};

export const cancelActiveApiRequests = (): void => {
  for (const controller of controllers) {
    controller.abort();
  }
  controllers.clear();
};
