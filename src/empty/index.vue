<template>
  <div :class="b()">
    <div :class="b('image')" :style="imageStyle">
      <slot name="image">
        <Network v-if="image === 'network'" />
        <img v-else :src="newImage" />
      </slot>
    </div>
    <slot name="description">
      <p v-if="description" :class="b('description')">
        {{ description }}
      </p>
    </slot>
    <div :class="b('bottom')">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";
import { addUnit } from "../utils/format/unit";
import Network from "./Network";

const PRESETS = ["error", "search", "default"];

export default create({
  components: { Network },
  name: "empty",
  props: {
    imageSize: [Number, String],
    description: String,
    image: {
      type: String,
      default: "default"
    }
  },
  computed: {
    imageStyle() {
      return {
        width: addUnit(this.imageSize),
        height: addUnit(this.imageSize)
      };
    },
    newImage() {
      let { image } = this;
      if (PRESETS.indexOf(image) !== -1) {
        image = `https://wuner.gitee.io/static-resources/varied-mobile/static/empty-image-${image}.png`;
      }
      return image;
    }
  }
});
</script>
