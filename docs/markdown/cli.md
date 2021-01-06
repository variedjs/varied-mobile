## @varied/cli

脚手架命令行工具

### 方法一：全局安装

```bash
npm install @varied/cli -g
```

### 方法二：全局安装---淘宝镜像（一次性）

```bash
npm --registry https://registry.npm.taobao.org install @varied/cli -g
```

### template-name 类型

| 类型           | 说明                                                                                                                                                        |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| webpack-simple | 一个简单的 Webpack + vue-loader 安装程序，可快速进行原型制作                                                                                                |
| webpack        | 功能齐全的 Webpack + vue-loader 设置，具有热重载，整理和 CSS 提取功能；可选择 mobile 或 pc 模板；可选择安装组件库；可选择 安装 vuex；可选择 使用 Typescript |
| webpack-mui    | 功能齐全的 Webpack + vue-loader + Mui 设置，具有热重载，整理和 CSS 提取功能；可选择 mobile 和 pc 模板；可选择加载组件库；可选择 vuex                        |

### 使用

```bash
varied init <template-name> <project-name>
# 示例：
varied init webpack myproject
```
