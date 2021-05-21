const express = require('express')
const router = express.Router()
const sigUtil = require('eth-sig-util')
const db = require('../lib/Db')
const Address = require('../../client/utils/Address')
const path = require('path')
const fs = require('fs-extra')
const {getContract} = require('../lib/utils')
const bot = require('../lib/bot')

async function savePicture(picture, serial, address) {
  const base64Data = picture.replace(/^[^,]+,/, '')
  const proofs = path.resolve(__dirname, '../../db/proofs')
  await fs.ensureDir(proofs)
  const fn = [address, serial].join('_') + '.png'
  await fs.writeFile(path.resolve(proofs, fn), base64Data, {encoding: 'base64'})
}

async function getPictureAsBase64(serial, address) {
  const proofs = path.resolve(__dirname, '../../db/proofs')
  const fn = [address, serial].join('_') + '.png'
  return fs.readFile(path.resolve(proofs, fn), 'base64')
}

router.post('/claim/:tokenId', async (req, res) => {

  const tokenId = req.params.tokenId
  const {address, signature, picture} = req.body
  const msgParams = JSON.parse(req.body.msgParams)

  const recovered = sigUtil.recoverTypedSignature_v4({
    data: msgParams,
    sig: signature
  })

  if (Address.equal(address, recovered)) {
    const data = JSON.parse(msgParams.message.data)
    if (Date.now() - data.timestamp > 30000) {
      res.json({
        success: false,
        error: 'Expired signature'
      })
    } else {
      const serials = db.get('serials')
      if (data.serial !== serials[tokenId]) {
        res.json({
          success: false,
          error: 'Wrong serial'
        })
      } else {
        await savePicture(picture, data.serial, address)
        data.claimer = address
        let preClaimed = db.get('preClaimed') || {}
        preClaimed[[address, tokenId].join('_')] = data
        db.set('preClaimed', preClaimed)
        if (process.env.NODE_ENV !== 'production') {
          bot.sendMessage(`New claim for BKJZ ${data.id}/50 by ${data.claimer.substring(0, 10)}`)
        }
        res.json({
          success: true
        })
      }
    }
  } else {
    res.json({
      success: false,
      error: 'Invalid signature'
    })
  }
})

router.get('/tracks', async (req, res) => {
  const claimed = db.get('claimed') || {}
  const preClaimed = db.get('preClaimed') || {}
  const tracks = db.get('tracks')

  let allClaimed = 0
  const usedTracks = {}
  const add = t => {
    if (!usedTracks[t]) {
      usedTracks[t] = 0
    }
    usedTracks[t]++
    allClaimed++
  }

  for (let id in claimed) {
    let t = claimed[id].trackNumber
    add(t)
  }

  for (let id in preClaimed) {
    if (!claimed[preClaimed[id].id]) {
      add(preClaimed[id].trackNumber)
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

let cachedOwners = {}
let lastCachedAt = {}

router.get('/tokens', async (req, res) => {
  let {forceReload, chainId} = req.query
  chainId = parseInt(chainId)
  if (!cachedOwners[chainId] || forceReload || Date.now() - lastCachedAt[chainId] > 300000) {
    cachedOwners[chainId] = {}
  }
  let tokens = db.get('claimed') || {}
  // const contract = getContract(chainId)
  // if (contract) {
  //   for (let id in tokens) {
  //     let token = tokens[id]
  //     if (cachedOwners[chainId][id]) {
  //       token.owner = cachedOwners[chainId][id]
  //     } else {
  //       try {
  //         let owner = await contract.ownerOf(id)
  //         cachedOwners[chainId][id] = token.owner = owner
  //         lastCachedAt[chainId] = Date.now()
  //       } catch (e) {
  //         delete token.owner
  //         // console.error(e.message)
  //       }
  //     }
  //   }
  // }
  res.json({
    success: true,
    tokens
  })
})


router.post('/admin', async (req, res) => {
  const msgParams = JSON.parse(req.body.msgParams)
  const params = JSON.parse(req.body.params || '{}')

  const recovered = sigUtil.recoverTypedSignature_v4({
    data: msgParams,
    sig: req.body.signature
  })

  if (Address.isAdmin(recovered)) {
    const data = JSON.parse(msgParams.message.data)
    if (Date.now() - data.timestamp > 30000) {
      res.json({
        success: false,
        error: 'Expired signature'
      })
    } else {
      const {api} = data
      if (api === 'get-preclaims') {
        let preClaimed = db.get('preClaimed')
        for (let key in preClaimed) {
          let {serial, claimer} = preClaimed[key]
          preClaimed[key].base64Image = await getPictureAsBase64(serial, claimer)
        }
        res.json({
          success: true,
          preClaims: preClaimed
        })
      } else if (api === 'set-claims') {
        const preClaimed = db.get('preClaimed') || {}
        const claimed = db.get('claimed') || {}
        let ok = false
        for (let id in params) {
          let c = params[id]
          if (claimed[id] || !c.signature) {
            continue
          }
          claimed[id] = {
            metadataURI: c.metadataURI,
            name: c.metadata.name,
            imageURI: c.metadata.image,
            trackNumber: parseInt(c.metadata.attributes[0].value),
            trackTitle: c.metadata.attributes[1].value,
            claimer: c.claimer,
            signature: c.signature
          }
          for (let key in preClaimed) {
            let kid = key.split('_')[1]
            if (kid === id) {
              delete preClaimed[key]
            }
          }
          ok = true
        }
        if (ok) {
          db.set('claimed', claimed)
          db.set('preClaimed', preClaimed)
        }
        res.json({
          success: true
        })
      }
    }
  } else {
    res.json({
      success: false,
      error: 'Forbidden'
    })
  }
})


module.exports = router

