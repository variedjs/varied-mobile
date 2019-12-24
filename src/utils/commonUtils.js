/**
 * Created by Heath on 2019/9/27.
 */
const $VaguePhone = phone => {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};
const $RemoveLastChar = val => {
  return val.substring(0, val.length - 1);
};
const $RemoveItem = (list, start, end) => {
  let newList = [];
  try {
    list.forEach((val, index) => {
      if (index <= start || index > end) {
        newList.push(val);
      }
    });
  } catch (e) {
    console.error(e);
  }
  return newList;
};
const $GetCalendar = (year, month, isZero) => {
  let dayObj = {}, dayList = [], preDayList = [], lastDayList = [], now = new Date(year, month, 0),
    pre = new Date(year, month - 1, 0);
  let dayCount = now.getDate();
  let preDayCount = pre.getDate();
  let preWeek = new Date(Date.parse(year + "/" + month + "/1")).getDay();
  let lastWeek = new Date(Date.parse(year + "/" + month + "/" + dayCount)).getDay();
  console.log(preWeek)
  console.log(lastWeek, dayCount)
  for (let i = (preDayCount - preWeek + 1); i < preDayCount + 1; i++) {
    isZero ? i < 10 ? preDayList.push('0' + i) : preDayList.push(i + '') : preDayList.push(i + '');
  }
  if (lastWeek !== 6) {
    for (let i = 1; i < 7 - lastWeek; i++) {
      isZero ? i < 10 ? lastDayList.push('0' + i) : lastDayList.push(i + '') : lastDayList.push(i + '');
    }
  }
  for (let i = 1; i < dayCount + 1; i++) {
    isZero ? i < 10 ? dayList.push('0' + i) : dayList.push(i + '') : dayList.push(i + '');
  }
  dayObj.pre = preDayList;
  dayObj.cur = dayList;
  dayObj.last = lastDayList;
  return dayObj;
};
const $ObjectFlashback = (Object) => {
  let temp = {};
  let keys = [];
  let vals = [];
  for (let key in Object) {
    keys.push(key);
    vals.push(Object[key]);
  }
  for (let i = 0; i < keys.length; i++) {
    temp[keys[i]] = vals[keys.length - 1 - i];
  }
  console.log(temp);
  return temp;
};
// const $RemoveLastItem = (list) => {
//   let newList = [];
//   try {
//     list.forEach((val, index) => {
//       if (index < list.length - 1) {
//         newList.push(val);
//       }
//     });
//   } catch (e) {
//     console.error(e);
//   }
//   return newList;
// };
export {
  $VaguePhone, $RemoveLastChar, $RemoveItem, $GetCalendar, $ObjectFlashback,
};
/* eslint-enable */
