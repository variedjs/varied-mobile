/**
 * Create a basic component with common options
 */
import bem from '../mixins/bem';
import findParent from '../mixins/find-parent';
import { isDef, camelize } from '.';

function install(Vue) {
  const { name } = this;
  Vue.component(name, this);
  Vue.component((camelize(`-${name}`)), this);
}

function returnArray() {
  return [];
}

function defaultProps(props) {
  Object.keys(props).forEach(key => {
    if (props[key] === Array) {
      props[key] = {
        type: Array,
        default: returnArray
      };
    } else if (props[key] === Number) {
      props[key] = {
        type: Number,
        default: 0
      };
    }
  });
}

export default function (sfc) {
  sfc.name = 'vm-' + sfc.name;
  sfc.install = sfc.install || install;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(bem, findParent);
  sfc.methods = sfc.methods || {};
  sfc.methods.isDef = isDef;
  sfc.props && defaultProps(sfc.props);

  return sfc;
}
