import BrokenJazz from './BrokenJazz.json'

const config = {
  supported: {
    'Ganache': 1337,
    'Goerli Testnet': 5,
    // 'Ethereum': 1
  },
  address: {
    1337: '0x32EEce76C2C2e8758584A83Ee2F522D4788feA0f',
    5: '0xEEB9931Fad89cDa0d40289da0CA13a92ef54D31A',
    // 1: '0xEEB9931Fad89cDa0d40289da0CA13a92ef54D31A'
  },
  abi: BrokenJazz.abi
}

config.supportedId = {}
for (let i in config.supported) {
  config.supportedId[config.supported[i]] = i
}

module.exports = config
