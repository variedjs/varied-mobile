/**
 * Vue Router support
 */

function isRedundantNavigation(err) {
  return (
    err.name === "NavigationDuplicated" ||
    // compatible with vue-router@3.3
    (err.message && err.message.indexOf("redundant navigation") !== -1)
  );
}

export function route(router, config) {
  const { to, url, replace } = config;
  if (to && router) {
    const promise = router[replace ? "replace" : "push"](to);

    /* istanbul ignore else */
    if (promise && promise.catch) {
      promise.catch(err => {
        if (err && !isRedundantNavigation(err)) {
          throw err;
        }
      });
    }
  } else if (url) {
    replace ? location.replace(url) : (location.href = url);
  }
}

export function functionalRoute(context) {
  route(context.parent && context.parent.$router, context.props);
}

export const routeProps = {
  url: String,
  replace: Boolean,
  to: [String, Object]
};
