export interface DataProcess {
  desDecrypt(data: any, firstKey: any, secondKey: any, thirdKey: any): any;
  desEncrypt(data: any, firstKey: any, secondKey: any, thirdKey: any): any;
  aesDecrypt(data: any, privateKey: any, nBits?: any): any;
  aesEncrypt(data: any, privateKey: any, nBits?: any): any;
  setPublic(N: any, E: any): void;
  rsaEncrypt(data: any): any;
  setPrivate(N: any, E: any, D: any): void;
  rsaDecrypt(data: any): any;
}

declare module "vue/types/vue" {
  interface Vue {
    $DataProcess: DataProcess;
  }
}

export const DataProcess: DataProcess;
