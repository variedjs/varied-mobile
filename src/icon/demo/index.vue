<template>
  <demo-section>
    <vm-search
      v-model="iconText"
      placeholder="请输入icon名称"
      @input="searchIcon"
    />
    <vm-tabs v-if="iconText.length === 0">
      <vm-tab title="用法示例">
        <demo-block :title="t('basicUsage')">
          <vm-col span="6" @click="copy(demoIcon)">
            <vm-icon :name="demoIcon" />
          </vm-col>
          <vm-col span="6" @click="copy(demoImage)">
            <vm-icon :name="demoImage" />
          </vm-col>
        </demo-block>

        <demo-block :title="t('badge')">
          <vm-col span="6" @click="copy(demoIcon, { dot: true })">
            <vm-icon :name="demoIcon" dot />
          </vm-col>
          <vm-col span="6" @click="copy(demoIcon, { badge: '9' })">
            <vm-icon :name="demoIcon" badge="9" />
          </vm-col>
          <vm-col span="6" @click="copy(demoIcon, { badge: '99+' })">
            <vm-icon :name="demoIcon" badge="99+" />
          </vm-col>
        </demo-block>

        <demo-block :title="t('color')">
          <vm-col span="6" @click="copy('shopping-cart', { color: '#1989fa' })">
            <vm-icon name="shopping-cart" color="#1989fa" />
          </vm-col>
          <vm-col span="6" @click="copy('file-excel-o', { color: '#ee0a24' })">
            <vm-icon name="file-excel-o" :color="'#ee0a24'" />
          </vm-col>
        </demo-block>

        <demo-block :title="t('size')">
          <vm-col span="6" @click="copy(demoIcon, { size: '40' })">
            <vm-icon :name="demoIcon" size="40" />
          </vm-col>
          <vm-col span="6" @click="copy(demoIcon, { size: '3rem' })">
            <vm-icon :name="demoIcon" size="3rem" />
          </vm-col>
        </demo-block>
      </vm-tab>
      <vm-tab
        v-for="(icon, index) in icons"
        :key="`tab${index}`"
        :title="icon.name"
      >
        <vm-col
          v-for="(item, idx) in icon.list"
          :key="idx"
          span="8"
          @click="copy(item)"
        >
          <vm-icon :name="item" color="#888" />
          <span>{{ item }}</span>
        </vm-col>
      </vm-tab>
    </vm-tabs>
    <template v-else>
      <vm-col
        v-for="(item, idx) in searchIconList"
        :key="`searchIcon${idx}`"
        span="6"
      >
        <vm-icon :name="item" color="#888" />
        <span>{{ item }}</span>
      </vm-col>
    </template>
  </demo-section>
</template>

<script>
function copyToClipboard(str) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
export default {
  data() {
    return {
      info: {
        basicUsage: "基础用法",
        title: "图标列表",
        badge: "徽标提示",
        basic: "基础图标",
        copied: "复制成功",
        outline: "线框风格",
        filled: "实底风格",
        demo: "用法示例",
        color: "图标颜色",
        size: "图标大小"
      },
      demoIcon: "commenting",
      demoImage:
        "https://wuner.gitee.io/static-resources/varied-mobile/static/active-tick.svg",
      iconText: "",
      searchIconList: [],
      icons: [
        {
          name: "web程序",
          list: [
            "address-book",
            "address-book-o",
            "address-card",
            "address-card-o",
            "adjust",
            "american-sign-language-interpreting",
            "anchor",
            "archive",
            "area-chart",
            "arrows",
            "arrows-h",
            "arrows-v",
            "asl-interpreting",
            "assistive-listening-systems",
            "asterisk",
            "at",
            "audio-description",
            "automobile",
            "balance-scale",
            "ban",
            "bank",
            "bar-chart",
            "bar-chart-o",
            "barcode",
            "bars",
            "bath",
            "bathtub",
            "battery",
            "battery-0",
            "battery-1",
            "battery-2",
            "battery-3",
            "battery-4",
            "battery-empty",
            "battery-full",
            "battery-half",
            "battery-quarter",
            "battery-three-quarters",
            "bed",
            "beer",
            "bell",
            "bell-o",
            "bell-slash",
            "bell-slash-o",
            "bicycle",
            "binoculars",
            "birthday-cake",
            "blind",
            "bluetooth",
            "bluetooth-b",
            "bolt",
            "bomb",
            "book",
            "bookmark",
            "bookmark-o",
            "braille",
            "briefcase",
            "bug",
            "building",
            "building-o",
            "bullhorn",
            "bullseye",
            "bus",
            "cab",
            "calculator",
            "calendar",
            "calendar-check-o",
            "calendar-minus-o",
            "calendar-o",
            "calendar-plus-o",
            "calendar-times-o",
            "camera",
            "camera-retro",
            "car",
            "caret-square-o-down",
            "caret-square-o-left",
            "caret-square-o-right",
            "caret-square-o-up",
            "cart-arrow-down",
            "cart-plus",
            "cc",
            "certificate",
            "check",
            "check-circle",
            "check-circle-o",
            "check-square",
            "check-square-o",
            "child",
            "circle",
            "circle-o",
            "circle-o-notch",
            "circle-thin",
            "clock-o",
            "clone",
            "close",
            "cloud",
            "cloud-download",
            "cloud-upload",
            "code",
            "code-fork",
            "coffee",
            "cog",
            "cogs",
            "comment",
            "comment-o",
            "commenting",
            "commenting-o",
            "comments",
            "comments-o",
            "compass",
            "copyright",
            "creative-commons",
            "credit-card",
            "credit-card-alt",
            "crop",
            "crosshairs",
            "cube",
            "cubes",
            "cutlery",
            "dashboard",
            "database",
            "deaf",
            "deafness",
            "desktop",
            "diamond",
            "dot-circle-o",
            "download",
            "drivers-license",
            "drivers-license-o",
            "edit",
            "ellipsis-h",
            "ellipsis-v",
            "envelope",
            "envelope-o",
            "envelope-open",
            "envelope-open-o",
            "envelope-square",
            "eraser",
            "exchange",
            "exclamation",
            "exclamation-circle",
            "exclamation-triangle",
            "external-link",
            "external-link-square",
            "eye",
            "eye-slash",
            "eyedropper",
            "fax",
            "feed",
            "female",
            "fighter-jet",
            "file-archive-o",
            "file-audio-o",
            "file-code-o",
            "file-excel-o",
            "file-image-o",
            "file-movie-o",
            "file-pdf-o",
            "file-photo-o",
            "file-picture-o",
            "file-powerpoint-o",
            "file-sound-o",
            "file-video-o",
            "file-word-o",
            "file-zip-o",
            "film",
            "filter",
            "fire",
            "fire-extinguisher",
            "flag",
            "flag-checkered",
            "flag-o",
            "flash",
            "flask",
            "folder",
            "folder-o",
            "folder-open",
            "folder-open-o",
            "frown-o",
            "futbol-o",
            "gamepad",
            "gavel",
            "gear",
            "gears",
            "gift",
            "glass",
            "globe",
            "graduation-cap",
            "group",
            "hand-grab-o",
            "hand-lizard-o",
            "hand-paper-o",
            "hand-peace-o",
            "hand-pointer-o",
            "hand-rock-o",
            "hand-scissors-o",
            "hand-spock-o",
            "hand-stop-o",
            "handshake-o",
            "hard-of-hearing",
            "hashtag",
            "hdd-o",
            "headphones",
            "heart",
            "heart-o",
            "heartbeat",
            "history",
            "home",
            "hotel",
            "hourglass",
            "hourglass-1",
            "hourglass-2",
            "hourglass-3",
            "hourglass-end",
            "hourglass-half",
            "hourglass-o",
            "hourglass-start",
            "i-cursor",
            "id-badge",
            "id-card",
            "id-card-o",
            "image",
            "inbox",
            "industry",
            "info",
            "info-circle",
            "institution",
            "key",
            "keyboard-o",
            "language",
            "laptop",
            "leaf",
            "legal",
            "lemon-o",
            "level-down",
            "level-up",
            "life-bouy",
            "life-buoy",
            "life-ring",
            "life-saver",
            "lightbulb-o",
            "line-chart",
            "location-arrow",
            "lock",
            "low-vision",
            "magic",
            "magnet",
            "mail-forward",
            "mail-reply",
            "mail-reply-all",
            "male",
            "map",
            "map-marker",
            "map-o",
            "map-pin",
            "map-signs",
            "meh-o",
            "microchip",
            "microphone",
            "microphone-slash",
            "minus",
            "minus-circle",
            "minus-square",
            "minus-square-o",
            "mobile",
            "mobile-phone",
            "money",
            "moon-o",
            "mortar-board",
            "motorcycle",
            "mouse-pointer",
            "music",
            "navicon",
            "newspaper-o",
            "object-group",
            "object-ungroup",
            "paint-brush",
            "paper-plane",
            "paper-plane-o",
            "paw",
            "pencil",
            "pencil-square",
            "pencil-square-o",
            "percent",
            "phone",
            "phone-square",
            "photo",
            "picture-o",
            "pie-chart",
            "plane",
            "plug",
            "plus",
            "plus-circle",
            "plus-square",
            "plus-square-o",
            "podcast",
            "power-off",
            "print",
            "puzzle-piece",
            "qrcode",
            "question",
            "question-circle",
            "question-circle-o",
            "quote-left",
            "quote-right",
            "random",
            "recycle",
            "refresh",
            "registered",
            "remove",
            "reorder",
            "reply",
            "reply-all",
            "retweet",
            "road",
            "rocket",
            "rss",
            "rss-square",
            "s15",
            "search",
            "search-minus",
            "search-plus",
            "send",
            "send-o",
            "server",
            "share",
            "share-alt",
            "share-alt-square",
            "share-square",
            "share-square-o",
            "shield",
            "ship",
            "shopping-bag",
            "shopping-basket",
            "shopping-cart",
            "shower",
            "sign-in",
            "sign-language",
            "sign-out",
            "signal",
            "signing",
            "sitemap",
            "sliders",
            "smile-o",
            "snowflake-o",
            "soccer-ball-o",
            "sort",
            "sort-alpha-asc",
            "sort-alpha-desc",
            "sort-amount-asc",
            "sort-amount-desc",
            "sort-asc",
            "sort-desc",
            "sort-down",
            "sort-numeric-asc",
            "sort-numeric-desc",
            "sort-up",
            "space-shuttle",
            "spinner",
            "spoon",
            "square",
            "square-o",
            "star",
            "star-half",
            "star-half-empty",
            "star-half-full",
            "star-half-o",
            "star-o",
            "sticky-note",
            "sticky-note-o",
            "street-view",
            "suitcase",
            "sun-o",
            "support",
            "tablet",
            "tachometer",
            "tag",
            "tags",
            "tasks",
            "taxi",
            "television",
            "terminal",
            "thermometer",
            "thermometer-0",
            "thermometer-1",
            "thermometer-2",
            "thermometer-3",
            "thermometer-4",
            "thermometer-empty",
            "thermometer-full",
            "thermometer-half",
            "thermometer-quarter",
            "thermometer-three-quarters",
            "thumb-tack",
            "thumbs-down",
            "thumbs-o-down",
            "thumbs-o-up",
            "thumbs-up",
            "ticket",
            "times",
            "times-circle",
            "times-circle-o",
            "times-rectangle",
            "times-rectangle-o",
            "tint",
            "toggle-down",
            "toggle-left",
            "toggle-off",
            "toggle-on",
            "toggle-right",
            "toggle-up",
            "trademark",
            "trash",
            "trash-o",
            "tree",
            "trophy",
            "truck",
            "tty",
            "tv",
            "umbrella",
            "universal-access",
            "university",
            "unlock",
            "unlock-alt",
            "unsorted",
            "upload",
            "user",
            "user-circle",
            "user-circle-o",
            "user-o",
            "user-plus",
            "user-secret",
            "user-times",
            "users",
            "vcard",
            "vcard-o",
            "video-camera",
            "volume-control-phone",
            "volume-down",
            "volume-off",
            "volume-up",
            "warning",
            "wheelchair",
            "wheelchair-alt",
            "wifi",
            "window-close",
            "window-close-o",
            "window-maximize",
            "window-minimize",
            "window-restore",
            "wrench"
          ]
        },
        {
          name: "辅助功能",
          list: [
            "american-sign-language-interpreting",
            "asl-interpreting",
            "assistive-listening-systems",
            "audio-description",
            "blind",
            "braille",
            "cc",
            "deaf",
            "deafness",
            "hard-of-hearing",
            "low-vision",
            "question-circle-o",
            "sign-language",
            "signing",
            "tty",
            "universal-access",
            "volume-control-phone",
            "wheelchair",
            "wheelchair-alt"
          ]
        },
        {
          name: "手形图标",
          list: [
            "hand-grab-o",
            "hand-lizard-o",
            "hand-o-down",
            "hand-o-left",
            "hand-o-right",
            "hand-o-up",
            "hand-paper-o",
            "hand-peace-o",
            "hand-pointer-o",
            "hand-rock-o",
            "hand-scissors-o",
            "hand-spock-o",
            "hand-stop-o",
            "thumbs-down",
            "thumbs-o-down",
            "thumbs-o-up",
            "thumbs-up"
          ]
        },
        {
          name: "交通图标",
          list: [
            "ambulance",
            "automobile",
            "bicycle",
            "bus",
            "cab",
            "car",
            "fighter-jet",
            "motorcycle",
            "plane",
            "rocket",
            "ship",
            "space-shuttle",
            "subway",
            "taxi",
            "train",
            "truck",
            "wheelchair",
            "wheelchair-alt"
          ]
        },
        {
          name: "性别图标",
          list: [
            "genderless",
            "intersex",
            "mars",
            "mars-double",
            "mars-stroke",
            "mars-stroke-h",
            "mars-stroke-v",
            "mercury",
            "neuter",
            "transgender",
            "transgender-alt",
            "venus",
            "venus-double",
            "venus-mars"
          ]
        },
        {
          name: "文件类型",
          list: [
            "file",
            "file-archive-o",
            "file-audio-o",
            "file-code-o",
            "file-excel-o",
            "file-image-o",
            "file-movie-o",
            "file-o",
            "file-pdf-o",
            "file-photo-o",
            "file-picture-o",
            "file-powerpoint-o",
            "file-sound-o",
            "file-text",
            "file-text-o",
            "file-video-o",
            "file-word-o",
            "file-zip-o"
          ]
        },
        {
          name: "等待图标",
          list: ["circle-o-notch", "cog", "gear", "refresh", "spinner"]
        },
        {
          name: "表单图标",
          list: [
            "check-square",
            "check-square-o",
            "circle",
            "circle-o",
            "dot-circle-o",
            "minus-square",
            "minus-square-o",
            "plus-square",
            "plus-square-o",
            "square",
            "square-o"
          ]
        },
        {
          name: "付款图标",
          list: [
            "cc-amex",
            "cc-diners-club",
            "cc-discover",
            "cc-jcb",
            "cc-mastercard",
            "cc-paypal",
            "cc-stripe",
            "cc-visa",
            "credit-card",
            "credit-card-alt",
            "google-wallet",
            "paypal"
          ]
        },
        {
          name: "图表图标",
          list: [
            "area-chart",
            "bar-chart",
            "bar-chart-o",
            "line-chart",
            "pie-chart"
          ]
        },
        {
          name: "货币图标",
          list: [
            "bitcoin",
            "btc",
            "cny",
            "dollar",
            "eur",
            "euro",
            "gbp",
            "gg",
            "gg-circle",
            "ils",
            "inr",
            "jpy",
            "krw",
            "money",
            "rmb",
            "rouble",
            "rub",
            "ruble",
            "rupee",
            "shekel",
            "sheqel",
            "try",
            "turkish-lira",
            "usd",
            "won",
            "yen"
          ]
        },
        {
          name: "文字编辑器",
          list: [
            "align-center",
            "align-justify",
            "align-left",
            "align-right",
            "bold",
            "chain",
            "chain-broken",
            "clipboard",
            "columns",
            "copy",
            "cut",
            "dedent",
            "eraser",
            "file",
            "file-o",
            "file-text",
            "file-text-o",
            "files-o",
            "floppy-o",
            "font",
            "header",
            "indent",
            "italic",
            "link",
            "list",
            "list-alt",
            "list-ol",
            "list-ul",
            "outdent",
            "paperclip",
            "paragraph",
            "paste",
            "repeat",
            "rotate-left",
            "rotate-right",
            "save",
            "scissors",
            "strikethrough",
            "subscript",
            "superscript",
            "table",
            "text-height",
            "text-width",
            "th",
            "th-large",
            "th-list",
            "underline",
            "undo",
            "unlink"
          ]
        },
        {
          name: "方向图标",
          list: [
            "angle-double-down",
            "angle-double-left",
            "angle-double-right",
            "angle-double-up",
            "angle-down",
            "angle-left",
            "angle-right",
            "angle-up",
            "arrow-circle-down",
            "arrow-circle-left",
            "arrow-circle-o-down",
            "arrow-circle-o-left",
            "arrow-circle-o-right",
            "arrow-circle-o-up",
            "arrow-circle-right",
            "arrow-circle-up",
            "arrow-down",
            "arrow-left",
            "arrow-right",
            "arrow-up",
            "arrows",
            "arrows-alt",
            "arrows-h",
            "arrows-v",
            "caret-down",
            "caret-left",
            "caret-right",
            "caret-square-o-down",
            "caret-square-o-left",
            "caret-square-o-right",
            "caret-square-o-up",
            "caret-up",
            "chevron-circle-down",
            "chevron-circle-left",
            "chevron-circle-right",
            "chevron-circle-up",
            "chevron-down",
            "chevron-left",
            "chevron-right",
            "chevron-up",
            "exchange",
            "hand-o-down",
            "hand-o-left",
            "hand-o-right",
            "hand-o-up",
            "long-arrow-down",
            "long-arrow-left",
            "long-arrow-right",
            "long-arrow-up",
            "toggle-down",
            "toggle-left",
            "toggle-right",
            "toggle-up"
          ]
        },
        {
          name: "视频播放器",
          list: [
            "arrows-alt",
            "backward",
            "compress",
            "eject",
            "expand",
            "fast-backward",
            "fast-forward",
            "forward",
            "pause",
            "pause-circle",
            "pause-circle-o",
            "play",
            "play-circle",
            "play-circle-o",
            "random",
            "step-backward",
            "step-forward",
            "stop",
            "stop-circle",
            "stop-circle-o",
            "youtube-play"
          ]
        },
        {
          name: "品牌图标",
          list: [
            "500px",
            "adn",
            "amazon",
            "android",
            "angellist",
            "apple",
            "bandcamp",
            "behance",
            "behance-square",
            "bitbucket",
            "bitbucket-square",
            "bitcoin",
            "black-tie",
            "bluetooth",
            "bluetooth-b",
            "btc",
            "buysellads",
            "cc-amex",
            "cc-diners-club",
            "cc-discover",
            "cc-jcb",
            "cc-mastercard",
            "cc-paypal",
            "cc-stripe",
            "cc-visa",
            "chrome",
            "codepen",
            "codiepie",
            "connectdevelop",
            "contao",
            "css3",
            "dashcube",
            "delicious",
            "deviantart",
            "digg",
            "dribbble",
            "dropbox",
            "drupal",
            "edge",
            "eercast",
            "empire",
            "envira",
            "etsy",
            "expeditedssl",
            "fa",
            "facebook",
            "facebook-f",
            "facebook-official",
            "facebook-square",
            "firefox",
            "first-order",
            "flickr",
            "font-awesome",
            "fonticons",
            "fort-awesome",
            "forumbee",
            "foursquare",
            "free-code-camp",
            "ge",
            "get-pocket",
            "gg",
            "gg-circle",
            "git",
            "git-square",
            "github",
            "github-alt",
            "github-square",
            "gitlab",
            "gittip",
            "glide",
            "glide-g",
            "google",
            "google-plus",
            "google-plus-circle",
            "google-plus-official",
            "google-plus-square",
            "google-wallet",
            "gratipay",
            "grav",
            "hacker-news",
            "houzz",
            "html5",
            "imdb",
            "instagram",
            "internet-explorer",
            "ioxhost",
            "joomla",
            "jsfiddle",
            "lastfm",
            "lastfm-square",
            "leanpub",
            "linkedin",
            "linkedin-square",
            "linode",
            "linux",
            "maxcdn",
            "meanpath",
            "medium",
            "meetup",
            "mixcloud",
            "modx",
            "odnoklassniki",
            "odnoklassniki-square",
            "opencart",
            "openid",
            "opera",
            "optin-monster",
            "pagelines",
            "paypal",
            "pied-piper",
            "pied-piper-alt",
            "pied-piper-pp",
            "pinterest",
            "pinterest-p",
            "pinterest-square",
            "product-hunt",
            "qq",
            "quora",
            "ra",
            "ravelry",
            "rebel",
            "reddit",
            "reddit-alien",
            "reddit-square",
            "renren",
            "resistance",
            "safari",
            "scribd",
            "sellsy",
            "share-alt",
            "share-alt-square",
            "shirtsinbulk",
            "simplybuilt",
            "skyatlas",
            "skype",
            "slack",
            "slideshare",
            "snapchat",
            "snapchat-ghost",
            "snapchat-square",
            "soundcloud",
            "spotify",
            "stack-exchange",
            "stack-overflow",
            "steam",
            "steam-square",
            "stumbleupon",
            "stumbleupon-circle",
            "superpowers",
            "telegram",
            "tencent-weibo",
            "themeisle",
            "trello",
            "tripadvisor",
            "tumblr",
            "tumblr-square",
            "twitch",
            "twitter",
            "twitter-square",
            "usb",
            "viacoin",
            "viadeo",
            "viadeo-square",
            "vimeo",
            "vimeo-square",
            "vine",
            "vk",
            "wechat",
            "weibo",
            "weixin",
            "whatsapp",
            "wikipedia-w",
            "windows",
            "wordpress",
            "wpbeginner",
            "wpexplorer",
            "wpforms",
            "xing",
            "xing-square",
            "y-combinator",
            "y-combinator-square",
            "yahoo",
            "yc",
            "yc-square",
            "yelp",
            "yoast",
            "youtube",
            "youtube-play",
            "youtube-square"
          ]
        },
        {
          name: "医疗图标",
          list: [
            "ambulance",
            "h-square",
            "heart",
            "heart-o",
            "heartbeat",
            "hospital-o",
            "medkit",
            "plus-square",
            "stethoscope",
            "user-md",
            "wheelchair",
            "wheelchair-alt"
          ]
        }
      ]
    };
  },
  methods: {
    copy(icon, option = {}) {
      let tag = `<vm-icon name="${icon}"`;
      if ("dot" in option) {
        tag = `${tag} ${option.dot ? "dot" : ""}`;
      }
      if ("badge" in option) {
        tag = `${tag} badge="${option.badge}"`;
      }
      if ("color" in option) {
        tag = `${tag} color="${option.color}"`;
      }
      if ("size" in option) {
        tag = `${tag} size="${option.size}"`;
      }
      tag = `${tag} />`;
      copyToClipboard(tag);

      this.$notify({
        type: "success",
        duration: 1500,
        className: "demo-icon-notify",
        message: `${this.t("copied")}：${tag}`
      });
    },
    t(name) {
      return this.info[name];
    },
    searchIcon(icon) {
      this.searchIconList = [];
      if (typeof icon.toLowerCase === "function") {
        const key = icon.toLowerCase();
        this.icons.forEach(value => {
          value.list.forEach(val => {
            const b = val.toLowerCase();
            if (b.indexOf(key) !== -1) {
              this.searchIconList.push(val);
            }
          });
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixins/hairline.less";

.demo-icon {
  font-size: 0;

  &-list {
    box-sizing: border-box;
    min-height: calc(100vh - 65px);
    padding-top: 10px;
  }

  &-notify {
    font-size: 13px;
  }

  .vm-col {
    display: inline-block;
    float: none;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    span {
      display: block;
      height: 36px;
      margin: -4px 0 4px;
      padding: 0 5px;
      color: @gray-7;
      font-size: 12px;
      line-height: 18px;
    }

    &:active {
      background-color: @active-color;
    }

    .vm-icon {
      margin: 16px 0 16px;
      color: @text-color;
      font-size: 32px;
    }
  }
  .vm-tab-pane {
    width: auto;
    margin: 20px;
    background-color: #fff;
    border-radius: 12px;
  }
}
</style>
