module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended', 'next'
  ],
  'ignorePatterns': [
    'public/fallback-development.js',
    'public/sw.js',
    'public/worker-development.js'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    'react-hooks',
    '@typescript-eslint'
  ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },

  'rules': {
    'import/no-anonymous-default-export': ['error', {
      'allowArray': false,
      'allowArrowFunction': false,
      'allowAnonymousClass': false,
      'allowAnonymousFunction': false,
      'allowCallExpression': true, // The true value here is for backward compatibility
      'allowLiteral': false,
      'allowObject': true // anonymous-default-export
    }],
    // react hooks validations
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    ],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],
    'consistent-return': 2,
    'indent': [
      2,
      2,
      {
        'SwitchCase': 1
      }
    ],
    'no-else-return': 1,
    'semi': [
      1,
      'never'
    ],
    'space-unary-ops': 2,
    'comma-dangle': [
      'error',
      {
        'arrays': 'never',
        'objects': 'never',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never'
      }
    ],
    'one-var': [
      2,
      'never'
    ],
    'no-var': 'error',
    'arrow-body-style': [
      'error',
      'always'
    ],
    'no-console': 'error',
    'no-multi-spaces': [
      'error',
      {
        'exceptions': {
          'BinaryExpression': true
        }
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 2,
        'maxBOF': 2
      }
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    'react/jsx-sort-props': [
      'error',
      {
        'noSortAlphabetically': false
      }
    ],
    'react/jsx-first-prop-new-line': [
      'error',
      'multiline'
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        'maximum': {
          'single': 2,
          'multi': 1
        }
      }
    ],
    'react/jsx-closing-bracket-location': [
      'error',
      'line-aligned'
    ]
  }
}