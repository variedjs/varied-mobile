import docConfig from './doc.config';
import DemoList from './components/DemoList';
import { demoWrapper } from './mobile/demo-common';
import { initIframeRouter } from './utils/iframe-router';

initIframeRouter();

const registerRoute = ({ mobile, componentMap }) => {
  const route = [
    {
      path: '*',
      redirect: () => `/`
    }
  ];
  if (mobile) {
    route.push({
      path: `/`,
      component: DemoList,
    });
  } else {
    route.push({
      path: `/`,
      redirect: `/intro`
    });
  }

  function addRoute(page) {
    let { path } = page;
    if (path) {
      path = path.replace('/', '');

      let component;
      if (mobile) {
        const module = componentMap[`./${path}/demo/index.vue`];

        if (module) {
          component = demoWrapper(module, path);
        }
      } else {
        const module =
            componentMap[`./${path}/README.md`] ||
            componentMap[`./${path}.md`];
        component = module.default;
      }

      if (!component) {
        return;
      }

      route.push({
        component,
        name: `${path}`,
        path: `/${path}`,
        meta: {
          name: path,
          title: page.title
        }
      });
    }
  }

  const navs = docConfig.nav || [];
  navs.forEach(nav => {
    if (nav.groups) {
      nav.groups.forEach(group => {
        group.list.forEach(page => addRoute(page));
      });
    } else {
      addRoute(nav);
    }
  });

  return route;
};

export default registerRoute;
