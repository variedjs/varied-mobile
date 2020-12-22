import { mount, later } from "../../../test";
import dropdownMenu from "../";
import dropdownItem from "../../dropdown-item";
function renderWrapper(options = {}) {
  return mount(
    {
      template: `
      <vm-dropdown-menu :direction="direction" :close-on-click-outside="closeOnClickOutside">
        <vm-dropdown-item v-model="value" :title="title" :options="options" />
        <vm-dropdown-item v-model="value" :title="title" :options="options" />
      </vm-dropdown-menu>
    `,
      data() {
        return {
          value: options.value || 0,
          title: options.title || "",
          direction: options.direction || "down",
          closeOnClickOutside: options.closeOnClickOutside,
          options: [
            { text: "A", value: 0, icon: options.icon },
            { text: "B", value: 1, icon: options.icon }
          ]
        };
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-dropdown-menu": dropdownMenu,
        "vm-dropdown-item": dropdownItem
      }
    }
  );
}

test("show dropdown item", async () => {
  const wrapper = renderWrapper();

  await later();

  const titles = wrapper.findAll(".vm-dropdown-menu-title");
  titles.at(0).trigger("click");
  expect(wrapper).toMatchSnapshot();

  titles.at(1).trigger("click");
  expect(wrapper).toMatchSnapshot();

  titles.at(1).trigger("click");
  expect(wrapper).toMatchSnapshot();
});

test("render option icon", async () => {
  const wrapper = renderWrapper({
    icon: "check"
  });

  await later();

  const titles = wrapper.findAll(".vm-dropdown-menu-title");

  titles.at(0).trigger("click");
  expect(wrapper).toMatchSnapshot();
});

test("close-on-click-outside", async () => {
  const wrapper = renderWrapper({
    closeOnClickOutside: true
  });

  await later();

  const titles = wrapper.findAll(".vm-dropdown-menu-title");

  titles.at(0).trigger("click");
  document.body.click();
  expect(wrapper).toMatchSnapshot();
});

test("disable close-on-click-outside", async () => {
  const wrapper = renderWrapper({
    closeOnClickOutside: false
  });

  await later();

  const titles = wrapper.findAll(".vm-dropdown-menu-title");

  titles.at(0).trigger("click");
  document.body.click();
  expect(wrapper).toMatchSnapshot();
});

test("direction up", async () => {
  const { innerHeight } = window;
  window.innerHeight = 1000;

  const wrapper = renderWrapper({
    direction: "up"
  });

  await later();
  expect(wrapper).toMatchSnapshot();

  const titles = wrapper.findAll(".vm-dropdown-menu-title");
  titles.at(0).trigger("click");
  expect(wrapper).toMatchSnapshot();

  window.innerHeight = innerHeight;
});

test("click option", async () => {
  const wrapper = renderWrapper();

  await later();

  const titles = wrapper.findAll(".vm-dropdown-menu-title");
  titles.at(0).trigger("click");
  await later();
  const options = wrapper.findAll(".vm-dropdown-item .vm-cell");
  options.at(1).trigger("click");

  await later();
  expect(wrapper).toMatchSnapshot();
});

test("title prop", async () => {
  const wrapper = renderWrapper({ title: "Title" });
  await later();
  expect(wrapper).toMatchSnapshot();
});

test("didn`t find matched option", async () => {
  const wrapper = renderWrapper({ value: -1 });
  await later();
  expect(wrapper).toMatchSnapshot();
});

test("destroy one item", async () => {
  const wrapper = mount({
    template: `
      <vm-dropdown-menu>
        <vm-dropdown-item v-if="render" v-model="value" :options="options" />
        <vm-dropdown-item v-model="value" :options="options" />
      </vm-dropdown-menu>
    `,
    data() {
      return {
        value: 0,
        render: true,
        options: [{ text: "A", value: 0 }, { text: "B", value: 1 }]
      };
    }
  });

  await later();
  wrapper.setData({ render: false });
  expect(wrapper).toMatchSnapshot();
});

test("disable dropdown item", async () => {
  const wrapper = mount(
    {
      template: `
      <vm-dropdown-menu>
        <vm-dropdown-item disabled v-model="value" :options="options" />
      </vm-dropdown-menu>
    `,
      data() {
        return {
          value: 0,
          options: [{ text: "A", value: 0 }, { text: "B", value: 1 }]
        };
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-dropdown-menu": dropdownMenu,
        "vm-dropdown-item": dropdownItem
      }
    }
  );
  await later();
  const title = wrapper.find(".vm-dropdown-menu-title");
  title.trigger("click");
  expect(wrapper).toMatchSnapshot();
});

test("change event", async () => {
  const onChange = jest.fn();

  const wrapper = mount(
    {
      template: `
      <vm-dropdown-menu>
        <vm-dropdown-item v-model="value" :options="options" @change="onChange" />
        <vm-dropdown-item v-model="value" :options="options" />
      </vm-dropdown-menu>
    `,
      data() {
        return {
          value: 0,
          options: [{ text: "A", value: 0 }, { text: "B", value: 1 }]
        };
      },
      methods: {
        onChange
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-dropdown-menu": dropdownMenu,
        "vm-dropdown-item": dropdownItem
      }
    }
  );

  await later();

  const items = wrapper.findAll(".vm-dropdown-menu-item");
  items.at(0).trigger("click");

  await later();

  const options = wrapper.findAll(".vm-dropdown-item .vm-cell");
  options.at(0).trigger("click");

  expect(onChange).toHaveBeenCalledTimes(0);

  options.at(1).trigger("click");
  expect(onChange).toHaveBeenCalledWith(1);
  expect(onChange).toHaveBeenCalledTimes(1);
});

test("title slot", () => {
  const wrapper = mount({
    template: `
      <vm-dropdown-menu>
        <vm-dropdown-item>
          <template #title>
            Custom Title
          </template>
        </vm-dropdown-item>
      </vm-dropdown-menu>
    `
  });

  expect(wrapper).toMatchSnapshot();
});
