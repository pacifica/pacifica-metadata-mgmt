module.exports = {
  'plugins': [
    'transform-es2015-modules-commonjs',
    '@babel/plugin-proposal-class-properties'
  ],
  'presets': [
    [
      '@babel/preset-env',
      {
        'modules': 'commonjs',
        'targets': {
          'node': 'current'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
