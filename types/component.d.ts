import Vue from "vue";

export class VmComponent extends Vue {
  static name: string;

  static install(vue: typeof Vue): void;
}
