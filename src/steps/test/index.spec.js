import { mount } from "../../../test";
import VmSteps from "..";
import VmStep from "../../step";

test("icon slot", () => {
  const wrapper = mount(
    {
      template: `
    <vm-steps :active="1">
      <vm-step>
        <template v-slot:inactive-icon>Custim Inactive Icon</template>
        A
      </vm-step>
      <vm-step>
        <template v-slot:active-icon>Custim Active Icon</template>
        B
      </vm-step>
      <vm-step>
        <template v-slot:inactive-icon>Custim Inactive Icon</template>
        C
      </vm-step>
    </vm-steps>
    `
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-steps": VmSteps,
        "vm-step": VmStep
      }
    }
  );
  expect(wrapper).toMatchSnapshot();
});

test("click-step event", () => {
  const onClickStep = jest.fn();
  const wrapper = mount(
    {
      template: `
      <vm-steps :active="1" @click-step="onClickStep">
        <vm-step>A</vm-step>
        <vm-step>B</vm-step>
        <vm-step>C</vm-step>
      </vm-steps>
    `,
      methods: {
        onClickStep
      }
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-steps": VmSteps,
        "vm-step": VmStep
      }
    }
  );

  wrapper.find(".vm-step").trigger("click");
  expect(onClickStep).toHaveBeenCalledTimes(0);

  wrapper.find(".vm-step-title").trigger("click");
  expect(onClickStep).toHaveBeenCalledWith(0);

  wrapper
    .findAll(".vm-step-circle-container")
    .at(2)
    .trigger("click");
  expect(onClickStep).toHaveBeenCalledTimes(2);
  expect(onClickStep).toHaveBeenLastCalledWith(2);
});

test("inactive-color prop", () => {
  const wrapper = mount(
    {
      template: `
    <vm-steps :active="0" inactive-color="red">
      <vm-step>A</vm-step>
      <vm-step>B</vm-step>
    </vm-steps>
    `
    },
    {
      stubs: {
        // 用来注册自定义组件
        "vm-steps": VmSteps,
        "vm-step": VmStep
      }
    }
  );
  expect(wrapper).toMatchSnapshot();
});
