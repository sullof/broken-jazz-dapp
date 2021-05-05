const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const {toChecksumAddress} = require('ethereumjs-util')
const db = require('../lib/Db')
const serials = require('../../db/serials')
const path = require('path')
const fs = require('fs-extra')

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

router.get('/tracks', async (req, res) => {
  const tokens = JSON.parse(await fs.readFile(path.resolve(__dirname, '../../db/index.json'), 'utf-8'))
  const data = JSON.parse(await fs.readFile(path.resolve(__dirname, '../../db/data.json'), 'utf-8'))
  const tracks = JSON.parse(await fs.readFile(path.resolve(__dirname, '../../common/tracks.json'), 'utf-8'))

  let allClaimed = 0
  const usedTracks = {}
  const add = t => {
    if (!usedTracks[t]) {
      usedTracks[t] = 0
    }
    usedTracks[t]++
    allClaimed++
  }

  for (let id in tokens) {
    let t = tokens[id].metadata.attributes[0].value
    add(t)
  }

  for (let id in data) {
    if (!tokens[data[id].id]) {
      add(data[id].trackNumber)
    }
  }

  let alls = []
  for (let t in usedTracks) {
    alls.push({t, n: usedTracks[t]})
  }
  alls.sort((a, b) => {
    let A = a.n
    let B = b.n
    return A > B ? -1 : A < B ? 1 : 0
  })

  if (54 - allClaimed < 31) {
    let j = 0
    for (let i = 54 - allClaimed; i < 31; i++) {
      let t = parseInt(alls[j++].t)
      delete tracks[t]
    }
  }

  res.json({
    success: true,
    tracks
  })

})

module.exports = router

