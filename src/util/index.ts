/* Admin privileges */
let admin = true;

/**
 * @returns set the value of priv.
 */
export function isAdmin(priv: boolean) {
  admin = priv;
}
/**
 * @returns true if the user has admin privileges or false if not.
 */
export function getAdmin() {
  return admin;
}

/* Date Format */
/**
 * Recives a string called date with the format YYYYMMDD.
 * @returns the string in format YYYY-MM-DD
 */
export function dateFormat(date: string) {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6);
}
/**
 * Recives a string called date with the format YYYY-MM-DD.
 * @returns the string in format YYYYMMDD
 */
export function dateIntFormat(date: string) {
  return date.replaceAll("-", "");
}

import * as controller from "./controllers";
export { controller };

import * as regex from "./regex";
export { regex };
