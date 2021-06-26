module.exports = {
  presets: [
    // '@vue/cli-plugin-babel/preset',
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol',
        'es.array.iterator',
        'es.object.assign',
        'es.promise.finally'
      ]
    }]
  ]
}
