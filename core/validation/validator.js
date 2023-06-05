const validator = require("validator");

class Validator {
  static isRFC(rfc) {
    const regex =
      /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
    return regex.test(rfc);
  }

  static isEmail(email) {
    return validator.isEmail(email);
  }

  static isCURP(curp) {
    const regex =
      /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/;
    return true;
  }

  static isName(name) {
    const regex =
      /[a-z,A-Z,á,é,í,ó,ú,â,ê,ô,ã,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ã,Õ,Ç,ü,ñ,Ü,Ñ,\s]+/;
    const junkCharsRegex = /[\x21-\x40\x5b-\x60\x7b-\x7e]/;

    return name !== "" && regex.test(name) && !junkCharsRegex.test(name);
  }

  /**
   * @param {string} phone
   * @returns
   */
  static isPhone(phone) {
    const invalidLadas = ["123", "111", "000", "101"];
    for (const lada of invalidLadas) {
      if (phone.slice(0, 3) === lada) {
        return false;
      }
    }
    return validator.isMobilePhone(phone, "es-MX");
  }
}
module.exports = Validator;
