import pkgJson from "../../package.json";

const { version } = pkgJson;

export const versions = [version];

export const github = "https://github.com/variedjs/varied-mobile";

export default {
  header: {
    logo: {
      image: "http://huangwanneng.cn/static/logo.png",
      title: "Varied",
      href: "#/"
    },
    nav: {
      lang: {
        text: "中文"
      },
      logoLink: [
        {
          image: "http://huangwanneng.cn/static/github.svg",
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
              path: "/col",
              title: "Layout 布局"
            },
            {
              path: "/icon",
              title: "Icon 图标"
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
              path: "/loading",
              title: "Loading 等待框"
            },
            {
              path: "/toast",
              title: "Toast 吐司"
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
              path: "/switch",
              title: "Switch 开关"
            },
            {
              path: "/stepper",
              title: "Stepper 步进器"
            }
          ]
        },
        {
          groupName: "展示组件",
          list: [
            {
              path: "/collapse",
              title: "Collapse 折叠面板"
            },
            {
              path: "/sticky",
              title: "Sticky 粘性布局"
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
  ]
};
