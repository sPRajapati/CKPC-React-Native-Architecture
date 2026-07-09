import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  notificationsEnabled: boolean;
}

const initialState: SettingsState = { notificationsEnabled: true };

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
  },
});

export const { toggleNotifications, setNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
