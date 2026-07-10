# analytics

Vendor-facing analytics adapters live here. App code should use `EventTracker`
or `shared/monitoring`; concrete Firebase/Mixpanel clients can be injected when
those SDKs are installed.
