import { isPromise, noop } from ".";

export function callInterceptor(options) {
  const { interceptor, args, done } = options;

  if (interceptor) {
    const returnVal = interceptor(...args);

    if (isPromise(returnVal)) {
      returnVal
        .then(value => {
          if (value) {
            done();
          }
        })
        .catch(noop);
    } else if (returnVal) {
      done();
    }
  } else {
    done();
  }
}
