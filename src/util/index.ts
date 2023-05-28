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

import * as controller from "./controllers";
export { controller };

import * as format from "./format";
export { format };

import * as regex from "./regex";
export { regex };

import * as arrays from "./arrays";
export { arrays };

import * as printFormat from "./printFormats"
export { printFormat}
