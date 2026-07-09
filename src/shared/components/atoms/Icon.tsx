import type { LucideIcon } from 'lucide-react-native';
import { colors } from '@/shared/constants';

interface IconProps {
  icon: LucideIcon;
  size?: number;
  color?: string;
}

// Atom: thin wrapper over a lucide icon so callers pass a glyph, size, color.
export const Icon = ({ icon: Glyph, size = 24, color }: IconProps) => (
  <Glyph size={size} color={color ?? colors.text} />
);
