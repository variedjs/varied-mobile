import { isDef, inBrowser } from "../index";
import { isNumeric } from "../validate/number";

export function addUnit(value, den = 1) {
  if (!isDef(value)) {
    return undefined;
  }

  if (den > 1 && typeof value === "string") {
    let size = value.replace(/[^0-9]/gi, "");
    let values = value.split(size);
    value = size / den + values[1];
  }

  value = String(value);

  return isNumeric(value) ? `${value / den}px` : value;
}

// cache
let rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize =
      doc.style.fontSize || window.getComputedStyle(doc).fontSize;

    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, "");
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, "");
  return (+value * window.innerWidth) / 100;
}

export function unitToPx(value) {
  if (typeof value === "number") {
    return value;
  }

  if (inBrowser) {
    if (value.indexOf("rem") !== -1) {
      return convertRem(value);
    }

    if (value.indexOf("vw") !== -1) {
      return convertVw(value);
    }
  }

  return parseFloat(value);
}
