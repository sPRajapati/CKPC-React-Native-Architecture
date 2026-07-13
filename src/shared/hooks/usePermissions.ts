import { useCallback, useState } from 'react';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestNotificationPermission,
  type PermissionStatus,
} from '@/shared/permissions';

export const usePermissions = () => {
  const [camera, setCamera] = useState<PermissionStatus>('undetermined');
  const [location, setLocation] = useState<PermissionStatus>('undetermined');
  const [notifications, setNotifications] =
    useState<PermissionStatus>('undetermined');

  const requestCamera = useCallback(async () => {
    const status = await requestCameraPermission();
    setCamera(status);
    return status;
  }, []);

  const requestLocation = useCallback(async () => {
    const status = await requestLocationPermission();
    setLocation(status);
    return status;
  }, []);

  const requestNotifications = useCallback(async () => {
    const status = await requestNotificationPermission();
    setNotifications(status);
    return status;
  }, []);

  return {
    camera,
    location,
    notifications,
    requestCamera,
    requestLocation,
    requestNotifications,
  };
};
