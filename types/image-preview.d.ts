import { VmComponent } from "./component";
import { VmPopupMixin } from "./mixins/popup";
import { SwipeToOptions } from "./swipe";

export type ImagePreviewOptions =
  | string[]
  | {
      loop?: boolean;
      images: string[];
      maxZoom?: number;
      minZoom?: number;
      className?: any;
      showIndex?: boolean;
      closeable?: boolean;
      closeIcon?: string;
      asyncClose?: boolean;
      swipeDuration?: number;
      startPosition?: number;
      showIndicators?: boolean;
      closeOnPopstate?: boolean;
      closeIconPosition?: string;
      getContainer?: string | (() => Element);
      onClose?(): void;
      onChange?(index: number): void;
      swipeTo?(index: number, options?: SwipeToOptions): void;
    };

export class VmImagePreview extends VmPopupMixin {
  images: string[];

  showIndex: boolean;

  startPosition: number;
}

export interface ImagePreview {
  (options: ImagePreviewOptions, startPosition?: number): VmImagePreview;
  install(): void;
  Component: typeof VmComponent;
}

export const ImagePreview: ImagePreview;
