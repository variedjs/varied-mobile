# 更新日志

## V0.1.0

### 新增组件

> Circle 环形进度条

> CountDown 倒计时

> Divider 分割线

> Empty 空状态

> NoticeBar 通知栏

> Popover 气泡弹出框

### 优化

> Icon 图标新增属性
>
> - dot(是否显示图标右上角小红点)
> - badge(图标右上角徽标的内容)
> - tag(HTML 标签)

> Layout 布局新增事件绑定

> Popup 重构

### 修复

> Tab 组件样式异常修复

> Button 组件 loading-text 属性不起作用问题

## V0.0.9

### 新增组件

> ActionSheet 动作面板

> DropdownMenu 下拉菜单

> Notify 消息提示

> ShareSheet 分享面板

> SwipeCell 滑动单元格

> Badge 徽标

> Tag 标签

### 修复

> 修复打包时，index.css 文件引入字体图标路径不对 bug

### 优化

> 优化公共样式，替换浏览器自带样式

> Popup 弹出层新增事件、属性
>
> - open(打开弹出层时触发)
> - close(关闭弹出层时触发)
> - opened(打开弹出层且动画结束后触发)
> - closed(关闭弹出层且动画结束后触发)
> - duration(动画时长，单位秒)

## V0.0.8

### 新增

> Calendar 日历组件

> PullRefresh 下拉刷新组件

> List 列表组件

> Swipe 轮播组件

> ImagePreview 图片预览组件

> Overlay 遮罩层组件

> Uploader 文件上传组件

### 优化

> Popup 弹出层 新增属性
>
> - round(是否显示圆角)
> - closeable(是否显示关闭图标)
> - close-icon(关闭图标名称或图片链接)
> - close-icon-position(关闭图标位置)

> Loading 加载组件新增 vertical、textSize 属性和新增默认插槽

> 优化 Tabbar 标签栏组件

> Button 按钮组件新增属性
>
> - color(按钮字体颜色)
> - background(按钮背景颜色)
> - icon-position(图标展示位置)
> - icon(图标名称或图片链接)

## v0.0.7

### 新增功能

> Image：图片

> LazyLoad：懒加载

## v0.0.6

### 新增功能

> Stepper：步进器

> Dialog：弹窗

> Sticky：粘性布局

> Switch：开关组件

> Tab：标签页

> DataProcess：数据加解密

> Slider：滑块组件

### 优化

> Button：按钮组件新增 width 宽度、height 高度、long-press 长按事件是否开启、long-press-time 长按时间属性和 longPres 长按事件监听

### bug 修复

> Icon：修复 size 传 number 类型时不生效 bug

## v0.0.5

### 新增功能

> Checkbox：复选框组件

> PasswordInput：密码/验证码输入框组件

> Radio：单选框组件

> Rate：评分组件

## v0.0.41

### bug 修复

> SafeKeyboard：修复英文键盘和英文数字键盘，切数字键盘时，不显示完成按钮 bug

## v0.0.4

### 新增功能

> SafeKeyboard：安全键盘

## v0.0.3

### 新增功能

> Tabbar：标签栏组件

> Popup：弹出层组件

### 优化

> NavBar：新增 backgroundColor 背景颜色、color 字体颜色；优化 fixed，固定在顶部时，在标签位置生成一个等高的占位元素

### bug 修复

> AddressPicker：修复滑动地址列表时，底部也会同时滑动 bug
