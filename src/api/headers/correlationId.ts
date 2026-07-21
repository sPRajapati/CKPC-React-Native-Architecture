const uuidFallback = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = Math.trunc(Math.random() * 16);
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });

export const createCorrelationId = (): string => {
  const randomUUID = globalThis.crypto?.randomUUID;
  return randomUUID ? randomUUID.call(globalThis.crypto) : uuidFallback();
};
