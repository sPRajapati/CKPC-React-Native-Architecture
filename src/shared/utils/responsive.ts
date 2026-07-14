import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 375;
const TABLET_MAX_SCALE = 1.35;
const PHONE_MIN_SCALE = 0.85;

const { width } = Dimensions.get('window');

const scale = Math.min(
  TABLET_MAX_SCALE,
  Math.max(PHONE_MIN_SCALE, width / BASE_WIDTH),
);

export const rpx = (value: number): number =>
  PixelRatio.roundToNearestPixel(value * scale);
