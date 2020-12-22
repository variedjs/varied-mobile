import Vue, { VNodeData } from "vue";

// mount functional component
export function mount(Component, data) {
  const instance = new Vue({
    el: document.createElement("div"),
    props: Component.props,
    render(h) {
      return h(Component, {
        props: this.$props,
        ...data
      });
    }
  });

  document.body.appendChild(instance.$el);

  return instance;
}
