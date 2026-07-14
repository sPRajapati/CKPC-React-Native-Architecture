import { useMemo } from 'react';

import { useProfile } from './useProfile';

export const useProfileViewModel = () => {
  const { user, bio, stats } = useProfile();
  const name = useMemo(
    () => (user ? `${user.firstName} ${user.lastName}` : 'Guest'),
    [user],
  );

  return {
    user,
    bio,
    stats,
    name,
  };
};
