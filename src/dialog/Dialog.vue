<template>
  <transition name="vm-dialog-bounce">
    <div v-show="value" :class="[b(), className]">
      <div
        v-if="title"
        v-text="title"
        :class="b('-header', { isolated: !message && !$slots.default })"
      />
      <div :class="b('content')" v-if="message || $slots.default">
        <slot>
          <div
            v-if="message"
            v-html="message"
            :class="
              b('message', { 'has-title': title, [messageAlign]: messageAlign })
            "
          />
        </slot>
      </div>
      <div
        class="vm-hairline-top"
        :class="b('footer', { buttons: showCancelButton && showConfirmButton })"
      >
        <vm-button
          v-show="showCancelButton"
          size="lg"
          :class="[b('cancel'), 'bg-white']"
          :loading="loading.cancel"
          :text="cancelButtonText || '取消'"
          @click="handleAction('cancel')"
        />
        <vm-button
          v-show="showConfirmButton"
          size="lg"
          block
          :class="[
            b('confirm'),
            'bg-white',
            { 'vm-hairline-left': showCancelButton && showConfirmButton }
          ]"
          :loading="loading.confirm"
          :text="confirmButtonText || '确定'"
          @click="handleAction('confirm')"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import create from "../utils/create";
import MmButton from "../button";
import Popup from "../mixins/popup";

export default create({
  name: "dialog",

  components: {
    MmButton
  },

  mixins: [Popup],

  props: {
    title: String,
    message: String,
    callback: Function,
    className: [String, Object, Array],
    beforeClose: Function,
    messageAlign: String,
    confirmButtonText: String,
    cancelButtonText: String,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },

  methods: {
    handleAction(action) {
      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, state => {
          if (state !== false) {
            this.onClose(action);
          }
          this.loading[action] = false;
        });
      } else {
        this.onClose(action);
      }
    },

    onClose(action) {
      this.$emit("input", false);
      this.$emit(action);
      this.callback && this.callback(action);
    }
  }
});
</script>
