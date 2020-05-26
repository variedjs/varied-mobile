export default function number(value) {
  return /^\d+$/.test(value);
}

export function isNumeric(val) {
  return /^\d+(\.\d+)?$/.test(val);
}
