import { mount } from "../../../test";
import grid from "../";
import gridItem from "../../grid-item";

test("click grid item", () => {
  const onClick = jest.fn();
  const wrapper = mount(
    {
      template: `
      <vm-grid>
        <vm-grid-item @click="onClick" />
      </vm-grid>
    `,
      methods: {
        onClick
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-grid": grid,
        "vm-grid-item": gridItem
      }
    }
  );

  const Item = wrapper.find(".vm-grid-item-content");
  Item.trigger("click");

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("sqaure and set gutter", () => {
  const wrapper = mount(
    {
      template: `
      <vm-grid square :column-num="2" gutter="10rem">
        <vm-grid-item />
        <vm-grid-item />
        <vm-grid-item />
      </vm-grid>
    `
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-grid": grid,
        "vm-grid-item": gridItem
      }
    }
  );

  expect(wrapper).toMatchSnapshot();
});

test("icon-size prop", () => {
  const wrapper = mount(
    {
      template: `
      <vm-grid icon-size="10">
        <vm-grid-item icon="success" />
      </vm-grid>
    `
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-grid": grid,
        "vm-grid-item": gridItem
      }
    }
  );

  expect(wrapper).toMatchSnapshot();
});

test("render icon-slot", () => {
  const wrapper = mount(
    {
      template: `
      <vm-grid icon-size="10">
        <vm-grid-item badge="1">
          <template #icon>
            <div>Custom Icon</div>
          </template>
        </vm-grid-item>
      </vm-grid>
    `
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-grid": grid,
        "vm-grid-item": gridItem
      }
    }
  );

  expect(wrapper).toMatchSnapshot();
});
