# 快速上手

### 安装

```bash
  如果你是通过脚手架拉取模板，并且选择了组件安装，就不需要进行以下操作；
  脚手架拉取模板时，会自动帮你引用按需加载模式；
  如股配置了按需加载模式，请不要重复导入所有组件，不然会产生报错；
  如果你想要导入全部组件，请去掉按需加载配置；
```

```bash
# 通过 npm 安装
npm i @varied/mobile -S

# 通过 yarn 安装
yarn add @varied/mobile
```

### 示例工程

- 基于 Simple 搭建单页面应用，配置按需引入组件
- 配置基于 Rem 的适配方案
- 配置基于 Viewport 的适配方案
- 配置基于 TypeScript 的工程
- 配置自定义主题色方案


## 引入组件

### 方式一. 自动按需引入组件 (推荐)

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式

```bash
# 安装插件
npm i babel-plugin-import -D
```

```js
// 在.babelrc 中添加配置
// 注意：webpack 1 无需设置 libraryDirectory
{
  "plugins": [
    ["import", {
      "libraryName": "@varied/mobile",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}

// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
module.exports = {
  plugins: [
    ['import', {
      libraryName: '@varied/mobile',
      libraryDirectory: 'es',
      style: true
    }, '@varied/mobile']
  ]
};
```

```js
// 接着你可以在代码中直接引入 Varied 组件
// 插件会自动将代码转化为方式二中的按需引入形式
import { Button } from '@varied/mobile';
```

### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件

```js
import Button from '@varied/mobile/lib/button';
import '@varied/mobile/lib/button/style';
```

### 方式三. 导入所有组件

Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法

```js
import Vue from 'vue';
import VariedMobile from '@varied/mobile';
import '@varied/mobile/lib/index.css';

Vue.use(VariedMobile);
```

> 注意：配置 babel-plugin-import 插件后，将不允许以这种方式导入组件
