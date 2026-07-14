import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { logoutAsync } from '@/features/auth';
import { useAppDispatch } from '@/store/hooks';
import { useHomeData } from './useHomeData';

export const useHomeViewModel = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { data, isLoading, refetch, isRefetching } = useHomeData();

  const logout = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  return {
    t,
    data,
    isLoading,
    isRefetching,
    refetch,
    logout,
  };
};
