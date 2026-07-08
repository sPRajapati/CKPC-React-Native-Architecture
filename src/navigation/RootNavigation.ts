import { createNavigationContainerRef } from '@react-navigation/native';

// Allows non-component code (e.g. the axios 401 handler) to navigate.
export const navigationRef = createNavigationContainerRef();
