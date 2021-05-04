const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const { toChecksumAddress } = require('ethereumjs-util')
const db = require('../lib/Db')
const serials = require('../../db/serials')

router.post('/claim/:tokenId', async (req, res) => {

  const tokenId = req.params.tokenId
  const {address, msgParams, signature} = req.body
  const data = JSON.parse(msgParams)

  const recovered = sigUtil.recoverTypedSignature_v4({
    data,
    sig: signature
  })

  if (toChecksumAddress(address) !== toChecksumAddress(recovered)) {
    res.json({
      success: false,
      error: 'Invalid signature'
    })
  } else {
    const {message} = data
    if (message.serial !== serials[tokenId]) {
      res.json({
        success: false,
        error: 'Wrong serial'
      })
    } else {
      message.claimer = address
      db.set(`claimed_${tokenId}`, message)
      res.json({
        success: true
      })
    }
  }
})


module.exports = router
