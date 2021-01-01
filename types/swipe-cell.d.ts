import { VmComponent } from "./component";

export class SwipeCell extends VmComponent {
  open(position: "left" | "right"): void;

  close(): void;
}
