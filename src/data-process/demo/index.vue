<template>
  <demo-section>
    <demo-block title="des加密">
      <vm-field
        type="textarea"
        autosize
        v-model="value"
        placeholder="请输入需要加密的数据"
      />
      <vm-field type="textarea" autosize v-model="value1" />
      <vm-button style="margin: 15px" @click="encrypt" round class="bg-cyan">
        加密
      </vm-button>
    </demo-block>
    <demo-block title="des解密">
      <vm-field
        type="textarea"
        autosize
        v-model="value2"
        placeholder="请输入需要解密的数据"
      />
      <vm-field type="textarea" autosize v-model="value3" />
      <vm-button style="margin: 15px" @click="decrypt" round class="bg-cyan">
        解密
      </vm-button>
    </demo-block>
    <demo-block title="aes加密">
      <vm-field
        type="textarea"
        autosize
        v-model="value8"
        placeholder="请输入需要加密的数据"
      />
      <vm-field type="textarea" autosize v-model="value9" />
      <vm-button style="margin: 15px" @click="encrypt2" round class="bg-cyan">
        加密
      </vm-button>
    </demo-block>
    <demo-block title="aes解密">
      <vm-field
        type="textarea"
        autosize
        v-model="value10"
        placeholder="请输入需要解密的数据"
      />
      <vm-field type="textarea" autosize v-model="value11" />
      <vm-button style="margin: 15px" @click="decrypt2" round class="bg-cyan">
        解密
      </vm-button>
    </demo-block>
    <demo-block title="rsa加密">
      <vm-field
        type="textarea"
        autosize
        v-model="value4"
        placeholder="请输入需要加密的数据"
      />
      <vm-field type="textarea" autosize v-model="value5" />
      <vm-button style="margin: 15px" @click="encrypt1" round class="bg-cyan">
        加密
      </vm-button>
    </demo-block>
    <demo-block title="rsa解密">
      <vm-field
        type="textarea"
        autosize
        v-model="value6"
        placeholder="请输入需要解密的数据"
      />
      <vm-field type="textarea" autosize v-model="value7" />
      <vm-button style="margin: 15px" @click="decrypt1" round class="bg-cyan">
        解密
      </vm-button>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
      value11: ""
    };
  },
  methods: {
    encrypt() {
      if (this.value) {
        let firstKey = "123";
        let secondKey = "faada";
        let thirdKey = "131";
        this.value1 = this.$DataProcess.desEncrypt(
          this.value,
          firstKey,
          secondKey,
          thirdKey
        );
      } else {
        this.$toast("请输入需要加密的数据");
      }
    },
    decrypt() {
      if (this.value2) {
        let firstKey = "123";
        let secondKey = "faada";
        let thirdKey = "131";
        this.value3 = this.$DataProcess.desDecrypt(
          this.value2,
          firstKey,
          secondKey,
          thirdKey
        );
      } else {
        this.$toast("请输入需要加密的数据");
      }
    },
    encrypt2() {
      if (this.value8) {
        let privateKey = "123";
        let nBits = 128;

        this.value9 = this.$DataProcess.aesEncrypt(
          this.value8,
          privateKey,
          nBits
        );
      } else {
        this.$toast("请输入需要加密的数据");
      }
    },
    decrypt2() {
      if (this.value10) {
        let privateKey = "123";
        let nBits = 128;

        this.value11 = this.$DataProcess.aesDecrypt(
          this.value10,
          privateKey,
          nBits
        );
      } else {
        this.$toast("请输入需要加密的数据");
      }
    },
    encrypt1() {
      if (this.value4) {
        let module =
          "a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3";
        let empoent = "10001";
        this.$DataProcess.setPublic(module, empoent);
        this.value5 = this.$DataProcess.rsaEncrypt(this.value4);
      } else {
        this.$toast("请输入需要加密的数据");
      }
    },
    decrypt1() {
      if (this.value6) {
        let module =
          "a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3";
        let empoent = "10001";
        let privateKey =
          "8e9912f6d3645894e8d38cb58c0db81ff516cf4c7e5a14c7f1eddb1459d2cded4d8d293fc97aee6aefb861859c8b6a3d1dfe710463e1f9ddc72048c09751971c4a580aa51eb523357a3cc48d31cfad1d4a165066ed92d4748fb6571211da5cb14bc11b6e2df7c1a559e6d5ac1cd5c94703a22891464fba23d0d965086277a161";
        this.$DataProcess.setPrivate(module, empoent, privateKey);
        this.value7 = this.$DataProcess.rsaDecrypt(this.value6);
      } else {
        this.$toast("请输入需要加密的数据");
      }
    }
  }
};
</script>
