const validator = require("validator");

class Validator {
  static isRFC(rfc) {
    const regex =
      /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
    return regex.test(rfc);
  }

  static isName(name) {
    const regex =
      /[a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ,' ']+/;
    const junkCharsRegex = /[\x20-\x40\x5b-\x60\x7b-\x7e]/g;
    return name !== "" && regex.test(name) && !junkCharsRegex.test(name);
  }
}
module.exports = Validator;
