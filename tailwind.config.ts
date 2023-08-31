import type { Config } from 'tailwindcss';
import { z } from 'zod';

const themeSchema = z.union([
  z.literal('default'),
  z.literal('pink'),
  z.literal('blue'),
]);

const defaultTheme = {
  primary: '#383838',
  secondary: '#00ffff',
  accent: '#383838',
  background: '#ffffff',
  text: '#000000',
};

const pinkTheme = {
  primary: '#ff00ff',
  secondary: '#00ffff',
  accent: '#ff00ff',
  background: '#000000',
  text: '#ffffff',
};

const blueTheme = {
  primary: '#0000ff',
  secondary: '#00ffff',
  accent: '#0000ff',
  background: '#ffffff',
  text: '#000000',
};

const themes: Record<z.infer<typeof themeSchema>, any> = {
  default: defaultTheme,
  pink: pinkTheme,
  blue: blueTheme,
};

const parsedTheme = themeSchema.safeParse(process.env.THEME);

if (parsedTheme.success === false) {
  console.error(parsedTheme.error);
  process.exit(1);
}

const colors = themes[parsedTheme.data];

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};
export default config;
