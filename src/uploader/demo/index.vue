<template>
  <demo-section>
    <demo-block :title="t('basicUsage')">
      <vm-uploader v-model="basicUsageFileList" :after-read="afterRead" />
    </demo-block>

    <demo-block :title="t('preview')">
      <vm-uploader v-model="fileList" multiple accept="*" />
    </demo-block>

    <demo-block :title="t('status')">
      <vm-uploader v-model="statusFileList" :after-read="afterReadFailed" />
    </demo-block>

    <demo-block :title="t('maxCount')">
      <vm-uploader v-model="fileList2" multiple :max-count="2" />
    </demo-block>

    <demo-block :title="t('maxSize')">
      <vm-uploader
        v-model="fileList4"
        multiple
        :max-size="500 * 1024"
        @oversize="onOversize"
      />
    </demo-block>

    <demo-block :title="t('customUpload')">
      <vm-uploader v-model="customUploadFileList">
        <vm-button type="primary" class="bg-green" icon="plus">
          {{ t("upload") }}
        </vm-button>
      </vm-uploader>
    </demo-block>

    <demo-block :title="t('previewCover')">
      <vm-uploader v-model="previewCoverFiles">
        <template #preview-cover="{ file }">
          <div class="preview-cover vm-ellipsis">{{ file.name }}</div>
        </template>
      </vm-uploader>
    </demo-block>

    <demo-block :title="t('beforeRead')">
      <vm-uploader v-model="fileList3" :before-read="beforeRead" />
    </demo-block>

    <demo-block :title="t('disabled')">
      <vm-uploader :after-read="afterRead" disabled />
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        status: "上传状态",
        failed: "上传失败",
        upload: "上传文件",
        preview: "文件预览",
        maxSize: "限制上传大小",
        disabled: "禁用文件上传",
        maxCount: "限制上传数量",
        uploading: "上传中...",
        imageName: "图片名称",
        beforeRead: "上传前置处理",
        overSizeTip: "文件大小不能超过 500kb",
        invalidType: "请上传 jpg 格式图片",
        customUpload: "自定义上传样式",
        previewCover: "自定义预览样式"
      },
      basicUsageFileList: [],
      customUploadFileList: [],
      fileList: [
        {
          url:
            "https://wuner.gitee.io/static-resources/varied-mobile/static/universe.jpg"
        },
        {
          url:
            "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-1.jpg"
        }
      ],
      fileList2: [
        {
          url:
            "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-2.jpg"
        }
      ],
      fileList3: [],
      fileList4: [
        {
          url:
            "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-3.jpg"
        }
      ],
      statusFileList: [],
      previewCoverFiles: []
    };
  },

  created() {
    this.statusFileList.push(
      {
        url:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-4.jpg",
        status: "uploading",
        message: this.t("uploading")
      },
      {
        url:
          "https://wuner.gitee.io/static-resources/varied-mobile/static/universe-5.jpg",
        status: "failed",
        message: this.t("failed")
      }
    );

    this.previewCoverFiles.push({
      url:
        "https://wuner.gitee.io/static-resources/varied-mobile/static/universe.jpg",
      file: {
        name: this.t("imageName")
      }
    });
  },

  methods: {
    t(name) {
      return this.info[name];
    },
    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast(this.t("invalidType"));
        return false;
      }

      return true;
    },

    afterRead(file, detail) {
      console.log(file, detail);
    },

    afterReadFailed(item) {
      item.status = "uploading";
      item.message = this.t("uploading");

      setTimeout(() => {
        item.status = "failed";
        item.message = this.t("failed");
      }, 1000);
    },

    onOversize(file, detail) {
      console.log(file, detail);
      this.$toast(this.t("overSizeTip"));
    }
  }
};
</script>

<style lang="less">
@import "../../style/theme";

.demo-uploader {
  background-color: @white;

  .vm-uploader {
    margin-left: @padding-md;
  }

  .preview-cover {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 4px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
