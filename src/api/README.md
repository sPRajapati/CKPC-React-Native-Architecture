# API Layer

This folder is the single mobile boundary for calls to API Gateway backed by
Lambda and downstream enterprise systems. It exists so features do not attach
tokens, retry requests, parse backend errors, or validate response payloads on
their own.

## Why This Layer Exists

The intended enterprise flow is:

1. The app signs in through Cognito federation with IBM ISAM/ISVA.
2. Cognito issues app tokens after enterprise identity, MFA, PKCE, and policy checks.
3. The app sends only the Cognito access token to API Gateway.
4. API Gateway validates the JWT and forwards authorized traffic to Lambda.
5. Lambda handles route authorization, audit fields, correlation IDs, timeouts,
   and the private Boomi integration.

The mobile app must never generate or sign JWTs and must not contain Cognito
client secrets, AWS secrets, Lambda credentials, Boomi credentials, internal
Boomi URLs, or private network details.

## Structure

- `axios.ts` creates the single Axios instance.
- `request.ts` exposes `apiRequest()` for feature services.
- `interceptors.ts` installs request and response interceptors once at startup.
- `client/` contains auth header attachment, safe retry policy, and cancellation.
- `auth/` contains token reading and single-flight refresh coordination.
- `errors/` normalizes transport and backend failures into `ApiError`.
- `headers/` creates correlation, app version, and platform headers.
- `validation/` validates service-boundary responses with Zod.
- `queryClient.ts` configures React Query and clears user-specific cache on logout.
- `devMock.ts` keeps local development demoable without a backend.

## Request Flow

Feature code calls `apiRequest()` with optional metadata:

```ts
apiRequest<MyResponse>({
  method: 'GET',
  url: '/home/feed',
  metadata: {
    responseSchema: myResponseSchema,
    retryPolicy: { maxRetries: 2 },
  },
});
```

Protected requests read the access token from secure storage and attach:

- `Authorization: Bearer <access-token>`
- `Accept: application/json`
- `Content-Type: application/json`
- `X-Correlation-ID`
- `X-App-Version`
- `X-Platform`

Public requests must be explicit:

```ts
metadata: { requiresAuth: false }
```

Do not rely on URL substring checks to decide whether a request is public.

## Refresh Flow

When a protected request receives `401`, the response interceptor attempts one
refresh through the existing auth refresh service. Concurrent `401` responses
share the same refresh promise, then retry their original request once.

Refresh is skipped for login, signup, refresh, public requests, and requests with:

```ts
metadata: { skipAuthRefresh: true }
```

`403` is treated as authorization failure and does not trigger refresh.

## Validation

Use Zod schemas at the service boundary. Invalid backend payloads throw a
normalized `ApiError` with `VALIDATION_ERROR`, preventing bad data from entering
screen state or Redux.

The home feed is the first migrated example:

- `src/features/home/services/home.schemas.ts`
- `src/features/home/services/home.api.ts`
- `src/features/home/hooks/homeQueryKeys.ts`

## Logging

Development API logs include safe operational fields only: method, route,
status, duration, correlation ID, error code, and retry count.

Never log authorization headers, tokens, cookies, passwords, MFA values, SAML
assertions, or sensitive request/response bodies.

Local development logs are emitted only when `__DEV__` is true,
`EXPO_PUBLIC_APP_ENV=development`, and the process is not running Jest. You will
see API lifecycle events such as request, response, dev mock, retry, refresh,
validation, and normalized error logs in the Metro console.

## Backend Assumptions

The repo currently has demo auth endpoints and no concrete Cognito hosted UI,
OAuth code exchange, or ISAM/ISVA SDK wiring. The refresh coordinator therefore
reuses the existing `features/auth/refreshSession.ts` path instead of inventing
unsupported Cognito token endpoints.

Before production, confirm:

- Cognito hosted UI or enterprise SDK flow.
- PKCE redirect and logout URIs.
- Refresh token availability and rotation behavior.
- API Gateway authorizer issuer, audience/client ID, scopes, and token use.
- Backend response envelopes and route-level validation schemas.
