import { mount } from "../../../test";
import VmSidebar from "..";
import VmSidebarItem from "../../sidebar-item";

test("click event & change event", () => {
  const onClick = jest.fn();
  const onChange = jest.fn();
  const wrapper = mount(
    {
      template: `
      <vm-sidebar @change="onChange">
        <vm-sidebar-item>Text</vm-sidebar-item>
        <vm-sidebar-item @click="onClick">Text</vm-sidebar-item>
      </vm-sidebar>
    `,
      methods: {
        onClick,
        onChange
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-sidebar": VmSidebar,
        "vm-sidebar-item": VmSidebarItem
      }
    }
  );

  wrapper
    .findAll(".vm-sidebar-item")
    .at(1)
    .trigger("click");
  expect(onClick).toHaveBeenCalledWith(1);
  expect(onChange).toHaveBeenCalledWith(1);
  wrapper.vm.$destroy();
});

test("v-model", () => {
  const onChange = jest.fn();
  const wrapper = mount(
    {
      template: `
      <vm-sidebar v-model="active" @change="onChange">
        <vm-sidebar-item>Text</vm-sidebar-item>
        <vm-sidebar-item>Text</vm-sidebar-item>
      </vm-sidebar>
    `,
      data() {
        return {
          active: 0
        };
      },
      methods: {
        onChange
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-sidebar": VmSidebar,
        "vm-sidebar-item": VmSidebarItem
      }
    }
  );

  wrapper
    .findAll(".vm-sidebar-item")
    .at(1)
    .trigger("click");
  expect(wrapper.vm.active).toEqual(1);
  expect(onChange).toHaveBeenCalledWith(1);
});

test("disabled prop", () => {
  const wrapper = mount(
    {
      template: `
      <vm-sidebar v-model="active">
        <vm-sidebar-item>Text</vm-sidebar-item>
        <vm-sidebar-item disabled>Text</vm-sidebar-item>
      </vm-sidebar>
    `,
      data() {
        return {
          active: 0
        };
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-sidebar": VmSidebar,
        "vm-sidebar-item": VmSidebarItem
      }
    }
  );

  wrapper
    .findAll(".vm-sidebar-item")
    .at(1)
    .trigger("click");
  expect(wrapper.vm.active).toEqual(0);
});

test("without parent", () => {
  const consoleError = console.error;
  try {
    console.error = jest.fn();
    mount(Sidebar);
  } catch (err) {
    console.error = consoleError;
    expect(err).toBeTruthy();
  }
});

test("title slot", () => {
  const wrapper = mount(
    {
      template: `
      <vm-sidebar v-model="active">
        <vm-sidebar-item>
          <template #title>Title Slot</template>
        </vm-sidebar-item>
      </vm-sidebar>
    `,
      data() {
        return {
          active: 0
        };
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-sidebar": VmSidebar,
        "vm-sidebar-item": VmSidebarItem
      }
    }
  );

  expect(wrapper).toMatchSnapshot();
});
