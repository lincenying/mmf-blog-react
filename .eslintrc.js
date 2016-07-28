/* eslint-disable */

module.exports = {
    "globals": {
        "$": true,
        "_": true,
        "window": true,
        "document": true,
        "navigator": true,
        "process": true,
        "__dirname": true
    },
    root: true,

    parser: 'babel-eslint',

    // import plugin is termporarily disabled, scroll below to see why
    plugins: ['react' /*, 'import'*/ ],

    env: {
        es6: true,
        commonjs: true,
        browser: true
    },

    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            generators: true,
            experimentalObjectRestSpread: true
        }
    },

    settings: {
        'import/ignore': [
            'node_modules',
            '\\.(json|css|jpg|png|gif|eot|svg|ttf|woff|woff2|mp4|webm)$',
        ],
        'import/extensions': ['.js'],
        'import/resolver': {
            node: {
                extensions: ['.js', '.json']
            }
        }
    },

    rules: {
        // http://eslint.org/docs/rules/
        'array-callback-return': 1,
        'default-case': [1, {
            commentPattern: '^no default$'
        }],
        'dot-location': [1, 'property'],
        eqeqeq: [1, 'allow-null'],
        'guard-for-in': 1,
        'new-cap': [1, {
            newIsCap: true
        }],
        'new-parens': 1,
        'no-array-constructor': 1,
        'no-caller': 1,
        'no-cond-assign': [1, 'always'],
        'no-const-assign': 1,
        'no-control-regex': 1,
        'no-delete-var': 1,
        'no-dupe-args': 1,
        'no-dupe-class-members': 1,
        'no-dupe-keys': 1,
        'no-duplicate-case': 1,
        'no-empty-character-class': 1,
        'no-empty-pattern': 1,
        'no-eval': 1,
        'no-ex-assign': 1,
        'no-extend-native': 1,
        'no-extra-bind': 1,
        'no-extra-label': 1,
        'no-fallthrough': 1,
        'no-func-assign': 1,
        'no-implied-eval': 1,
        'no-invalid-regexp': 1,
        'no-iterator': 1,
        'no-label-var': 1,
        'no-labels': [1, {
            allowLoop: false,
            allowSwitch: false
        }],
        'no-lone-blocks': 1,
        'no-loop-func': 1,
        'no-mixed-operators': [1, {
            groups: [
                ['+', '-', '*', '/', '%', '**'],
                ['&', '|', '^', '~', '<<', '>>', '>>>'],
                ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                ['&&', '||'],
                ['in', 'instanceof']
            ],
            allowSamePrecedence: false
        }],
        'no-multi-str': 1,
        'no-native-reassign': 1,
        'no-negated-in-lhs': 1,
        'no-new-func': 1,
        'no-new-object': 1,
        'no-new-symbol': 1,
        'no-new-wrappers': 1,
        'no-obj-calls': 1,
        'no-octal': 1,
        'no-octal-escape': 1,
        'no-redeclare': 1,
        'no-regex-spaces': 1,
        'no-restricted-syntax': [
            1,
            'LabeledStatement',
            'WithStatement',
        ],
        'no-return-assign': 1,
        'no-script-url': 1,
        'no-self-assign': 1,
        'no-self-compare': 1,
        'no-sequences': 1,
        'no-shadow-restricted-names': 1,
        'no-sparse-arrays': 1,
        'no-this-before-super': 1,
        'no-throw-literal': 1,
        'no-undef': 1,
        'no-unexpected-multiline': 1,
        'no-unreachable': 1,
        'no-unused-expressions': 1,
        'no-unused-labels': 1,
        'no-unused-vars': [1, {
            vars: 'local',
            args: 'none'
        }],
        'no-use-before-define': [1, 'nofunc'],
        'no-useless-computed-key': 1,
        'no-useless-concat': 1,
        'no-useless-constructor': 1,
        'no-useless-escape': 1,
        'no-useless-rename': [1, {
            ignoreDestructuring: false,
            ignoreImport: false,
            ignoreExport: false,
        }],
        'no-with': 1,
        'no-whitespace-before-property': 1,
        'operator-assignment': [1, 'always'],
        radix: 1,
        'require-yield': 1,
        'rest-spread-spacing': [1, 'never'],
        strict: [1, 'never'],
        'unicode-bom': [1, 'never'],
        'use-isnan': 1,
        'valid-typeof': 1,

        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/

        // TODO: import rules are temporarily disabled because they don't play well
        // with how eslint-loader only checks the file you change. So if module A
        // imports module B, and B is missing a default export, the linter will
        // record this as an issue in module A. Now if you fix module B, the linter
        // will not be aware that it needs to re-lint A as well, so the error
        // will stay until the next restart, which is really confusing.

        // This is probably fixable with a patch to eslint-loader.
        // When file A is saved, we want to invalidate all files that import it
        // *and* that currently have lint errors. This should fix the problem.

        // 'import/default': 1,
        // 'import/export': 1,
        // 'import/named': 1,
        // 'import/namespace': 1,
        // 'import/no-amd': 1,
        // 'import/no-duplicates': 1,
        // 'import/no-extraneous-dependencies': 1,
        // 'import/no-named-as-default': 1,
        // 'import/no-named-as-default-member': 1,
        // 'import/no-unresolved': [1, { commonjs: true }],

        // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
        'react/jsx-equals-spacing': [1, 'never'],
        'react/jsx-handler-names': [1, {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
        }],
        'react/jsx-no-duplicate-props': [1, {
            ignoreCase: true
        }],
        'react/jsx-no-undef': 1,
        'react/jsx-pascal-case': [1, {
            allowAllCaps: true,
            ignore: [],
        }],
        'react/jsx-uses-react': 1,
        'react/jsx-uses-vars': 1,
        'react/no-deprecated': 1,
        'react/no-direct-mutation-state': 1,
        'react/no-is-mounted': 1,
        'react/react-in-jsx-scope': 1,
        'react/require-render-return': 1
    }
}
