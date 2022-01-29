module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        parser: 'babel-eslint',
    },
    rules: {
        'no-console': 'off',
        'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
        'no-useless-escape': 'off',
    },
};
