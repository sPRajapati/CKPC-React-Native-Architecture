# api

Transport layer. Feature services enter through `apiRequest()` in `request.ts`.
`axios.ts` is the bare instance; `interceptors.ts` attaches the token and handles
401 (via the logout coordinator) at startup; `endpoints.ts` holds URLs;
`queryClient.ts` is the React Query client; `devMock.ts` serves canned responses
in `__DEV__` so the app runs with no backend.
