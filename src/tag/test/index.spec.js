import Tag from "..";
import { later, mount } from "../../../test";

test("click event", () => {
  const click = jest.fn();
  const wrapper = mount(Tag, {
    listeners: {
      click
    }
  });

  wrapper.find(".vm-tag").trigger("click");
  expect(click).toHaveBeenCalledTimes(1);
});

test("close event", () => {
  const close = jest.fn();
  const wrapper = mount(Tag, {
    propsData: {
      closeable: true
    },
    listeners: {
      close
    }
  });

  wrapper.find(".vm-tag-close").trigger("click");
  expect(close).toHaveBeenCalledTimes(1);
});

test("should not trigger click event when close", () => {
  const close = jest.fn();
  const click = jest.fn();

  const wrapper = mount(Tag, {
    propsData: {
      closeable: true
    },
    listeners: {
      close,
      click
    }
  });

  wrapper.find(".vm-tag-close").trigger("click");
  expect(close).toHaveBeenCalledTimes(1);
  expect(click).toHaveBeenCalledTimes(0);
});
