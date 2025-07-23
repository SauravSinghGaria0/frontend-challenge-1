// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
    './.storybook/**/*.{ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
