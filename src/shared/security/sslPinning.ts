/**
 * SSL public-key pinning — DISABLED until you add pins.
 *
 * Right now `PINNED_HOSTS` is empty, so `setupSslPinning()` is a no-op and the
 * app runs normally without any native module. When you have your API's
 * certificate, enable it in three steps:
 *
 *   1. yarn add react-native-ssl-public-key-pinning
 *   2. add "react-native-ssl-public-key-pinning" to `plugins` in app.json
 *   3. npx expo prebuild && npx expo run:android   (native module — not Expo Go)
 *
 * Then fill PINNED_HOSTS below. Get the SPKI SHA-256 hash (base64) for a host —
 * always add a BACKUP pin (e.g. your next cert / intermediate CA) so a cert
 * rotation doesn't lock users out:
 *
 *   openssl s_client -servername api.yourdomain.com \
 *     -connect api.yourdomain.com:443 </dev/null 2>/dev/null \
 *     | openssl x509 -pubkey -noout \
 *     | openssl pkey -pubin -outform der \
 *     | openssl dgst -sha256 -binary | openssl enc -base64
 */

type PinConfig = Record<
  string,
  { includeSubdomains?: boolean; publicKeyHashes: string[] }
>;

// Empty = pinning off. Add your host + hashes here when you have the cert.
export const PINNED_HOSTS: PinConfig = {
  // 'api.yourdomain.com': {
  //   includeSubdomains: true,
  //   publicKeyHashes: [
  //     'PRIMARY_SPKI_SHA256_BASE64=',
  //     'BACKUP_SPKI_SHA256_BASE64=',
  //   ],
  // },
};

export const setupSslPinning = async (): Promise<void> => {
  if (Object.keys(PINNED_HOSTS).length === 0) {
    return; // not configured yet — no-op, app runs without the native module
  }

  try {
    // Lazy require so the bundle works without the library until you install it.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // @ts-ignore optional native module, present only once installed
    const { initializeSslPinning } = require('react-native-ssl-public-key-pinning');
    await initializeSslPinning(PINNED_HOSTS);
  } catch (error) {
    // Native module missing / unavailable (e.g. Expo Go) — fail open in dev.
    console.warn('SSL pinning not initialized:', error);
  }
};
