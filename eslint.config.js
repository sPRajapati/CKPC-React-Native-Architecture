// Flat config built on Expo's official ESLint config (bundles the RN + TS +
// react-hooks rules), with a filename-case rule layered on top.
const expoConfig = require('eslint-config-expo/flat');

// Optional: only add the filename rule if the plugin is installed, so the
// pre-commit hook doesn't crash before `npm install`.
let unicorn = null;
try {
  unicorn = require('eslint-plugin-unicorn');
} catch {
  unicorn = null;
}

module.exports = [
  ...expoConfig,
  {
    ignores: ['dist/*', 'node_modules/*', 'android/*', 'ios/*', '.expo/*'],
  },
  ...(unicorn
    ? [
        {
          // Components (.tsx) + paired .styles files are PascalCase; other
          // modules camelCase. Allowing both forbids kebab/snake drift.
          files: ['**/*.{ts,tsx}'],
          plugins: { unicorn },
          rules: {
            'unicorn/filename-case': [
              'error',
              {
                cases: { camelCase: true, pascalCase: true },
                ignore: ['\\.styles\\.ts$', '\\.test\\.ts$'],
              },
            ],
          },
        },
      ]
    : []),
];
