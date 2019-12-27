# @varied/cli

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
| 类型 | 说明 |
|------|------|
| webpack-simple | 一个简单的Webpack + vue-loader安装程序，可快速进行原型制作 |
| webpack | 功能齐全的Webpack + vue-loader设置，具有热重载，整理和CSS提取功能；可选择mobile和pc模板；可选择加载组件库 |

### 使用
```bash
varied init <template-name> <project-name>
示例：
varied init webpack myproject
```
