// @testing-library/react-native v12+ includes its matchers automatically.
const testWindow = globalThis.window as
  | (Window & { dispatchEvent?: (event: Event) => boolean })
  | undefined;

if (testWindow && typeof testWindow.dispatchEvent !== 'function') {
  testWindow.dispatchEvent = jest.fn(() => true);
}

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(async () => null),
  setItemAsync: jest.fn(async () => undefined),
  deleteItemAsync: jest.fn(async () => undefined),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(async () => ({ isConnected: true })),
}));
