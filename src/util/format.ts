import { months } from "./arrays";

/* Date Format */
/**
 * Recives a string called date with the format YYYYMMDD.
 * @returns the string in format YYYY-MM-DD
 */
export function dateHTMLFormat(date: string) {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
}
/**
 * Recives a string called date with the format YYYY-MM-DD.
 * @returns the string in format YYYYMMDD
 */
export function dateIntFormat(date: string) {
  return date.replaceAll("-", "");
}

/**
 * Recives a string called date with the format YYYY-MM-DD.
 * @returns the string in format YYYYMMDD
 */
export function dateStringFormat(date: string) {
  let month;
  try {
    month = parseInt(date.slice(4, 6)) - 1;
  } catch (error) {
    month = 0;
  }
  return date.slice(6) + "/" + months[month] + "/" + date.slice(0, 4);
}

/* Phone Format */
/**
 * Recives a string with a phone number.
 * @returns the phone number in format XXX-XXX-XXXX
 */
export function phoneStringFormat(phone: string) {
  if (phone !== undefined) {
    return phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
  }
  return "";
}

/* Number Format */
/**
 * Recives a number.
 * @returns the number in format X.XX
 */
export function numberDecFormat(num: number) {
  const aux = (Math.round(num * 100) / 100).toFixed(2);
  if (num >= 0) {
    return "+" + aux;
  }
  return aux + "";
}

/* Text Format */
/**
 * Recives a text.
 * @returns
 */
export function nameFormat(txt: string) {
  txt = txt.toLowerCase();
  let arr = txt.split(" ");
  txt = "";
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    var aux = element.charAt(0).toUpperCase();
    txt += aux + element.slice(1) + " ";
  }
  return txt.trim();
}
