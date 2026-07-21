# storage

`secureStorage` (Keychain/Keystore via expo-secure-store) for tokens,
`asyncStorage` for user/prefs, and `storageUtils` as the single keyed API. Keys
live in `storageKeys.ts`.

Do not move access, ID, or refresh tokens into AsyncStorage, logs, analytics, or
plain Redux persistence. SecureStore is the token source used by the API layer.
