export const context = {
  zIndex: 2000,
  lockCount: 0,
  stack: [],
  find(vm) {
    return this.stack.filter(item => item.vm === vm)[0];
  }
};
