/**
 * Common Cell Props
 */

export default {
  props: {
    icon: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    titleClass: String,
    valueClass: String,
    labelClass: String,
    title: [String, Number],
    value: [String, Number],
    label: [String, Number],
    border: {
      type: Boolean,
      default: true
    },
    shortBorder: Boolean,
    size: String,
    clickable: Boolean,
    arrowDirection: {
      type: String,
      default: "right"
    }
  }
};
