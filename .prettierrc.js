module.exports = {
    singleQuote: true,
    trailingComma: 'es5',
    semi: true,
    printWidth: 80,
    overrides: [
        {
            files: '.prettierrc',
            options: { parser: 'json' },
        },
    ],
}
