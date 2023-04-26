export let admin = true;

export function isAdmin(priv: boolean) {
  admin = priv;
}
