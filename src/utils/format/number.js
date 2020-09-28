const range = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

const trimExtraChar = (value, char, regExp) => {
  const index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
};

const formatNumber = (value, allowDot) => {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  value = trimExtraChar(value, '-', /-/g);

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

  return value.replace(regExp, '');
};

export {
  range,
  formatNumber
}
