import { mount } from "../../../test";
import Button from "..";

test("loading-size prop", () => {
  const wrapper = mount(Button, {
    propsData: {
      loading: true,
      loadingSize: "10px"
    }
  });
  expect(wrapper).toMatchSnapshot();
});

test("icon-position prop", () => {
  const wrapper = mount(Button, {
    propsData: {
      icon: "plus",
      iconPosition: "right"
    }
  });
  expect(wrapper).toMatchSnapshot();
});

test("click event", () => {
  const onClick = jest.fn();
  const wrapper = mount(Button, {
    listeners: {
      click: onClick
    }
  });

  wrapper.trigger("click");
  expect(onClick).toHaveBeenCalled();
});

test("not trigger click event when disabled", () => {
  const onClick = jest.fn();
  const wrapper = mount(Button, {
    propsData: {
      disabled: true
    },
    listeners: {
      click: onClick
    }
  });

  wrapper.trigger("click");
  expect(onClick).toHaveBeenCalledTimes(0);
});

test("not trigger click event when loading", () => {
  const onClick = jest.fn();
  const wrapper = mount(Button, {
    propsData: {
      loading: true
    },
    listeners: {
      click: onClick
    }
  });

  wrapper.trigger("click");
  expect(onClick).toHaveBeenCalledTimes(0);
});

// test("touchstart event", () => {
//   const onTouchstart = jest.fn();
//   const wrapper = mount(Button, {
//     listeners: {
//       touchstart: onTouchstart
//     }
//   });
//
//   wrapper.trigger("touchstart");
//   expect(onTouchstart).toHaveBeenCalled();
// });

test("icon-prefix prop", () => {
  const wrapper = mount(Button, {
    propsData: {
      icon: "success",
      iconPrefix: "my-icon"
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test("loading slot", () => {
  const wrapper = mount(Button, {
    propsData: {
      loading: true
    },
    scopedSlots: {
      loading: () => "Custom Loading"
    }
  });

  expect(wrapper).toMatchSnapshot();
});
