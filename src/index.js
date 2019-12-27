// This file is auto generated by build/build-entry.js
import AddressPicker from './address-picker';
import Button from './button';
import CarouselMap from './carousel-map';
import Cell from './cell';
import CellGroup from './cell-group';
import Col from './col';
import Collapse from './collapse';
import CollapseItem from './collapse-item';
import DatePicker from './date-picker';
import Field from './field';
import Icon from './icon';
import Info from './info';
import Loading from './loading';
import NavBar from './nav-bar';
import Overlay from './overlay';
import Picker from './picker';
import Popup from './popup';
import Row from './row';
import Search from './search';
import Toast from './toast';

const version = '0.0.20';
const components = [
  AddressPicker,
  Button,
  CarouselMap,
  Cell,
  CellGroup,
  Col,
  Collapse,
  CollapseItem,
  DatePicker,
  Field,
  Icon,
  Info,
  Loading,
  NavBar,
  Overlay,
  Picker,
  Popup,
  Row,
  Search,
  Toast
];

const install = (Vue) => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  version,
  AddressPicker,
  Button,
  CarouselMap,
  Cell,
  CellGroup,
  Col,
  Collapse,
  CollapseItem,
  DatePicker,
  Field,
  Icon,
  Info,
  Loading,
  NavBar,
  Overlay,
  Picker,
  Popup,
  Row,
  Search,
  Toast
};

export default {
  install,
  version
};
