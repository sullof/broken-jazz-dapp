const {toChecksumAddress} = require('ethereumjs-util')

class Address {

  static equal(addr1, addr2) {
    try {
      let result = toChecksumAddress(addr1) === toChecksumAddress(addr2)
      return result
    } catch(e) {
      return false
    }

  }
}

module.exports = Address

