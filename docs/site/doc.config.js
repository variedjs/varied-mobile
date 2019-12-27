import pkgJson from '../../package.json';

const { version } = pkgJson;

export const versions = [version];

export const github = 'https://github.com/variedjs/varied-mobile';

export default {
  header: {
    logo: {
      image: 'http://huangwanneng.cn/static/logo.png',
      title: 'Simple',
      href: '#/'
    },
    nav: {
      lang: {
        text: '中文',
      },
      logoLink: [
        {
          image: 'http://huangwanneng.cn/static/github.svg',
          url: github
        }
      ]
    }
  },
  nav: [
    {
      name: '开发指南',
      groups: [
        {
          list: [
            {
              path: '/intro',
              title: '介绍'
            },
            {
              path: '/cli',
              title: '脚手架'
            },
            {
              path: '/quickstart',
              title: '快速上手'
            },
            {
              path: '/changelog',
              title: '更新日志'
            },
          ]
        }
      ]
    },
    {
      name: '组件',
      showInMobile: true,
      groups: [
        {
          groupName: '基础组件',
          list: [
            {
              path: '/button',
              title: 'Button 按钮'
            },
            {
              path: '/cell',
              title: 'Cell 单元格'
            },
            {
              path: '/col',
              title: 'Layout 布局'
            },
            {
              path: '/icon',
              title: 'Icon 图标'
            },
          ]
        },
        {
          groupName: '反馈组件',
          list: [
            {
              path: '/loading',
              title: 'Loading 等待框'
            },
            {
              path: '/toast',
              title: 'Toast 吐司'
            },
          ]
        },
        {
          groupName: '选择器',
          list: [
            {
              path: '/picker',
              title: 'Picker 选择器'
            },
            {
              path: '/address-picker',
              title: 'AddressPicker 地址选择器'
            },
            // {
            //   path: '/carousel-map',
            //   title: 'CarouselMap 图片切换'
            // },
            {
              path: '/date-picker',
              title: 'DatePicker 日期选择器'
            },
          ]
        },
        {
          groupName: '表单组件',
          list: [
            {
              path: '/field',
              title: 'Field 输入框'
            },
            {
              path: '/search',
              title: 'Search 搜索框'
            },
          ]
        },
        {
          groupName: '展示组件',
          list: [
            {
              path: '/collapse',
              title: 'Collapse 折叠面板'
            },
          ]
        },
        {
          groupName: '导航组件',
          list: [
            {
              path: '/nav-bar',
              title: 'NavBar 导航栏'
            },
          ]
        },
      ]
    }
  ]
};
