import { TextField } from '@/shared/components';
import type { ComponentProps } from 'react';

// Feature-level field; currently a thin pass-through over the shared TextField,
// kept here so auth-specific field behavior can grow without touching shared.
export const AuthField = (props: ComponentProps<typeof TextField>) => (
  <TextField autoCapitalize="none" {...props} />
);
