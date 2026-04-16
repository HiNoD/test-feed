export const IconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  xxl: 32,
} as const;

export type IconSizeType = typeof IconSize;

export const ComponentSize = {
  buttonHeight: 44,
  inputHeight: 44,
  tabBarHeight: 80,
  headerHeight: 56,
  avatarSm: 32,
  avatarMd: 48,
  avatarLg: 60,
  avatarXl: 80,
} as const;

export type ComponentSizeType = typeof ComponentSize;