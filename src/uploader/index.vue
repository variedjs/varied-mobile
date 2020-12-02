<template>
  <div :class="b()">
    <div :class="b('wrapper', { disabled })">
      <template v-if="previewImage">
        <div
          v-for="(item, index) in fileList"
          :key="index"
          :class="b('preview')"
          @click="onClick(item, index)"
        >
          <vm-image
            v-if="isImageFile(item)"
            :fit="imageFit"
            :src="item.content || item.url"
            :class="b('preview-image')"
            :width="previewSize"
            :height="previewSize"
            :lazyLoad="lazyLoad"
            @click="onPreviewImage(item)"
          >
            <div v-if="$slots['preview-cover']" :class="b('preview-cover')">
              <slot
                name="preview-cover"
                v-slot="{
                  index,
                  ...item
                }"
              ></slot>
            </div>
          </vm-image>
          <div
            v-else
            :class="b('file')"
            :style="{
              width: previewSizeWithUnit,
              height: previewSizeWithUnit
            }"
          >
            <Icon :class="b('file-icon')" name="description" />
            <div :class="[b('file-name'), 'vm-ellipsis']">
              {{ item.file ? item.file.name : item.url }}
            </div>
            <div v-if="$slots['preview-cover']" :class="b('preview-cover')">
              <slot
                name="preview-cover"
                v-slot="{
                  index,
                  ...item
                }"
              ></slot>
            </div>
          </div>
          <div
            v-if="item.status === 'uploading' || item.status === 'failed'"
            :class="b('mask')"
          >
            <Icon
              v-if="item.status === 'failed'"
              name="close"
              :class="b('mask-icon')"
            />
            <Loading v-else class="b('loading')" />
            <div
              v-if="isDef(item.message) && item.message !== ''"
              :class="b('mask-message')"
            >
              {{ item.message }}
            </div>
          </div>
          <div
            :class="b('preview-delete')"
            @click.prevent.stop="onDelete(item, index)"
          >
            <Icon name="close" :class="b('preview-delete-icon')" />
          </div>
        </div>
      </template>
      <div v-if="$slots['default']" :class="b('input-wrapper')">
        <slot></slot>
        <input
          v-bind="$attrs"
          ref="input"
          type="file"
          :accept="accept"
          :class="b('input')"
          :disabled="disabled"
          @change="onChange"
        />
      </div>
      <template v-else>
        <div
          v-if="showUpload && fileList.length < this.maxCount"
          :class="b('upload')"
          :style="style"
        >
          <Icon :name="uploadIcon" :class="b('upload-icon')" />
          <span v-if="uploadText" :class="b('upload-text')">
            {{ uploadText }}
          </span>
          <input
            v-bind="$attrs"
            ref="input"
            type="file"
            :accept="accept"
            :class="b('input')"
            :disabled="disabled"
            @change="onChange"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import create from "../utils/create";

// Utils
import { addUnit } from "../utils/format/unit";
import { noop, isPromise, isDef } from "../utils";
import { toArray, readFile, isOversize, isImageFile } from "./utils";

// Mixins
import { FieldMixin } from "../mixins/field";

// Components
import Icon from "../icon";
import Image from "../image";
import Loading from "../loading";
import ImagePreview from "../image-preview";
export default create({
  components: { Icon, "vm-image": Image, Loading, ImagePreview },
  name: "uploader",
  inheritAttrs: false,

  mixins: [FieldMixin],

  model: {
    prop: "fileList"
  },

  props: {
    disabled: Boolean,
    lazyLoad: Boolean,
    uploadText: String,
    afterRead: Function,
    beforeRead: Function,
    beforeDelete: Function,
    previewSize: [Number, String],
    previewOptions: Object,
    name: {
      type: [Number, String],
      default: ""
    },
    accept: {
      type: String,
      default: "image/*"
    },
    fileList: {
      type: Array,
      default: () => []
    },
    maxSize: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    maxCount: {
      type: [Number, String],
      default: Number.MAX_VALUE
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: "cover"
    },
    resultType: {
      type: String,
      default: "dataUrl"
    },
    uploadIcon: {
      type: String,
      default: "camera"
    }
  },

  computed: {
    style() {
      let style;
      if (this.previewSize) {
        const size = this.previewSizeWithUnit;
        style = {
          width: size,
          height: size
        };
      }
      return style;
    },
    previewSizeWithUnit() {
      return addUnit(this.previewSize);
    },

    // for form
    value() {
      return this.fileList;
    }
  },

  methods: {
    isImageFile,
    isDef,
    onClick(item, index) {
      this.$emit("click-preview", item, this.getDetail(index));
    },
    getDetail(index = this.fileList.length) {
      return {
        name: this.name,
        index
      };
    },

    onChange(event) {
      let { files } = event.target;

      if (this.disabled || !files.length) {
        return;
      }

      files = files.length === 1 ? files[0] : [].slice.call(files);

      if (this.beforeRead) {
        const response = this.beforeRead(files, this.getDetail());

        if (!response) {
          this.resetInput();
          return;
        }

        if (isPromise(response)) {
          response
            .then(data => {
              if (data) {
                this.readFile(data);
              } else {
                this.readFile(files);
              }
            })
            .catch(this.resetInput);

          return;
        }
      }

      this.readFile(files);
    },

    readFile(files) {
      const oversize = isOversize(files, this.maxSize);

      if (Array.isArray(files)) {
        const maxCount = this.maxCount - this.fileList.length;

        if (files.length > maxCount) {
          files = files.slice(0, maxCount);
        }

        Promise.all(files.map(file => readFile(file, this.resultType))).then(
          contents => {
            const fileList = files.map((file, index) => {
              const result = { file, status: "", message: "" };

              if (contents[index]) {
                result.content = contents[index];
              }

              return result;
            });

            this.onAfterRead(fileList, oversize);
          }
        );
      } else {
        readFile(files, this.resultType).then(content => {
          const result = { file: files, status: "", message: "" };

          if (content) {
            result.content = content;
          }

          this.onAfterRead(result, oversize);
        });
      }
    },

    onAfterRead(files, oversize) {
      this.resetInput();

      let validFiles = files;

      if (oversize) {
        let oversizeFiles = files;
        if (Array.isArray(files)) {
          oversizeFiles = [];
          validFiles = [];
          files.forEach(item => {
            if (item.file) {
              if (item.file.size > this.maxSize) {
                oversizeFiles.push(item);
              } else {
                validFiles.push(item);
              }
            }
          });
        } else {
          validFiles = null;
        }
        this.$emit("oversize", oversizeFiles, this.getDetail());
      }

      const isValidFiles = Array.isArray(validFiles)
        ? Boolean(validFiles.length)
        : Boolean(validFiles);

      if (isValidFiles) {
        this.$emit("input", [...this.fileList, ...toArray(validFiles)]);

        if (this.afterRead) {
          this.afterRead(validFiles, this.getDetail());
        }
      }
    },

    onDelete(file, index) {
      if (this.beforeDelete) {
        const response = this.beforeDelete(file, this.getDetail(index));

        if (!response) {
          return;
        }

        if (isPromise(response)) {
          response
            .then(() => {
              this.deleteFile(file, index);
            })
            .catch(noop);
          return;
        }
      }

      this.deleteFile(file, index);
    },

    deleteFile(file, index) {
      const fileList = this.fileList.slice(0);
      fileList.splice(index, 1);

      this.$emit("input", fileList);
      this.$emit("delete", file, this.getDetail(index));
    },

    resetInput() {
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.value = "";
      }
    },

    onPreviewImage(item) {
      if (!this.previewFullImage) {
        return;
      }

      const imageFiles = this.fileList.filter(item => isImageFile(item));
      const imageContents = imageFiles.map(item => item.content || item.url);

      this.imagePreview = ImagePreview({
        images: imageContents,
        startPosition: imageFiles.indexOf(item),
        onClose: () => {
          this.$emit("close-preview");
        },
        ...this.previewOptions
      });
    },

    // @exposed-api
    closeImagePreview() {
      if (this.imagePreview) {
        this.imagePreview.close();
      }
    },

    // @exposed-api
    chooseFile() {
      if (this.disabled) {
        return;
      }
      /* istanbul ignore else */
      if (this.$refs.input) {
        this.$refs.input.click();
      }
    }
  }
});
</script>
