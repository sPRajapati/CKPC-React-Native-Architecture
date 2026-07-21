import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { createCorrelationId } from './correlationId';

export const createRequestHeaders = (
  correlationId = createCorrelationId(),
): Record<string, string> => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Correlation-ID': correlationId,
  'X-App-Version': Constants.expoConfig?.version ?? 'unknown',
  'X-Platform': Platform.OS,
});
