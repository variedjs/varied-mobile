# 自定义主题

### 介绍
varied 提供了一套默认主题，CSS 命名采用 BEM 的风格，方便使用者覆盖样式。如果你想完全替换主题色或者其他样式，下面我们提供了两个方法。

### 配置文件下载修改
varied 使用了 Less 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。
下面是一些基本的样式变量，所有可用的颜色变量请参考[配置文件](https://github.com/variedjs/varied-mobile/blob/master/src/style/theme.less)。
```css
// Default colors
@text-color: #323233;
@border-color: #e0e0e0;
@active-color: #e8e8e8;
@background-color: #f8f8f8;
@background-color-light: #fafafa;
```

### 在线主题编辑
使用 [在线配置主题](#/onlineConfig)，可以修改定制 varied 所有全局和组件的样式，并可以方便地实时预览样式改变后的视觉。同时它还可以基于新的定制样式生成完整的样式文件包，供直接下载使用。

### 定制方法
使用 Less 提供的 modifyVars 即可对变量进行修改，下面是参考的 webpack 配置。

```js
module.exports = {
  rules: [
    {
      test: /\.less$/,
      use: [
        // ...其他 loader 配置
        {
          loader: 'less-loader',
          options: {
            modifyVars: {
              // 直接覆盖变量
              'text-color': '#111',
              'border-color': '#eee'
              // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
              'hack': `true; @import "your-less-file-path.less";`
            }
          }
        }
      ]
    }
  ]
};
```
