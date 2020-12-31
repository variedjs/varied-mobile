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
import { Button } from "@varied/mobile";
```

> 提示：如果你在使用 TypeScript，可以使用 [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) 实现按需引入。

```js
const tsImportPluginFactory = require("ts-import-plugin");

{
  test: /\.tsx?$/,
    loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
      appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true,
        getCustomTransformers: () => ({
        before: [
          tsImportPluginFactory({
            libraryName: '@varied/mobile',
            libraryDirectory: 'es',
            style: true,
          }),
        ],
      }),
        compilerOptions: {
        module: 'es2015',
      },
    },
}
```

### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件

```js
import Button from "@varied/mobile/lib/button";
import "@varied/mobile/lib/button/style";
```

### 方式三. 导入所有组件

Vant 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法

```js
import Vue from "vue";
import VariedMobile from "@varied/mobile";
import "@varied/mobile/lib/index.less";

Vue.use(VariedMobile);
```

> 注意：配置 babel-plugin-import 插件后，将不允许以这种方式导入组件

## 进阶用法

### Rem 适配

@varied/mobile 中的样式默认使用`px`作为单位，如果需要使用`rem`单位，推荐使用以下两个工具：

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 postcss 插件，用于将单位转化为 rem
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

#### PostCSS 配置

下面提供了一份基本的 postcss 配置，可以在此配置的基础上根据项目需求进行修改

```js
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ["Android >= 4.0", "iOS >= 8"]
    },
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"]
    }
  }
};
```

> 在配置 postcss-loader 时，应避免 ignore node_modules 目录，否则将导致 @varied/mobile 样式无法被编译

### 底部安全区适配

iPhone X 等机型底部存在底部指示条，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。@varied/mobile 中部分组件提供了`safe-area-inset-bottom`属性，设置该属性后，即可在对应的机型上开启适配，如下示例：

```html
<!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>

<!-- 开启 safe-area-inset-bottom 属性 -->
<vm-safe-keyboard safe-area-inset-bottom />
```

<img src="https://wuner.gitee.io/static-resources/varied-mobile/static/safearea.png">

### 组件实例方法

@varied/mobile 中的许多组件提供了实例方法，调用实例方法时，我们需要通过 [ref](https://cn.vuejs.org/v2/api/#ref) 来注册组件引用信息，引用信息将会注册在父组件的`$refs`对象上。注册完成后，我们可以通过`this.$refs.xxx`访问到对应的组件实例，并调用上面的实例方法。

```html
<!-- 将该组件绑定到 this.$refs.checkbox 上 -->
<vm-checkbox v-model="checked" ref="checkbox">
  复选框
</vm-checkbox>
```

```js
export default {
  data() {
    return {
      checked: false
    };
  },
  // 注意：组件挂载后才能访问到 ref 对象
  mounted() {
    this.$refs.checkbox.toggle();
  }
};
```
