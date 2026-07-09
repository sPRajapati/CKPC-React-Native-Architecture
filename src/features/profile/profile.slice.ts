import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProfileStat } from './profile.types';

interface ProfileState {
  bio: string;
  stats: ProfileStat[];
}

const initialState: ProfileState = {
  bio: 'Building with a feature-sliced architecture.',
  stats: [
    { label: 'Posts', value: 24 },
    { label: 'Followers', value: 120 },
    { label: 'Following', value: 80 },
  ],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
  },
});

export const { setBio } = profileSlice.actions;
export default profileSlice.reducer;
