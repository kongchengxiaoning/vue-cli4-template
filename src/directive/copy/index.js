import Copy from './copy'

const install = function(Vue) {
  Vue.directive('copy', Copy)
}

if (window.Vue) {
  window.copy = Copy
  Vue.use(install); // eslint-disable-line
}

Copy.install = install
export default Copy
