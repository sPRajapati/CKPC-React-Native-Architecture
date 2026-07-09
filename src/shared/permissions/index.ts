export type PermissionStatus = 'granted' | 'denied' | 'undetermined' | 'unavailable';

// Optional native modules — install to activate:
//   npx expo install expo-camera expo-location expo-notifications
// Non-literal specifier keeps them optional at build time.
const loadModule = async (name: string): Promise<Record<string, unknown> | null> => {
  try {
    return (await import(name)) as Record<string, unknown>;
  } catch {
    return null;
  }
};

const normalize = (status?: string): PermissionStatus => {
  if (status === 'granted') return 'granted';
  if (status === 'denied') return 'denied';
  return 'undetermined';
};

type Requester = () => Promise<{ status?: string }>;

export const requestCameraPermission = async (): Promise<PermissionStatus> => {
  const mod = await loadModule('expo-camera');
  const request = (mod?.requestCameraPermissionsAsync ??
    (mod?.Camera as { requestCameraPermissionsAsync?: Requester } | undefined)
      ?.requestCameraPermissionsAsync) as Requester | undefined;
  if (!request) return 'unavailable';
  return normalize((await request()).status);
};

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
  const mod = await loadModule('expo-location');
  const request = mod?.requestForegroundPermissionsAsync as Requester | undefined;
  if (!request) return 'unavailable';
  return normalize((await request()).status);
};

export const requestNotificationPermission = async (): Promise<PermissionStatus> => {
  const mod = await loadModule('expo-notifications');
  const request = mod?.requestPermissionsAsync as Requester | undefined;
  if (!request) return 'unavailable';
  return normalize((await request()).status);
};
