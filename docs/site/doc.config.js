import pkgJson from "../../package.json";

const { version } = pkgJson;

export const versions = [version];

export const github = "https://github.com/variedjs/varied-mobile";

export default {
  header: {
    logo: {
      image:
        "https://wuner.gitee.io/static-resources/varied-mobile/static/logo.png",
      title: "Varied",
      href: "#/"
    },
    nav: {
      lang: {
        text: "中文"
      },
      logoLink: [
        {
          image:
            "https://wuner.gitee.io/static-resources/varied-mobile/static/github.svg",
          url: github
        }
      ]
    }
  },
  nav: [
    {
      name: "开发指南",
      groups: [
        {
          list: [
            {
              path: "/intro",
              title: "介绍"
            },
            {
              path: "/cli",
              title: "脚手架"
            },
            {
              path: "/quickstart",
              title: "快速上手"
            },
            {
              path: "/theme",
              title: "自定义主题"
            },
            {
              path: "/onlineConfig",
              title: "在线配置主题"
            },
            {
              path: "/changelog",
              title: "更新日志"
            }
          ]
        }
      ]
    },
    {
      name: "组件",
      showInMobile: true,
      groups: [
        {
          groupName: "基础组件",
          list: [
            {
              path: "/button",
              title: "Button 按钮"
            },
            {
              path: "/cell",
              title: "Cell 单元格"
            },
            {
              path: "/icon",
              title: "Icon 图标"
            },
            {
              path: "/image",
              title: "Image 图片"
            },
            {
              path: "/col",
              title: "Layout 布局"
            },
            {
              path: "/popup",
              title: "Popup 弹出层"
            }
          ]
        },
        {
          groupName: "反馈组件",
          list: [
            {
              path: "/action-sheet",
              title: "ActionSheet 动作面板"
            },
            {
              path: "/dialog",
              title: "Dialog 弹出框"
            },
            {
              path: "/dropdown-menu",
              title: "DropdownMenu 下拉菜单"
            },
            {
              path: "/loading",
              title: "Loading 加载"
            },
            {
              path: "/notify",
              title: "Notify 消息提示"
            },
            {
              path: "/overlay",
              title: "Overlay 遮罩层"
            },
            {
              path: "/pull-refresh",
              title: "PullRefresh 下拉刷新"
            },
            {
              path: "/toast",
              title: "Toast 吐司"
            },
            {
              path: "/share-sheet",
              title: "ShareSheet 分享面板"
            },
            {
              path: "/swipe-cell",
              title: "SwipeCell 滑动单元格"
            }
          ]
        },
        {
          groupName: "选择器",
          list: [
            {
              path: "/picker",
              title: "Picker 选择器"
            },
            {
              path: "/address-picker",
              title: "AddressPicker 地址选择器"
            },
            // {
            //   path: '/carousel-map',
            //   title: 'CarouselMap 图片切换'
            // },
            {
              path: "/date-picker",
              title: "DatePicker 日期选择器"
            }
          ]
        },
        {
          groupName: "表单组件",
          list: [
            {
              path: "/calendar",
              title: "Calendar 日历"
            },
            {
              path: "/checkbox",
              title: "Checkbox 复选框"
            },
            {
              path: "/data-process",
              title: "DataProcess 数据加解密"
            },
            {
              path: "/field",
              title: "Field 输入框"
            },
            {
              path: "/password-input",
              title: "PasswordInput 密码输入框"
            },
            {
              path: "/radio",
              title: "Radio 单选框"
            },
            {
              path: "/rate",
              title: "Rate 评分"
            },
            {
              path: "/safe-keyboard",
              title: "SafeKeyboard 安全键盘"
            },
            {
              path: "/search",
              title: "Search 搜索框"
            },
            {
              path: "/slider",
              title: "Slider 滑块"
            },
            {
              path: "/stepper",
              title: "Stepper 步进器"
            },
            {
              path: "/switch",
              title: "Switch 开关"
            },
            {
              path: "/uploader",
              title: "Uploader 文件上传"
            }
          ]
        },
        {
          groupName: "展示组件",
          list: [
            {
              path: "/badge",
              title: "Badge 徽标"
            },
            {
              path: "/circle",
              title: "Circle 环形进度条"
            },
            {
              path: "/collapse",
              title: "Collapse 折叠面板"
            },
            {
              path: "/count-down",
              title: "CountDown 倒计时"
            },
            {
              path: "/divider",
              title: "Divider 分割线"
            },
            {
              path: "/empty",
              title: "Empty 空状态"
            },
            {
              path: "/image-preview",
              title: "ImagePreview 图片预览"
            },
            {
              path: "/lazy-load",
              title: "LazyLoad 懒加载"
            },
            {
              path: "/list",
              title: "List 列表"
            },
            {
              path: "/notice-bar",
              title: "NoticeBar 通知栏"
            },
            {
              path: "/popover",
              title: "Popover 气泡弹出框"
            },
            {
              path: "/sticky",
              title: "Sticky 粘性布局"
            },
            {
              path: "/swipe",
              title: "Swipe 轮播"
            },
            {
              path: "/tag",
              title: "Tag 标签"
            }
          ]
        },
        {
          groupName: "导航组件",
          list: [
            {
              path: "/nav-bar",
              title: "NavBar 导航栏"
            },
            {
              path: "/tab",
              title: "Tab 标签页"
            },
            {
              path: "/tabbar",
              title: "Tabbar 标签栏"
            }
          ]
        }
      ]
    }
  ],
  markdown: { lineNumbers: true, extractHeaders: ["h2", "h3", "h4"] }
};
