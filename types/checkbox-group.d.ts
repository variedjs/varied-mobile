import { VmComponent } from "./component";

export type ToggleAllOptions = {
  checked?: boolean;
  skipDisabled?: boolean;
};

export class CheckboxGroup extends VmComponent {
  toggleAll(options?: boolean | ToggleAllOptions): void;
}
