// eslint-disable-next-line no-undef
const {Button, Form, ProgressBar} = ReactBootstrap
const ls = require('local-storage')

import Base from './Base'

async function sleep(millis) {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => setTimeout(resolve, millis))
}

class Details extends Base {

  constructor(props) {
    super(props)

    this.state = {
      claimNow: false
    }

    this.bindMany([
      'showActions',
      'claimToken',
      'mintToken',
      'getForm',
      'handleChangeSerial',
      'handleChangeTrack',
      'submitClaim',
      'getSignedAuthToken',
      'validateSerial'
    ])

  }

  handleChangeSerial(event) {
    this.setState({
      serial: event.target.value,
      error: null
    })
  }

  handleChangeTrack(event) {
    this.setState({
      track: event.target.value
    })
  }

  showActions(token) {
    if (this.state.minting === token.id) {
      return <div>
        <img src="/images/spinner.svg"/>
        {
          this.state.steps ? <div style={{marginTop: 12}}><ProgressBar animated now={this.state.steps}/></div> : null
        }
      </div>
    }
    if (token.minted) {
      return null
    }
    if (this.Store.signedInAddress) {
      if (token.unclaimed) {
        if (ls('claimed' + this.props.token.id) === this.Store.signedInAddress) {
          return null
        }
        return <Button onClick={this.claimToken}>Claim this token</Button>
      } else if (token.claimer.toLowerCase() === this.Store.signedInAddress.toLowerCase()) {
        return <Button onClick={this.mintToken}>Mint your token</Button>
      }
    } else {
      return null
    }
  }

  ownedBy(token) {
    if (this.Store.signedInAddress) {
      if (token.owner) {
        if (token.owner.toLowerCase() === this.Store.signedInAddress.toLowerCase()) {
          return 'Owned by you'
        } else {
          return `Owned by ${token.owner}`
        }
      } else if (token.claimer) {
        if (token.claimer.toLowerCase() === this.Store.signedInAddress.toLowerCase()) {
          return 'Claimed by you'
        } else {
          return `Claimed by ${token.claimer}`
        }
      } else if (ls('claimed' + this.props.token.id) === this.Store.signedInAddress) {
        return 'A claim has been started by you. Francesco will generate a new video for you. It could take a couple of days. Come back later :-)'
      }
    }
    return null
  }

  async claimToken() {
    const res = await this.request('tracks', 'get')
    this.tracks = res.tracks
    this.setState({
      claimNow: true
    })
  }

  async getSignedAuthToken(id, trackNumber, chosenTrack, serial) {

    const msgParams = JSON.stringify({
      domain: {
        chainId: this.Store.chainId,
        name: 'Broken Jazz NFT',
        version: '1',
      },
      message: {
        id,
        trackNumber,
        chosenTrack,
        serial
      },
      primaryType: 'Claim',
      types: {
        EIP712Domain: [
          {name: 'name', type: 'string'},
          {name: 'version', type: 'string'},
          {name: 'chainId', type: 'uint256'}
        ],
        Claim: [
          {name: 'id', type: 'string'},
          {name: 'trackNumber', type: 'string'},
          {name: 'chosenTrack', type: 'string'},
          {name: 'serial', type: 'string'},
        ]
      }
    })
    const params = [this.Store.signedInAddress, msgParams]
    const method = 'eth_signTypedData_v4'

    const signature = await window.ethereum.request({
      method,
      params,
      from: this.Store.signedInAddress,
    })
    return {msgParams, signature}
  }

  validateSerial(serial) {
    if (/[^0-9X-]/.test(serial) || serial.length !== 6) {
      this.setState({
        error: 'Invalid serial'
      })
      return false
    } else {
      this.setState({
        error: null
      })
      return true
    }
  }

  async submitClaim() {

    const serial = this.state.serial.toUpperCase()
    if (!this.validateSerial(serial)) {
      return
    }

    let chosenTrack = this.state.track || 'Broken Jazz'
    let trackNumber

    for (let track in this.tracks) {
      if (this.tracks[track] === chosenTrack) {
        trackNumber = track
        break
      }
    }

    const {id} = this.props.token

    const {msgParams, signature} = await this.getSignedAuthToken(
      id,
      trackNumber,
      chosenTrack,
      serial)

    const res = await this.request(`claim/${id}`, 'post', {
      address: this.Store.signedInAddress,
      msgParams,
      signature
    })
    if (res.success) {
      ls('claimed' + id, this.Store.signedInAddress)
      this.setState({
        claimed: true,
        claimNow: false
      })
    } else {
      this.setState({
        error: res.error
      })
    }
  }

  getForm() {
    const options = []
    for (let track in this.tracks) {
      options.push(
        <option key={track}>{this.tracks[track]}</option>
      )
    }

    return <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" value={this.Store.signedInAddress} disabled={true}/>
      </Form.Group>
      <div>&nbsp;</div>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Serial code inside CD cover</Form.Label>
        <Form.Control type="text"
                      onChange={this.handleChangeSerial}
                      placeholder="Serial"/>
      </Form.Group>
      {
        this.state.error
          ? <Form.Text className="text-muted error">
            {this.state.error}
          </Form.Text>
          : null

      }
      <div>&nbsp;</div>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Track you like to have on video</Form.Label>
        <Form.Control as="select"
                      onChange={this.handleChangeTrack}>
          {options}
        </Form.Control>
      </Form.Group>
      <div>&nbsp;</div>
      <Button variant="primary" type="button" onClick={this.submitClaim}>
        Claim
      </Button>
    </Form>
  }

  async mintToken() {
    const {token} = this.props
    this.setState({
      minting: token.id
    })
    await this.Store.contract.connect(this.Store.signer).claimToken(token.id, token.metadataURI, token.signature)

    let c = 0
    // eslint-disable-next-line no-constant-condition
    while (true) {
      c++
      if (c === 5) {
        try {
          await this.Store.contract.ownerOf(token.id)
          break
        } catch (e) {
        }
        c = 0
      }
      this.setState({
        steps: (this.state.steps || 1) + 1
      })
      await sleep(1000)
    }
    this.setState({
      minting: null
    })
    this.props.getTokens(true)
  }

  tokenData(token = {id: 0}) {
    let {id} = token
    let title = `Broken Jazz ${id < 51
      ? 'NE ' + id + '/50'
      : id === 54
        ? 'AC 1/1'
        : 'AP ' + (id - 50) + '/3'}`

    return <span>{title}</span>
  }

  render() {

    const {token} = this.props
    let rows = null
    if (token.comments) {
      let i = 1
      rows = token.comments.split('\n').map(e => <p key={i++}><b>{e}</b></p>)
    }

    return (
      <div className={'cardDiv single'} style={{width: this.props.cw, height: this.props.cw + 26}}>
        <div className="cardBody">
          <p className={'tworem'}><b>{this.tokenData(token)}</b></p>
          <p style={{fontSize: '0.9rem'}}>{this.ownedBy(token)}</p>
          {
            this.state.claimNow
              ? this.getForm()
              : <div>
                {this.showActions(token)}
                {
                  token.comments
                    ?
                    <div>
                      <p>&nbsp;</p>
                      <p>Track #{parseInt(token.metadata.attributes[0].value)}:</p>
                      <p><b style={{fontSize: '1.1rem'}}>{token.metadata.attributes[1].value}</b></p>
                      <p>Original comments about the track:</p>
                      {rows}
                    </div>
                    : null
                }
              </div>
          }
        </div>
      </div>
    )

  }
}


module.exports = Details
