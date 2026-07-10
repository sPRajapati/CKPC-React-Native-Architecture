import settingsReducer, {
  setNotifications,
  toggleNotifications,
} from '../settings.slice';

describe('settings slice', () => {
  it('defaults notifications to enabled', () => {
    expect(settingsReducer(undefined, { type: 'init' }).notificationsEnabled).toBe(true);
  });

  it('toggles notifications', () => {
    const state = settingsReducer(undefined, toggleNotifications());
    expect(state.notificationsEnabled).toBe(false);
  });

  it('sets notifications explicitly', () => {
    const state = settingsReducer(undefined, setNotifications(false));
    expect(state.notificationsEnabled).toBe(false);
  });
});
