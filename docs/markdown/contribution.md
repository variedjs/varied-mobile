# 开发指南

### 初始化项目

```bash
git clone git@github.com:youzan/Simple.git

cd Simple

# 安装依赖
npm run bootstrap

# 本地开发模式
npm run dev
```

浏览器访问 [http://localhost:8080](http://localhost:8080) 就可以看到所有组件的示例了。

### 目录结构

- 仓库的组件代码位于 src 下，每个组件一个文件夹
- docs 目录下是文档网站的代码，本地开发时可以在目录下运行 npm run dev 开启文档网站

项目目录大致如下：

```
Simple
├─ build     # 构建
├─ docs      # 文档
├─ src       # 组件
├─ packages  # 子包
├─ test      # 单测
└─ types     # 类型
```

### 添加新组件

添加新组件时，请按照下面的目录结构组织文件，并在 `docs/site/doc.config.js` 中配置组件名称

```
src
|- button
|  ├─ demo             # 示例代码
|  ├─ test             # 单元测试
|  ├─ index.js         # 组件入口
|  ├─ index.less       # 组件样式
|  ├─ README.md        # 英文文档
|  └─ README.zh-CN.md  # 中文文档
|
├─ index.js            # 所有组件入口
└─ index.less          # 所有组件样式
```
