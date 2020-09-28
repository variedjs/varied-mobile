import Vue from "vue";
import { strEnc, strDec } from "./des";
let Aes = require("./aes");

let RSAKey = require("./rsa");
let rsa = {};
const DataProcess = () => {
  rsa = new RSAKey();
};

DataProcess.desDecrypt = (data, firstKey, secondKey, thirdKey) => {
  return strDec(data, firstKey, secondKey, thirdKey);
};
DataProcess.desEncrypt = (data, firstKey, secondKey, thirdKey) => {
  return strEnc(data, firstKey, secondKey, thirdKey);
};
DataProcess.aesDecrypt = (data, privateKey, nBits = 128) => {
  return Aes.Ctr.decrypt(data, privateKey, nBits);
};
DataProcess.aesEncrypt = (data, privateKey, nBits = 128) => {
  return Aes.Ctr.encrypt(data, privateKey, nBits);
};
DataProcess.setPublic = (N, E) => {
  rsa.setPublic(N, E);
};
DataProcess.rsaEncrypt = data => {
  return rsa.encrypt(data);
};
DataProcess.setPrivate = (N, E, D) => {
  rsa.setPrivate(N, E, D);
};
DataProcess.rsaDecrypt = data => {
  return rsa.decrypt(data);
};

Vue.prototype.$DataProcess = DataProcess;

export default DataProcess;
