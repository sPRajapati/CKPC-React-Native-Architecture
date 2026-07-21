# store

Redux Toolkit store. Slices live in their features; this only wires them together
and exports typed `useAppDispatch` / `useAppSelector`.

Auth state currently keeps tokens for navigation compatibility, but production
auth state should be metadata-only: `isAuthenticated`, user profile, expiry, and
status. Raw Cognito tokens should live only in secure storage.
