import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier'; // 1. Import it

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    // Note: in Flat Config, you usually don't need 'extends' inside the object like this,
    // but if your setup requires it, keep it.
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },

  js.configs.recommended, // Recommended JS rules
  eslintConfigPrettier, // 2. Add this LAST to turn off styling conflicts
]);
