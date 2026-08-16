/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(msg) => /Signed-off-by: dependabot\[bot\]/.test(msg)],
  rules: {
    'header-max-length': [2, 'always', 200],
    'subject-case': [0],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
