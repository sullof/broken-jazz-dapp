module.exports = {

  sleep: async millis => {
    // eslint-disable-next-line no-undef
    return new Promise(resolve => setTimeout(resolve, millis))
  }

}
