import {
  createNavigationContainerRef,
  type ParamListBase,
} from '@react-navigation/native';

// Typed with ParamListBase so non-component code (e.g. the axios 401 handler)
// can read getCurrentRoute().name and call reset() with route names.
export const navigationRef = createNavigationContainerRef<ParamListBase>();
