/**
 * 时间戳转字符串
 * @param str
 * @param time
 * @param addZero
 * @returns {string|*}
 * @constructor
 */
function timeStampToStr(time, str, addZero = true) {
    str = str ? str.toLowerCase() : 'y-m-d h:i:s';
    let weeks = ['日', '一', '二', '三', '四', '五', '六'];
    let t = new Date(time * 1000);
    let year = t.getFullYear();
    let month, day, hour, minute, second;
    if (addZero) {
      month = t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1;
      day = t.getDate() < 10 ? '0' + t.getDate() : t.getDate();
      hour = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
      minute = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
      second = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
    } else {
      month = t.getMonth() + 1;
      day = t.getDate();
      hour = t.getHours();
      minute = t.getMinutes();
      second = t.getSeconds();
    }
    let week = weeks[t.getDay()];
  
    return str
      .replace('y', year)
      .replace('m', month)
      .replace('d', day)
      .replace('h', hour)
      .replace('i', minute)
      .replace('s', second)
      .replace('w', week);
  }

  export default {
    timeStampToStr
  }