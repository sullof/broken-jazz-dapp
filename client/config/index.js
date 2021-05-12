const BrokenJazz = require('./BrokenJazz.json')

let isDev
if (typeof window !== 'undefined') {
  isDev = /localhost/.test(window.location.host)
} else if (typeof process !== undefined && process.env) {
  isDev = process.env.NODE_ENV === 'development'
}

const config = {
  constants: {
    // GOERLI: 5,
    MAINNET: 1,
    GANACHE: 1337
  },
  supported: {
    'Ganache': 1337,
    // 'Goerli Testnet': 5,
    'Ethereum': 1
  },
  supportedId: {
    1337: isDev,
    // 5: true,
    1: true
  },
  address: {
    1337: '0x32EEce76C2C2e8758584A83Ee2F522D4788feA0f',
    // 5: '0x7b647966E070623C9CC96C3d7f635E47dAAEaBaF',
    1: '0xEEB9931Fad89cDa0d40289da0CA13a92ef54D31A'
  },
  abi: BrokenJazz.abi
}

module.exports = config
