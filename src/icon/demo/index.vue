<template>
  <demo-section>
    <vm-search
      v-model="icon"
      placeholder="请输入icon名称"
      @input="searchIcon"
    />
    <vm-col v-for="(icon, idx) in icons" :key="idx" span="8" v-if="icon.isShow">
      <vm-icon :name="icon.name" color="#888" />
      <span>{{ icon.name }}</span>
    </vm-col>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
      icon: "",
      icons: [
        {
          isShow: true,
          name: "address-book"
        },
        {
          isShow: true,
          name: "address-book-o"
        },
        {
          isShow: true,
          name: "address-card"
        },
        {
          isShow: true,
          name: "address-card-o"
        },
        {
          isShow: true,
          name: "adjust"
        },
        {
          isShow: true,
          name: "american-sign-language-interpreting"
        },
        {
          isShow: true,
          name: "anchor"
        },
        {
          isShow: true,
          name: "archive"
        },
        {
          isShow: true,
          name: "area-chart"
        },
        {
          isShow: true,
          name: "arrows"
        },
        {
          isShow: true,
          name: "arrows-h"
        },
        {
          isShow: true,
          name: "arrows-v"
        },
        {
          isShow: true,
          name: "asl-interpreting"
        },
        {
          isShow: true,
          name: "assistive-listening-systems"
        },
        {
          isShow: true,
          name: "asterisk"
        },
        {
          isShow: true,
          name: "at"
        },
        {
          isShow: true,
          name: "audio-description"
        },
        {
          isShow: true,
          name: "automobile"
        },
        {
          isShow: true,
          name: "balance-scale"
        },
        {
          isShow: true,
          name: "ban"
        },
        {
          isShow: true,
          name: "bank"
        },
        {
          isShow: true,
          name: "bar-chart"
        },
        {
          isShow: true,
          name: "bar-chart-o"
        },
        {
          isShow: true,
          name: "barcode"
        },
        {
          isShow: true,
          name: "bars"
        },
        {
          isShow: true,
          name: "bath"
        },
        {
          isShow: true,
          name: "bathtub"
        },
        {
          isShow: true,
          name: "battery"
        },
        {
          isShow: true,
          name: "battery-0"
        },
        {
          isShow: true,
          name: "battery-1"
        },
        {
          isShow: true,
          name: "battery-2"
        },
        {
          isShow: true,
          name: "battery-3"
        },
        {
          isShow: true,
          name: "battery-4"
        },
        {
          isShow: true,
          name: "battery-empty"
        },
        {
          isShow: true,
          name: "battery-full"
        },
        {
          isShow: true,
          name: "battery-half"
        },
        {
          isShow: true,
          name: "battery-quarter"
        },
        {
          isShow: true,
          name: "battery-three-quarters"
        },
        {
          isShow: true,
          name: "bed"
        },
        {
          isShow: true,
          name: "beer"
        },
        {
          isShow: true,
          name: "bell"
        },
        {
          isShow: true,
          name: "bell-o"
        },
        {
          isShow: true,
          name: "bell-slash"
        },
        {
          isShow: true,
          name: "bell-slash-o"
        },
        {
          isShow: true,
          name: "bicycle"
        },
        {
          isShow: true,
          name: "binoculars"
        },
        {
          isShow: true,
          name: "birthday-cake"
        },
        {
          isShow: true,
          name: "blind"
        },
        {
          isShow: true,
          name: "bluetooth"
        },
        {
          isShow: true,
          name: "bluetooth-b"
        },
        {
          isShow: true,
          name: "bolt"
        },
        {
          isShow: true,
          name: "bomb"
        },
        {
          isShow: true,
          name: "book"
        },
        {
          isShow: true,
          name: "bookmark"
        },
        {
          isShow: true,
          name: "bookmark-o"
        },
        {
          isShow: true,
          name: "braille"
        },
        {
          isShow: true,
          name: "briefcase"
        },
        {
          isShow: true,
          name: "bug"
        },
        {
          isShow: true,
          name: "building"
        },
        {
          isShow: true,
          name: "building-o"
        },
        {
          isShow: true,
          name: "bullhorn"
        },
        {
          isShow: true,
          name: "bullseye"
        },
        {
          isShow: true,
          name: "bus"
        },
        {
          isShow: true,
          name: "cab"
        },
        {
          isShow: true,
          name: "calculator"
        },
        {
          isShow: true,
          name: "calendar"
        },
        {
          isShow: true,
          name: "calendar-check-o"
        },
        {
          isShow: true,
          name: "calendar-minus-o"
        },
        {
          isShow: true,
          name: "calendar-o"
        },
        {
          isShow: true,
          name: "calendar-plus-o"
        },
        {
          isShow: true,
          name: "calendar-times-o"
        },
        {
          isShow: true,
          name: "camera"
        },
        {
          isShow: true,
          name: "camera-retro"
        },
        {
          isShow: true,
          name: "car"
        },
        {
          isShow: true,
          name: "caret-square-o-down"
        },
        {
          isShow: true,
          name: "caret-square-o-left"
        },
        {
          isShow: true,
          name: "caret-square-o-right"
        },
        {
          isShow: true,
          name: "caret-square-o-up"
        },
        {
          isShow: true,
          name: "cart-arrow-down"
        },
        {
          isShow: true,
          name: "cart-plus"
        },
        {
          isShow: true,
          name: "cc"
        },
        {
          isShow: true,
          name: "certificate"
        },
        {
          isShow: true,
          name: "check"
        },
        {
          isShow: true,
          name: "check-circle"
        },
        {
          isShow: true,
          name: "check-circle-o"
        },
        {
          isShow: true,
          name: "check-square"
        },
        {
          isShow: true,
          name: "check-square-o"
        },
        {
          isShow: true,
          name: "child"
        },
        {
          isShow: true,
          name: "circle"
        },
        {
          isShow: true,
          name: "circle-o"
        },
        {
          isShow: true,
          name: "circle-o-notch"
        },
        {
          isShow: true,
          name: "circle-thin"
        },
        {
          isShow: true,
          name: "clock-o"
        },
        {
          isShow: true,
          name: "clone"
        },
        {
          isShow: true,
          name: "close"
        },
        {
          isShow: true,
          name: "cloud"
        },
        {
          isShow: true,
          name: "cloud-download"
        },
        {
          isShow: true,
          name: "cloud-upload"
        },
        {
          isShow: true,
          name: "code"
        },
        {
          isShow: true,
          name: "code-fork"
        },
        {
          isShow: true,
          name: "coffee"
        },
        {
          isShow: true,
          name: "cog"
        },
        {
          isShow: true,
          name: "cogs"
        },
        {
          isShow: true,
          name: "comment"
        },
        {
          isShow: true,
          name: "comment-o"
        },
        {
          isShow: true,
          name: "commenting"
        },
        {
          isShow: true,
          name: "commenting-o"
        },
        {
          isShow: true,
          name: "comments"
        },
        {
          isShow: true,
          name: "comments-o"
        },
        {
          isShow: true,
          name: "compass"
        },
        {
          isShow: true,
          name: "copyright"
        },
        {
          isShow: true,
          name: "creative-commons"
        },
        {
          isShow: true,
          name: "credit-card"
        },
        {
          isShow: true,
          name: "credit-card-alt"
        },
        {
          isShow: true,
          name: "crop"
        },
        {
          isShow: true,
          name: "crosshairs"
        },
        {
          isShow: true,
          name: "cube"
        },
        {
          isShow: true,
          name: "cubes"
        },
        {
          isShow: true,
          name: "cutlery"
        },
        {
          isShow: true,
          name: "dashboard"
        },
        {
          isShow: true,
          name: "database"
        },
        {
          isShow: true,
          name: "deaf"
        },
        {
          isShow: true,
          name: "deafness"
        },
        {
          isShow: true,
          name: "desktop"
        },
        {
          isShow: true,
          name: "diamond"
        },
        {
          isShow: true,
          name: "dot-circle-o"
        },
        {
          isShow: true,
          name: "download"
        },
        {
          isShow: true,
          name: "drivers-license"
        },
        {
          isShow: true,
          name: "drivers-license-o"
        },
        {
          isShow: true,
          name: "edit"
        },
        {
          isShow: true,
          name: "ellipsis-h"
        },
        {
          isShow: true,
          name: "ellipsis-v"
        },
        {
          isShow: true,
          name: "envelope"
        },
        {
          isShow: true,
          name: "envelope-o"
        },
        {
          isShow: true,
          name: "envelope-open"
        },
        {
          isShow: true,
          name: "envelope-open-o"
        },
        {
          isShow: true,
          name: "envelope-square"
        },
        {
          isShow: true,
          name: "eraser"
        },
        {
          isShow: true,
          name: "exchange"
        },
        {
          isShow: true,
          name: "exclamation"
        },
        {
          isShow: true,
          name: "exclamation-circle"
        },
        {
          isShow: true,
          name: "exclamation-triangle"
        },
        {
          isShow: true,
          name: "external-link"
        },
        {
          isShow: true,
          name: "external-link-square"
        },
        {
          isShow: true,
          name: "eye"
        },
        {
          isShow: true,
          name: "eye-slash"
        },
        {
          isShow: true,
          name: "eyedropper"
        },
        {
          isShow: true,
          name: "fax"
        },
        {
          isShow: true,
          name: "feed"
        },
        {
          isShow: true,
          name: "female"
        },
        {
          isShow: true,
          name: "fighter-jet"
        },
        {
          isShow: true,
          name: "file-archive-o"
        },
        {
          isShow: true,
          name: "file-audio-o"
        },
        {
          isShow: true,
          name: "file-code-o"
        },
        {
          isShow: true,
          name: "file-excel-o"
        },
        {
          isShow: true,
          name: "file-image-o"
        },
        {
          isShow: true,
          name: "file-movie-o"
        },
        {
          isShow: true,
          name: "file-pdf-o"
        },
        {
          isShow: true,
          name: "file-photo-o"
        },
        {
          isShow: true,
          name: "file-picture-o"
        },
        {
          isShow: true,
          name: "file-powerpoint-o"
        },
        {
          isShow: true,
          name: "file-sound-o"
        },
        {
          isShow: true,
          name: "file-video-o"
        },
        {
          isShow: true,
          name: "file-word-o"
        },
        {
          isShow: true,
          name: "file-zip-o"
        },
        {
          isShow: true,
          name: "film"
        },
        {
          isShow: true,
          name: "filter"
        },
        {
          isShow: true,
          name: "fire"
        },
        {
          isShow: true,
          name: "fire-extinguisher"
        },
        {
          isShow: true,
          name: "flag"
        },
        {
          isShow: true,
          name: "flag-checkered"
        },
        {
          isShow: true,
          name: "flag-o"
        },
        {
          isShow: true,
          name: "flash"
        },
        {
          isShow: true,
          name: "flask"
        },
        {
          isShow: true,
          name: "folder"
        },
        {
          isShow: true,
          name: "folder-o"
        },
        {
          isShow: true,
          name: "folder-open"
        },
        {
          isShow: true,
          name: "folder-open-o"
        },
        {
          isShow: true,
          name: "frown-o"
        },
        {
          isShow: true,
          name: "futbol-o"
        },
        {
          isShow: true,
          name: "gamepad"
        },
        {
          isShow: true,
          name: "gavel"
        },
        {
          isShow: true,
          name: "gear"
        },
        {
          isShow: true,
          name: "gears"
        },
        {
          isShow: true,
          name: "gift"
        },
        {
          isShow: true,
          name: "glass"
        },
        {
          isShow: true,
          name: "globe"
        },
        {
          isShow: true,
          name: "graduation-cap"
        },
        {
          isShow: true,
          name: "group"
        },
        {
          isShow: true,
          name: "hand-grab-o"
        },
        {
          isShow: true,
          name: "hand-lizard-o"
        },
        {
          isShow: true,
          name: "hand-paper-o"
        },
        {
          isShow: true,
          name: "hand-peace-o"
        },
        {
          isShow: true,
          name: "hand-pointer-o"
        },
        {
          isShow: true,
          name: "hand-rock-o"
        },
        {
          isShow: true,
          name: "hand-scissors-o"
        },
        {
          isShow: true,
          name: "hand-spock-o"
        },
        {
          isShow: true,
          name: "hand-stop-o"
        },
        {
          isShow: true,
          name: "handshake-o"
        },
        {
          isShow: true,
          name: "hard-of-hearing"
        },
        {
          isShow: true,
          name: "hashtag"
        },
        {
          isShow: true,
          name: "hdd-o"
        },
        {
          isShow: true,
          name: "headphones"
        },
        {
          isShow: true,
          name: "heart"
        },
        {
          isShow: true,
          name: "heart-o"
        },
        {
          isShow: true,
          name: "heartbeat"
        },
        {
          isShow: true,
          name: "history"
        },
        {
          isShow: true,
          name: "home"
        },
        {
          isShow: true,
          name: "hotel"
        },
        {
          isShow: true,
          name: "hourglass"
        },
        {
          isShow: true,
          name: "hourglass-1"
        },
        {
          isShow: true,
          name: "hourglass-2"
        },
        {
          isShow: true,
          name: "hourglass-3"
        },
        {
          isShow: true,
          name: "hourglass-end"
        },
        {
          isShow: true,
          name: "hourglass-half"
        },
        {
          isShow: true,
          name: "hourglass-o"
        },
        {
          isShow: true,
          name: "hourglass-start"
        },
        {
          isShow: true,
          name: "i-cursor"
        },
        {
          isShow: true,
          name: "id-badge"
        },
        {
          isShow: true,
          name: "id-card"
        },
        {
          isShow: true,
          name: "id-card-o"
        },
        {
          isShow: true,
          name: "image"
        },
        {
          isShow: true,
          name: "inbox"
        },
        {
          isShow: true,
          name: "industry"
        },
        {
          isShow: true,
          name: "info"
        },
        {
          isShow: true,
          name: "info-circle"
        },
        {
          isShow: true,
          name: "institution"
        },
        {
          isShow: true,
          name: "key"
        },
        {
          isShow: true,
          name: "keyboard-o"
        },
        {
          isShow: true,
          name: "language"
        },
        {
          isShow: true,
          name: "laptop"
        },
        {
          isShow: true,
          name: "leaf"
        },
        {
          isShow: true,
          name: "legal"
        },
        {
          isShow: true,
          name: "lemon-o"
        },
        {
          isShow: true,
          name: "level-down"
        },
        {
          isShow: true,
          name: "level-up"
        },
        {
          isShow: true,
          name: "life-bouy"
        },
        {
          isShow: true,
          name: "life-buoy"
        },
        {
          isShow: true,
          name: "life-ring"
        },
        {
          isShow: true,
          name: "life-saver"
        },
        {
          isShow: true,
          name: "lightbulb-o"
        },
        {
          isShow: true,
          name: "line-chart"
        },
        {
          isShow: true,
          name: "location-arrow"
        },
        {
          isShow: true,
          name: "lock"
        },
        {
          isShow: true,
          name: "low-vision"
        },
        {
          isShow: true,
          name: "magic"
        },
        {
          isShow: true,
          name: "magnet"
        },
        {
          isShow: true,
          name: "mail-forward"
        },
        {
          isShow: true,
          name: "mail-reply"
        },
        {
          isShow: true,
          name: "mail-reply-all"
        },
        {
          isShow: true,
          name: "male"
        },
        {
          isShow: true,
          name: "map"
        },
        {
          isShow: true,
          name: "map-marker"
        },
        {
          isShow: true,
          name: "map-o"
        },
        {
          isShow: true,
          name: "map-pin"
        },
        {
          isShow: true,
          name: "map-signs"
        },
        {
          isShow: true,
          name: "meh-o"
        },
        {
          isShow: true,
          name: "microchip"
        },
        {
          isShow: true,
          name: "microphone"
        },
        {
          isShow: true,
          name: "microphone-slash"
        },
        {
          isShow: true,
          name: "minus"
        },
        {
          isShow: true,
          name: "minus-circle"
        },
        {
          isShow: true,
          name: "minus-square"
        },
        {
          isShow: true,
          name: "minus-square-o"
        },
        {
          isShow: true,
          name: "mobile"
        },
        {
          isShow: true,
          name: "mobile-phone"
        },
        {
          isShow: true,
          name: "money"
        },
        {
          isShow: true,
          name: "moon-o"
        },
        {
          isShow: true,
          name: "mortar-board"
        },
        {
          isShow: true,
          name: "motorcycle"
        },
        {
          isShow: true,
          name: "mouse-pointer"
        },
        {
          isShow: true,
          name: "music"
        },
        {
          isShow: true,
          name: "navicon"
        },
        {
          isShow: true,
          name: "newspaper-o"
        },
        {
          isShow: true,
          name: "object-group"
        },
        {
          isShow: true,
          name: "object-ungroup"
        },
        {
          isShow: true,
          name: "paint-brush"
        },
        {
          isShow: true,
          name: "paper-plane"
        },
        {
          isShow: true,
          name: "paper-plane-o"
        },
        {
          isShow: true,
          name: "paw"
        },
        {
          isShow: true,
          name: "pencil"
        },
        {
          isShow: true,
          name: "pencil-square"
        },
        {
          isShow: true,
          name: "pencil-square-o"
        },
        {
          isShow: true,
          name: "percent"
        },
        {
          isShow: true,
          name: "phone"
        },
        {
          isShow: true,
          name: "phone-square"
        },
        {
          isShow: true,
          name: "photo"
        },
        {
          isShow: true,
          name: "picture-o"
        },
        {
          isShow: true,
          name: "pie-chart"
        },
        {
          isShow: true,
          name: "plane"
        },
        {
          isShow: true,
          name: "plug"
        },
        {
          isShow: true,
          name: "plus"
        },
        {
          isShow: true,
          name: "plus-circle"
        },
        {
          isShow: true,
          name: "plus-square"
        },
        {
          isShow: true,
          name: "plus-square-o"
        },
        {
          isShow: true,
          name: "podcast"
        },
        {
          isShow: true,
          name: "power-off"
        },
        {
          isShow: true,
          name: "print"
        },
        {
          isShow: true,
          name: "puzzle-piece"
        },
        {
          isShow: true,
          name: "qrcode"
        },
        {
          isShow: true,
          name: "question"
        },
        {
          isShow: true,
          name: "question-circle"
        },
        {
          isShow: true,
          name: "question-circle-o"
        },
        {
          isShow: true,
          name: "quote-left"
        },
        {
          isShow: true,
          name: "quote-right"
        },
        {
          isShow: true,
          name: "random"
        },
        {
          isShow: true,
          name: "recycle"
        },
        {
          isShow: true,
          name: "refresh"
        },
        {
          isShow: true,
          name: "registered"
        },
        {
          isShow: true,
          name: "remove"
        },
        {
          isShow: true,
          name: "reorder"
        },
        {
          isShow: true,
          name: "reply"
        },
        {
          isShow: true,
          name: "reply-all"
        },
        {
          isShow: true,
          name: "retweet"
        },
        {
          isShow: true,
          name: "road"
        },
        {
          isShow: true,
          name: "rocket"
        },
        {
          isShow: true,
          name: "rss"
        },
        {
          isShow: true,
          name: "rss-square"
        },
        {
          isShow: true,
          name: "s15"
        },
        {
          isShow: true,
          name: "search"
        },
        {
          isShow: true,
          name: "search-minus"
        },
        {
          isShow: true,
          name: "search-plus"
        },
        {
          isShow: true,
          name: "send"
        },
        {
          isShow: true,
          name: "send-o"
        },
        {
          isShow: true,
          name: "server"
        },
        {
          isShow: true,
          name: "share"
        },
        {
          isShow: true,
          name: "share-alt"
        },
        {
          isShow: true,
          name: "share-alt-square"
        },
        {
          isShow: true,
          name: "share-square"
        },
        {
          isShow: true,
          name: "share-square-o"
        },
        {
          isShow: true,
          name: "shield"
        },
        {
          isShow: true,
          name: "ship"
        },
        {
          isShow: true,
          name: "shopping-bag"
        },
        {
          isShow: true,
          name: "shopping-basket"
        },
        {
          isShow: true,
          name: "shopping-cart"
        },
        {
          isShow: true,
          name: "shower"
        },
        {
          isShow: true,
          name: "sign-in"
        },
        {
          isShow: true,
          name: "sign-language"
        },
        {
          isShow: true,
          name: "sign-out"
        },
        {
          isShow: true,
          name: "signal"
        },
        {
          isShow: true,
          name: "signing"
        },
        {
          isShow: true,
          name: "sitemap"
        },
        {
          isShow: true,
          name: "sliders"
        },
        {
          isShow: true,
          name: "smile-o"
        },
        {
          isShow: true,
          name: "snowflake-o"
        },
        {
          isShow: true,
          name: "soccer-ball-o"
        },
        {
          isShow: true,
          name: "sort"
        },
        {
          isShow: true,
          name: "sort-alpha-asc"
        },
        {
          isShow: true,
          name: "sort-alpha-desc"
        },
        {
          isShow: true,
          name: "sort-amount-asc"
        },
        {
          isShow: true,
          name: "sort-amount-desc"
        },
        {
          isShow: true,
          name: "sort-asc"
        },
        {
          isShow: true,
          name: "sort-desc"
        },
        {
          isShow: true,
          name: "sort-down"
        },
        {
          isShow: true,
          name: "sort-numeric-asc"
        },
        {
          isShow: true,
          name: "sort-numeric-desc"
        },
        {
          isShow: true,
          name: "sort-up"
        },
        {
          isShow: true,
          name: "space-shuttle"
        },
        {
          isShow: true,
          name: "spinner"
        },
        {
          isShow: true,
          name: "spoon"
        },
        {
          isShow: true,
          name: "square"
        },
        {
          isShow: true,
          name: "square-o"
        },
        {
          isShow: true,
          name: "star"
        },
        {
          isShow: true,
          name: "star-half"
        },
        {
          isShow: true,
          name: "star-half-empty"
        },
        {
          isShow: true,
          name: "star-half-full"
        },
        {
          isShow: true,
          name: "star-half-o"
        },
        {
          isShow: true,
          name: "star-o"
        },
        {
          isShow: true,
          name: "sticky-note"
        },
        {
          isShow: true,
          name: "sticky-note-o"
        },
        {
          isShow: true,
          name: "street-view"
        },
        {
          isShow: true,
          name: "suitcase"
        },
        {
          isShow: true,
          name: "sun-o"
        },
        {
          isShow: true,
          name: "support"
        },
        {
          isShow: true,
          name: "tablet"
        },
        {
          isShow: true,
          name: "tachometer"
        },
        {
          isShow: true,
          name: "tag"
        },
        {
          isShow: true,
          name: "tags"
        },
        {
          isShow: true,
          name: "tasks"
        },
        {
          isShow: true,
          name: "taxi"
        },
        {
          isShow: true,
          name: "television"
        },
        {
          isShow: true,
          name: "terminal"
        },
        {
          isShow: true,
          name: "thermometer"
        },
        {
          isShow: true,
          name: "thermometer-0"
        },
        {
          isShow: true,
          name: "thermometer-1"
        },
        {
          isShow: true,
          name: "thermometer-2"
        },
        {
          isShow: true,
          name: "thermometer-3"
        },
        {
          isShow: true,
          name: "thermometer-4"
        },
        {
          isShow: true,
          name: "thermometer-empty"
        },
        {
          isShow: true,
          name: "thermometer-full"
        },
        {
          isShow: true,
          name: "thermometer-half"
        },
        {
          isShow: true,
          name: "thermometer-quarter"
        },
        {
          isShow: true,
          name: "thermometer-three-quarters"
        },
        {
          isShow: true,
          name: "thumb-tack"
        },
        {
          isShow: true,
          name: "thumbs-down"
        },
        {
          isShow: true,
          name: "thumbs-o-down"
        },
        {
          isShow: true,
          name: "thumbs-o-up"
        },
        {
          isShow: true,
          name: "thumbs-up"
        },
        {
          isShow: true,
          name: "ticket"
        },
        {
          isShow: true,
          name: "times"
        },
        {
          isShow: true,
          name: "times-circle"
        },
        {
          isShow: true,
          name: "times-circle-o"
        },
        {
          isShow: true,
          name: "times-rectangle"
        },
        {
          isShow: true,
          name: "times-rectangle-o"
        },
        {
          isShow: true,
          name: "tint"
        },
        {
          isShow: true,
          name: "toggle-down"
        },
        {
          isShow: true,
          name: "toggle-left"
        },
        {
          isShow: true,
          name: "toggle-off"
        },
        {
          isShow: true,
          name: "toggle-on"
        },
        {
          isShow: true,
          name: "toggle-right"
        },
        {
          isShow: true,
          name: "toggle-up"
        },
        {
          isShow: true,
          name: "trademark"
        },
        {
          isShow: true,
          name: "trash"
        },
        {
          isShow: true,
          name: "trash-o"
        },
        {
          isShow: true,
          name: "tree"
        },
        {
          isShow: true,
          name: "trophy"
        },
        {
          isShow: true,
          name: "truck"
        },
        {
          isShow: true,
          name: "tty"
        },
        {
          isShow: true,
          name: "tv"
        },
        {
          isShow: true,
          name: "umbrella"
        },
        {
          isShow: true,
          name: "universal-access"
        },
        {
          isShow: true,
          name: "university"
        },
        {
          isShow: true,
          name: "unlock"
        },
        {
          isShow: true,
          name: "unlock-alt"
        },
        {
          isShow: true,
          name: "unsorted"
        },
        {
          isShow: true,
          name: "upload"
        },
        {
          isShow: true,
          name: "user"
        },
        {
          isShow: true,
          name: "user-circle"
        },
        {
          isShow: true,
          name: "user-circle-o"
        },
        {
          isShow: true,
          name: "user-o"
        },
        {
          isShow: true,
          name: "user-plus"
        },
        {
          isShow: true,
          name: "user-secret"
        },
        {
          isShow: true,
          name: "user-times"
        },
        {
          isShow: true,
          name: "users"
        },
        {
          isShow: true,
          name: "vcard"
        },
        {
          isShow: true,
          name: "vcard-o"
        },
        {
          isShow: true,
          name: "video-camera"
        },
        {
          isShow: true,
          name: "volume-control-phone"
        },
        {
          isShow: true,
          name: "volume-down"
        },
        {
          isShow: true,
          name: "volume-off"
        },
        {
          isShow: true,
          name: "volume-up"
        },
        {
          isShow: true,
          name: "warning"
        },
        {
          isShow: true,
          name: "wheelchair"
        },
        {
          isShow: true,
          name: "wheelchair-alt"
        },
        {
          isShow: true,
          name: "wifi"
        },
        {
          isShow: true,
          name: "window-close"
        },
        {
          isShow: true,
          name: "window-close-o"
        },
        {
          isShow: true,
          name: "window-maximize"
        },
        {
          isShow: true,
          name: "window-minimize"
        },
        {
          isShow: true,
          name: "window-restore"
        },
        {
          isShow: true,
          name: "wrench"
        },
        {
          isShow: true,
          name: "american-sign-language-interpreting"
        },
        {
          isShow: true,
          name: "asl-interpreting"
        },
        {
          isShow: true,
          name: "assistive-listening-systems"
        },
        {
          isShow: true,
          name: "audio-description"
        },
        {
          isShow: true,
          name: "blind"
        },
        {
          isShow: true,
          name: "braille"
        },
        {
          isShow: true,
          name: "cc"
        },
        {
          isShow: true,
          name: "deaf"
        },
        {
          isShow: true,
          name: "deafness"
        },
        {
          isShow: true,
          name: "hard-of-hearing"
        },
        {
          isShow: true,
          name: "low-vision"
        },
        {
          isShow: true,
          name: "question-circle-o"
        },
        {
          isShow: true,
          name: "sign-language"
        },
        {
          isShow: true,
          name: "signing"
        },
        {
          isShow: true,
          name: "tty"
        },
        {
          isShow: true,
          name: "universal-access"
        },
        {
          isShow: true,
          name: "volume-control-phone"
        },
        {
          isShow: true,
          name: "wheelchair"
        },
        {
          isShow: true,
          name: "wheelchair-alt"
        },
        {
          isShow: true,
          name: "hand-grab-o"
        },
        {
          isShow: true,
          name: "hand-lizard-o"
        },
        {
          isShow: true,
          name: "hand-o-down"
        },
        {
          isShow: true,
          name: "hand-o-left"
        },
        {
          isShow: true,
          name: "hand-o-right"
        },
        {
          isShow: true,
          name: "hand-o-up"
        },
        {
          isShow: true,
          name: "hand-paper-o"
        },
        {
          isShow: true,
          name: "hand-peace-o"
        },
        {
          isShow: true,
          name: "hand-pointer-o"
        },
        {
          isShow: true,
          name: "hand-rock-o"
        },
        {
          isShow: true,
          name: "hand-scissors-o"
        },
        {
          isShow: true,
          name: "hand-spock-o"
        },
        {
          isShow: true,
          name: "hand-stop-o"
        },
        {
          isShow: true,
          name: "thumbs-down"
        },
        {
          isShow: true,
          name: "thumbs-o-down"
        },
        {
          isShow: true,
          name: "thumbs-o-up"
        },
        {
          isShow: true,
          name: "thumbs-up"
        },
        {
          isShow: true,
          name: "genderless"
        },
        {
          isShow: true,
          name: "intersex"
        },
        {
          isShow: true,
          name: "mars"
        },
        {
          isShow: true,
          name: "mars-double"
        },
        {
          isShow: true,
          name: "mars-stroke"
        },
        {
          isShow: true,
          name: "mars-stroke-h"
        },
        {
          isShow: true,
          name: "mars-stroke-v"
        },
        {
          isShow: true,
          name: "mercury"
        },
        {
          isShow: true,
          name: "neuter"
        },
        {
          isShow: true,
          name: "transgender"
        },
        {
          isShow: true,
          name: "transgender-alt"
        },
        {
          isShow: true,
          name: "venus"
        },
        {
          isShow: true,
          name: "venus-double"
        },
        {
          isShow: true,
          name: "venus-mars"
        },
        {
          isShow: true,
          name: "file"
        },
        {
          isShow: true,
          name: "file-archive-o"
        },
        {
          isShow: true,
          name: "file-audio-o"
        },
        {
          isShow: true,
          name: "file-code-o"
        },
        {
          isShow: true,
          name: "file-excel-o"
        },
        {
          isShow: true,
          name: "file-image-o"
        },
        {
          isShow: true,
          name: "file-movie-o"
        },
        {
          isShow: true,
          name: "file-o"
        },
        {
          isShow: true,
          name: "file-pdf-o"
        },
        {
          isShow: true,
          name: "file-photo-o"
        },
        {
          isShow: true,
          name: "file-picture-o"
        },
        {
          isShow: true,
          name: "file-powerpoint-o"
        },
        {
          isShow: true,
          name: "file-sound-o"
        },
        {
          isShow: true,
          name: "file-text"
        },
        {
          isShow: true,
          name: "file-text-o"
        },
        {
          isShow: true,
          name: "file-video-o"
        },
        {
          isShow: true,
          name: "file-word-o"
        },
        {
          isShow: true,
          name: "file-zip-o"
        },
        {
          isShow: true,
          name: "circle-o-notch"
        },
        {
          isShow: true,
          name: "cog"
        },
        {
          isShow: true,
          name: "gear"
        },
        {
          isShow: true,
          name: "refresh"
        },
        {
          isShow: true,
          name: "spinner"
        },
        {
          isShow: true,
          name: "check-square"
        },
        {
          isShow: true,
          name: "check-square-o"
        },
        {
          isShow: true,
          name: "circle"
        },
        {
          isShow: true,
          name: "circle-o"
        },
        {
          isShow: true,
          name: "dot-circle-o"
        },
        {
          isShow: true,
          name: "minus-square"
        },
        {
          isShow: true,
          name: "minus-square-o"
        },
        {
          isShow: true,
          name: "plus-square"
        },
        {
          isShow: true,
          name: "plus-square-o"
        },
        {
          isShow: true,
          name: "square"
        },
        {
          isShow: true,
          name: "square-o"
        },
        {
          isShow: true,
          name: "cc-amex"
        },
        {
          isShow: true,
          name: "cc-diners-club"
        },
        {
          isShow: true,
          name: "cc-discover"
        },
        {
          isShow: true,
          name: "cc-jcb"
        },
        {
          isShow: true,
          name: "cc-mastercard"
        },
        {
          isShow: true,
          name: "cc-paypal"
        },
        {
          isShow: true,
          name: "cc-stripe"
        },
        {
          isShow: true,
          name: "cc-visa"
        },
        {
          isShow: true,
          name: "credit-card"
        },
        {
          isShow: true,
          name: "credit-card-alt"
        },
        {
          isShow: true,
          name: "google-wallet"
        },
        {
          isShow: true,
          name: "paypal"
        },
        {
          isShow: true,
          name: "area-chart"
        },
        {
          isShow: true,
          name: "bar-chart"
        },
        {
          isShow: true,
          name: "bar-chart-o"
        },
        {
          isShow: true,
          name: "line-chart"
        },
        {
          isShow: true,
          name: "pie-chart"
        },
        {
          isShow: true,
          name: "bitcoin"
        },
        {
          isShow: true,
          name: "btc"
        },
        {
          isShow: true,
          name: "cny"
        },
        {
          isShow: true,
          name: "dollar"
        },
        {
          isShow: true,
          name: "eur"
        },
        {
          isShow: true,
          name: "euro"
        },
        {
          isShow: true,
          name: "gbp"
        },
        {
          isShow: true,
          name: "gg"
        },
        {
          isShow: true,
          name: "gg-circle"
        },
        {
          isShow: true,
          name: "ils"
        },
        {
          isShow: true,
          name: "inr"
        },
        {
          isShow: true,
          name: "jpy"
        },
        {
          isShow: true,
          name: "krw"
        },
        {
          isShow: true,
          name: "money"
        },
        {
          isShow: true,
          name: "rmb"
        },
        {
          isShow: true,
          name: "rouble"
        },
        {
          isShow: true,
          name: "rub"
        },
        {
          isShow: true,
          name: "ruble"
        },
        {
          isShow: true,
          name: "rupee"
        },
        {
          isShow: true,
          name: "shekel"
        },
        {
          isShow: true,
          name: "sheqel"
        },
        {
          isShow: true,
          name: "try"
        },
        {
          isShow: true,
          name: "turkish-lira"
        },
        {
          isShow: true,
          name: "usd"
        },
        {
          isShow: true,
          name: "won"
        },
        {
          isShow: true,
          name: "yen"
        },
        {
          isShow: true,
          name: "align-center"
        },
        {
          isShow: true,
          name: "align-justify"
        },
        {
          isShow: true,
          name: "align-left"
        },
        {
          isShow: true,
          name: "align-right"
        },
        {
          isShow: true,
          name: "bold"
        },
        {
          isShow: true,
          name: "chain"
        },
        {
          isShow: true,
          name: "chain-broken"
        },
        {
          isShow: true,
          name: "clipboard"
        },
        {
          isShow: true,
          name: "columns"
        },
        {
          isShow: true,
          name: "copy"
        },
        {
          isShow: true,
          name: "cut"
        },
        {
          isShow: true,
          name: "dedent"
        },
        {
          isShow: true,
          name: "eraser"
        },
        {
          isShow: true,
          name: "file"
        },
        {
          isShow: true,
          name: "file-o"
        },
        {
          isShow: true,
          name: "file-text"
        },
        {
          isShow: true,
          name: "file-text-o"
        },
        {
          isShow: true,
          name: "files-o"
        },
        {
          isShow: true,
          name: "floppy-o"
        },
        {
          isShow: true,
          name: "font"
        },
        {
          isShow: true,
          name: "header"
        },
        {
          isShow: true,
          name: "indent"
        },
        {
          isShow: true,
          name: "italic"
        },
        {
          isShow: true,
          name: "link"
        },
        {
          isShow: true,
          name: "list"
        },
        {
          isShow: true,
          name: "list-alt"
        },
        {
          isShow: true,
          name: "list-ol"
        },
        {
          isShow: true,
          name: "list-ul"
        },
        {
          isShow: true,
          name: "outdent"
        },
        {
          isShow: true,
          name: "paperclip"
        },
        {
          isShow: true,
          name: "paragraph"
        },
        {
          isShow: true,
          name: "paste"
        },
        {
          isShow: true,
          name: "repeat"
        },
        {
          isShow: true,
          name: "rotate-left"
        },
        {
          isShow: true,
          name: "rotate-right"
        },
        {
          isShow: true,
          name: "save"
        },
        {
          isShow: true,
          name: "scissors"
        },
        {
          isShow: true,
          name: "strikethrough"
        },
        {
          isShow: true,
          name: "subscript"
        },
        {
          isShow: true,
          name: "superscript"
        },
        {
          isShow: true,
          name: "table"
        },
        {
          isShow: true,
          name: "text-height"
        },
        {
          isShow: true,
          name: "text-width"
        },
        {
          isShow: true,
          name: "th"
        },
        {
          isShow: true,
          name: "th-large"
        },
        {
          isShow: true,
          name: "th-list"
        },
        {
          isShow: true,
          name: "underline"
        },
        {
          isShow: true,
          name: "undo"
        },
        {
          isShow: true,
          name: "unlink"
        },
        {
          isShow: true,
          name: "angle-double-down"
        },
        {
          isShow: true,
          name: "angle-double-left"
        },
        {
          isShow: true,
          name: "angle-double-right"
        },
        {
          isShow: true,
          name: "angle-double-up"
        },
        {
          isShow: true,
          name: "angle-down"
        },
        {
          isShow: true,
          name: "angle-left"
        },
        {
          isShow: true,
          name: "angle-right"
        },
        {
          isShow: true,
          name: "angle-up"
        },
        {
          isShow: true,
          name: "arrow-circle-down"
        },
        {
          isShow: true,
          name: "arrow-circle-left"
        },
        {
          isShow: true,
          name: "arrow-circle-o-down"
        },
        {
          isShow: true,
          name: "arrow-circle-o-left"
        },
        {
          isShow: true,
          name: "arrow-circle-o-right"
        },
        {
          isShow: true,
          name: "arrow-circle-o-up"
        },
        {
          isShow: true,
          name: "arrow-circle-right"
        },
        {
          isShow: true,
          name: "arrow-circle-up"
        },
        {
          isShow: true,
          name: "arrow-down"
        },
        {
          isShow: true,
          name: "arrow-left"
        },
        {
          isShow: true,
          name: "arrow-right"
        },
        {
          isShow: true,
          name: "arrow-up"
        },
        {
          isShow: true,
          name: "arrows"
        },
        {
          isShow: true,
          name: "arrows-alt"
        },
        {
          isShow: true,
          name: "arrows-h"
        },
        {
          isShow: true,
          name: "arrows-v"
        },
        {
          isShow: true,
          name: "caret-down"
        },
        {
          isShow: true,
          name: "caret-left"
        },
        {
          isShow: true,
          name: "caret-right"
        },
        {
          isShow: true,
          name: "caret-square-o-down"
        },
        {
          isShow: true,
          name: "caret-square-o-left"
        },
        {
          isShow: true,
          name: "caret-square-o-right"
        },
        {
          isShow: true,
          name: "caret-square-o-up"
        },
        {
          isShow: true,
          name: "caret-up"
        },
        {
          isShow: true,
          name: "chevron-circle-down"
        },
        {
          isShow: true,
          name: "chevron-circle-left"
        },
        {
          isShow: true,
          name: "chevron-circle-right"
        },
        {
          isShow: true,
          name: "chevron-circle-up"
        },
        {
          isShow: true,
          name: "chevron-down"
        },
        {
          isShow: true,
          name: "chevron-left"
        },
        {
          isShow: true,
          name: "chevron-right"
        },
        {
          isShow: true,
          name: "chevron-up"
        },
        {
          isShow: true,
          name: "exchange"
        },
        {
          isShow: true,
          name: "hand-o-down"
        },
        {
          isShow: true,
          name: "hand-o-left"
        },
        {
          isShow: true,
          name: "hand-o-right"
        },
        {
          isShow: true,
          name: "hand-o-up"
        },
        {
          isShow: true,
          name: "long-arrow-down"
        },
        {
          isShow: true,
          name: "long-arrow-left"
        },
        {
          isShow: true,
          name: "long-arrow-right"
        },
        {
          isShow: true,
          name: "long-arrow-up"
        },
        {
          isShow: true,
          name: "toggle-down"
        },
        {
          isShow: true,
          name: "toggle-left"
        },
        {
          isShow: true,
          name: "toggle-right"
        },
        {
          isShow: true,
          name: "toggle-up"
        },
        {
          isShow: true,
          name: "arrows-alt"
        },
        {
          isShow: true,
          name: "backward"
        },
        {
          isShow: true,
          name: "compress"
        },
        {
          isShow: true,
          name: "eject"
        },
        {
          isShow: true,
          name: "expand"
        },
        {
          isShow: true,
          name: "fast-backward"
        },
        {
          isShow: true,
          name: "fast-forward"
        },
        {
          isShow: true,
          name: "forward"
        },
        {
          isShow: true,
          name: "pause"
        },
        {
          isShow: true,
          name: "pause-circle"
        },
        {
          isShow: true,
          name: "pause-circle-o"
        },
        {
          isShow: true,
          name: "play"
        },
        {
          isShow: true,
          name: "play-circle"
        },
        {
          isShow: true,
          name: "play-circle-o"
        },
        {
          isShow: true,
          name: "random"
        },
        {
          isShow: true,
          name: "step-backward"
        },
        {
          isShow: true,
          name: "step-forward"
        },
        {
          isShow: true,
          name: "stop"
        },
        {
          isShow: true,
          name: "stop-circle"
        },
        {
          isShow: true,
          name: "stop-circle-o"
        },
        {
          isShow: true,
          name: "youtube-play"
        },
        {
          isShow: true,
          name: "500px"
        },
        {
          isShow: true,
          name: "adn"
        },
        {
          isShow: true,
          name: "amazon"
        },
        {
          isShow: true,
          name: "android"
        },
        {
          isShow: true,
          name: "angellist"
        },
        {
          isShow: true,
          name: "apple"
        },
        {
          isShow: true,
          name: "bandcamp"
        },
        {
          isShow: true,
          name: "behance"
        },
        {
          isShow: true,
          name: "behance-square"
        },
        {
          isShow: true,
          name: "bitbucket"
        },
        {
          isShow: true,
          name: "bitbucket-square"
        },
        {
          isShow: true,
          name: "bitcoin"
        },
        {
          isShow: true,
          name: "black-tie"
        },
        {
          isShow: true,
          name: "bluetooth"
        },
        {
          isShow: true,
          name: "bluetooth-b"
        },
        {
          isShow: true,
          name: "btc"
        },
        {
          isShow: true,
          name: "buysellads"
        },
        {
          isShow: true,
          name: "cc-amex"
        },
        {
          isShow: true,
          name: "cc-diners-club"
        },
        {
          isShow: true,
          name: "cc-discover"
        },
        {
          isShow: true,
          name: "cc-jcb"
        },
        {
          isShow: true,
          name: "cc-mastercard"
        },
        {
          isShow: true,
          name: "cc-paypal"
        },
        {
          isShow: true,
          name: "cc-stripe"
        },
        {
          isShow: true,
          name: "cc-visa"
        },
        {
          isShow: true,
          name: "chrome"
        },
        {
          isShow: true,
          name: "codepen"
        },
        {
          isShow: true,
          name: "codiepie"
        },
        {
          isShow: true,
          name: "connectdevelop"
        },
        {
          isShow: true,
          name: "contao"
        },
        {
          isShow: true,
          name: "css3"
        },
        {
          isShow: true,
          name: "dashcube"
        },
        {
          isShow: true,
          name: "delicious"
        },
        {
          isShow: true,
          name: "deviantart"
        },
        {
          isShow: true,
          name: "digg"
        },
        {
          isShow: true,
          name: "dribbble"
        },
        {
          isShow: true,
          name: "dropbox"
        },
        {
          isShow: true,
          name: "drupal"
        },
        {
          isShow: true,
          name: "edge"
        },
        {
          isShow: true,
          name: "eercast"
        },
        {
          isShow: true,
          name: "empire"
        },
        {
          isShow: true,
          name: "envira"
        },
        {
          isShow: true,
          name: "etsy"
        },
        {
          isShow: true,
          name: "expeditedssl"
        },
        {
          isShow: true,
          name: "fa"
        },
        {
          isShow: true,
          name: "facebook"
        },
        {
          isShow: true,
          name: "facebook-f"
        },
        {
          isShow: true,
          name: "facebook-official"
        },
        {
          isShow: true,
          name: "facebook-square"
        },
        {
          isShow: true,
          name: "firefox"
        },
        {
          isShow: true,
          name: "first-order"
        },
        {
          isShow: true,
          name: "flickr"
        },
        {
          isShow: true,
          name: "font-awesome"
        },
        {
          isShow: true,
          name: "fonticons"
        },
        {
          isShow: true,
          name: "fort-awesome"
        },
        {
          isShow: true,
          name: "forumbee"
        },
        {
          isShow: true,
          name: "foursquare"
        },
        {
          isShow: true,
          name: "free-code-camp"
        },
        {
          isShow: true,
          name: "ge"
        },
        {
          isShow: true,
          name: "get-pocket"
        },
        {
          isShow: true,
          name: "gg"
        },
        {
          isShow: true,
          name: "gg-circle"
        },
        {
          isShow: true,
          name: "git"
        },
        {
          isShow: true,
          name: "git-square"
        },
        {
          isShow: true,
          name: "github"
        },
        {
          isShow: true,
          name: "github-alt"
        },
        {
          isShow: true,
          name: "github-square"
        },
        {
          isShow: true,
          name: "gitlab"
        },
        {
          isShow: true,
          name: "gittip"
        },
        {
          isShow: true,
          name: "glide"
        },
        {
          isShow: true,
          name: "glide-g"
        },
        {
          isShow: true,
          name: "google"
        },
        {
          isShow: true,
          name: "google-plus"
        },
        {
          isShow: true,
          name: "google-plus-circle"
        },
        {
          isShow: true,
          name: "google-plus-official"
        },
        {
          isShow: true,
          name: "google-plus-square"
        },
        {
          isShow: true,
          name: "google-wallet"
        },
        {
          isShow: true,
          name: "gratipay"
        },
        {
          isShow: true,
          name: "grav"
        },
        {
          isShow: true,
          name: "hacker-news"
        },
        {
          isShow: true,
          name: "houzz"
        },
        {
          isShow: true,
          name: "html5"
        },
        {
          isShow: true,
          name: "imdb"
        },
        {
          isShow: true,
          name: "instagram"
        },
        {
          isShow: true,
          name: "internet-explorer"
        },
        {
          isShow: true,
          name: "ioxhost"
        },
        {
          isShow: true,
          name: "joomla"
        },
        {
          isShow: true,
          name: "jsfiddle"
        },
        {
          isShow: true,
          name: "lastfm"
        },
        {
          isShow: true,
          name: "lastfm-square"
        },
        {
          isShow: true,
          name: "leanpub"
        },
        {
          isShow: true,
          name: "linkedin"
        },
        {
          isShow: true,
          name: "linkedin-square"
        },
        {
          isShow: true,
          name: "linode"
        },
        {
          isShow: true,
          name: "linux"
        },
        {
          isShow: true,
          name: "maxcdn"
        },
        {
          isShow: true,
          name: "meanpath"
        },
        {
          isShow: true,
          name: "medium"
        },
        {
          isShow: true,
          name: "meetup"
        },
        {
          isShow: true,
          name: "mixcloud"
        },
        {
          isShow: true,
          name: "modx"
        },
        {
          isShow: true,
          name: "odnoklassniki"
        },
        {
          isShow: true,
          name: "odnoklassniki-square"
        },
        {
          isShow: true,
          name: "opencart"
        },
        {
          isShow: true,
          name: "openid"
        },
        {
          isShow: true,
          name: "opera"
        },
        {
          isShow: true,
          name: "optin-monster"
        },
        {
          isShow: true,
          name: "pagelines"
        },
        {
          isShow: true,
          name: "paypal"
        },
        {
          isShow: true,
          name: "pied-piper"
        },
        {
          isShow: true,
          name: "pied-piper-alt"
        },
        {
          isShow: true,
          name: "pied-piper-pp"
        },
        {
          isShow: true,
          name: "pinterest"
        },
        {
          isShow: true,
          name: "pinterest-p"
        },
        {
          isShow: true,
          name: "pinterest-square"
        },
        {
          isShow: true,
          name: "product-hunt"
        },
        {
          isShow: true,
          name: "qq"
        },
        {
          isShow: true,
          name: "quora"
        },
        {
          isShow: true,
          name: "ra"
        },
        {
          isShow: true,
          name: "ravelry"
        },
        {
          isShow: true,
          name: "rebel"
        },
        {
          isShow: true,
          name: "reddit"
        },
        {
          isShow: true,
          name: "reddit-alien"
        },
        {
          isShow: true,
          name: "reddit-square"
        },
        {
          isShow: true,
          name: "renren"
        },
        {
          isShow: true,
          name: "resistance"
        },
        {
          isShow: true,
          name: "safari"
        },
        {
          isShow: true,
          name: "scribd"
        },
        {
          isShow: true,
          name: "sellsy"
        },
        {
          isShow: true,
          name: "share-alt"
        },
        {
          isShow: true,
          name: "share-alt-square"
        },
        {
          isShow: true,
          name: "shirtsinbulk"
        },
        {
          isShow: true,
          name: "simplybuilt"
        },
        {
          isShow: true,
          name: "skyatlas"
        },
        {
          isShow: true,
          name: "skype"
        },
        {
          isShow: true,
          name: "slack"
        },
        {
          isShow: true,
          name: "slideshare"
        },
        {
          isShow: true,
          name: "snapchat"
        },
        {
          isShow: true,
          name: "snapchat-ghost"
        },
        {
          isShow: true,
          name: "snapchat-square"
        },
        {
          isShow: true,
          name: "soundcloud"
        },
        {
          isShow: true,
          name: "spotify"
        },
        {
          isShow: true,
          name: "stack-exchange"
        },
        {
          isShow: true,
          name: "stack-overflow"
        },
        {
          isShow: true,
          name: "steam"
        },
        {
          isShow: true,
          name: "steam-square"
        },
        {
          isShow: true,
          name: "stumbleupon"
        },
        {
          isShow: true,
          name: "stumbleupon-circle"
        },
        {
          isShow: true,
          name: "superpowers"
        },
        {
          isShow: true,
          name: "telegram"
        },
        {
          isShow: true,
          name: "tencent-weibo"
        },
        {
          isShow: true,
          name: "themeisle"
        },
        {
          isShow: true,
          name: "trello"
        },
        {
          isShow: true,
          name: "tripadvisor"
        },
        {
          isShow: true,
          name: "tumblr"
        },
        {
          isShow: true,
          name: "tumblr-square"
        },
        {
          isShow: true,
          name: "twitch"
        },
        {
          isShow: true,
          name: "twitter"
        },
        {
          isShow: true,
          name: "twitter-square"
        },
        {
          isShow: true,
          name: "usb"
        },
        {
          isShow: true,
          name: "viacoin"
        },
        {
          isShow: true,
          name: "viadeo"
        },
        {
          isShow: true,
          name: "viadeo-square"
        },
        {
          isShow: true,
          name: "vimeo"
        },
        {
          isShow: true,
          name: "vimeo-square"
        },
        {
          isShow: true,
          name: "vine"
        },
        {
          isShow: true,
          name: "vk"
        },
        {
          isShow: true,
          name: "wechat"
        },
        {
          isShow: true,
          name: "weibo"
        },
        {
          isShow: true,
          name: "weixin"
        },
        {
          isShow: true,
          name: "whatsapp"
        },
        {
          isShow: true,
          name: "wikipedia-w"
        },
        {
          isShow: true,
          name: "windows"
        },
        {
          isShow: true,
          name: "wordpress"
        },
        {
          isShow: true,
          name: "wpbeginner"
        },
        {
          isShow: true,
          name: "wpexplorer"
        },
        {
          isShow: true,
          name: "wpforms"
        },
        {
          isShow: true,
          name: "xing"
        },
        {
          isShow: true,
          name: "xing-square"
        },
        {
          isShow: true,
          name: "y-combinator"
        },
        {
          isShow: true,
          name: "y-combinator-square"
        },
        {
          isShow: true,
          name: "yahoo"
        },
        {
          isShow: true,
          name: "yc"
        },
        {
          isShow: true,
          name: "yc-square"
        },
        {
          isShow: true,
          name: "yelp"
        },
        {
          isShow: true,
          name: "yoast"
        },
        {
          isShow: true,
          name: "youtube"
        },
        {
          isShow: true,
          name: "youtube-play"
        },
        {
          isShow: true,
          name: "youtube-square"
        },
        {
          isShow: true,
          name: "ambulance"
        },
        {
          isShow: true,
          name: "h-square"
        },
        {
          isShow: true,
          name: "heart"
        },
        {
          isShow: true,
          name: "heart-o"
        },
        {
          isShow: true,
          name: "heartbeat"
        },
        {
          isShow: true,
          name: "hospital-o"
        },
        {
          isShow: true,
          name: "medkit"
        },
        {
          isShow: true,
          name: "plus-square"
        },
        {
          isShow: true,
          name: "stethoscope"
        },
        {
          isShow: true,
          name: "user-md"
        },
        {
          isShow: true,
          name: "wheelchair"
        },
        {
          isShow: true,
          name: "wheelchair-alt"
        }
      ]
    };
  },
  methods: {
    searchIcon(icon) {
      if (typeof icon.toLowerCase === "function") {
        const key = icon.toLowerCase();
        const list = this.icons;
        for (let i = 0; i < list.length; i++) {
          const a = key;
          const b = list[i].name.toLowerCase();
          if (b.indexOf(a) !== -1) {
            list[i].isShow = true;
          } else {
            list[i].isShow = false;
          }
        }
        this.icons = list;
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixins/hairline.less";

.demo-icon {
  font-size: 0;

  .vm-col {
    text-align: center;
    vertical-align: middle;
    height: 80px;
    position: relative;
    padding-top: 10px;

    .vm-icon {
      font-size: 24px;
      margin-bottom: 10px;
    }

    span {
      display: block;
      font-size: 12px;
      line-height: 12px;
      color: #888;
    }

    &::after {
      .hairline();

      border-right-width: 1px;
      border-bottom-width: 1px;
    }
  }
}
</style>
