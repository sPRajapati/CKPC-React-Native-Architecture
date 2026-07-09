import { useAppSelector } from '@/store/hooks';

export const useProfile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { bio, stats } = useAppSelector((state) => state.profile);
  return { user, bio, stats };
};
