import ShareSheet from "..";
import { mount, trigger, later } from "../../../test";

test("cancel-text prop", async () => {
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true,
      cancelText: "foo"
    }
  });
  expect(wrapper.find(".vm-share-sheet-cancel")).toMatchSnapshot();

  wrapper.setProps({ cancelText: "" });
  await later();
  expect(wrapper.contains(".vm-share-sheet-cancel")).toBeFalsy();
});

test("description prop", async () => {
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true,
      description: "foo"
    }
  });

  expect(wrapper.find(".vm-share-sheet-description")).toMatchSnapshot();

  wrapper.setProps({ description: "" });
  await later();
  expect(wrapper.contains(".vm-share-sheet-description")).toBeFalsy();
});

test("option className", () => {
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true,
      options: [{ name: "Link", icon: "link", className: "foo" }]
    }
  });

  const option = wrapper.find(".vm-share-sheet-option").element;

  expect(option.className.includes("foo")).toBeTruthy();
});

test("select event", () => {
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true,
      options: [{ icon: "wechat", name: "wechat" }]
    }
  });

  wrapper.find(".vm-share-sheet-option").trigger("click");
  expect(wrapper.emitted("select")[0]).toEqual([
    { icon: "wechat", name: "wechat" },
    0
  ]);
});

test("cancel event", () => {
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true
    }
  });

  wrapper.find(".vm-share-sheet-cancel").trigger("click");

  expect(wrapper.emitted("input")[0][0]).toEqual(false);
  expect(wrapper.emitted("cancel")[0]).toBeTruthy();
});

test("title & description slot", () => {
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true
    },
    scopedSlots: {
      title: () => "Custom Title",
      description: () => "Custom Description"
    }
  });

  expect(wrapper).toMatchSnapshot();
});

test("click-overlay event", async () => {
  const root = document.createElement("div");
  const wrapper = mount(ShareSheet, {
    propsData: {
      value: true,
      getContainer: () => root
    }
  });

  await later();

  const overlay = root.querySelector(".vm-overlay");
  trigger(overlay, "click");
  expect(wrapper.emitted("click-overlay")).toBeTruthy();
});
