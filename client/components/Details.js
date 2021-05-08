// eslint-disable-next-line no-undef
const {Button, Form, ProgressBar} = ReactBootstrap
const ls = require('local-storage')

import ReactMarkdown from 'react-markdown'
import Base from './Base'
import WebcamCapture from './WebcamCapture'

import auth from '../utils/Auth'
import config from '../config'

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
      'validateSerial',
      'webcamCallback'
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
        <img src="/images/white-spinner.svg"/>
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
        return <div >
          <Button onClick={this.claimToken}>Claim this token</Button>
          <div className={'claiming'}>To claim a token you need to take a picture of yourself with the inside of the CD cover, showing the serial code. So, please, allow this website to use your camera when requested.</div>
        </div>
      } else if (token.claimer.toLowerCase() === this.Store.signedInAddress.toLowerCase()) {

        console.log(config.supportedId)

        if (config.supportedId[this.Store.chainId]) {
          return <Button onClick={this.mintToken}>Mint your token</Button>
        } else {
          return <div className={'claiming'}>Connect to Goerli Testnet to mint your token</div>
        }
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
          return <span>Owned by<br/><code className={'white'}><small>{token.owner}</small></code></span>
        }
      } else if (token.claimer) {
        if (token.claimer.toLowerCase() === this.Store.signedInAddress.toLowerCase()) {
          return 'Claimed by you'
        } else {
          return <span>Claimed by<br/><code className={'white'}><small>{token.claimer}</small></code></span>
        }
      } else if (ls('claimed' + this.props.token.id) === this.Store.signedInAddress) {
        return <span>
          You have started a claim, and a new video with your favorite song is coming soon.<br/>
          It usually takes less than 24 hours. However, if it takes too long, there might be an error somewhere. If so, please send a message to brokenjazz@sullo.co.
        </span>
      }
    } else {
      return <span>
          <span>To claim this token, please connect your Metamask.</span>
        </span>
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

    const {msgParams, signature} = await auth.getSignedAuthToken(
      this.Store.chainId,
      this.Store.signedInAddress,
      {
        id,
        trackNumber,
        chosenTrack,
        serial
      }
    )

    const res = await this.request(`claim/${id}`, 'post', {
      address: this.Store.signedInAddress,
      msgParams,
      signature,
      picture: this.state.picture
    })
    if (res.success) {
      ls('claimed' + id, this.Store.signedInAddress)
      this.setState({
        claimed: true,
        claimNow: false,
        picture: null
      })
    } else {
      this.setState({
        error: res.error
      })
    }
  }

  webcamCallback(picture) {
    this.setState({
      picture
    })
  }

  getForm() {
    const options = []
    for (let track in this.tracks) {
      options.push(
        <option key={track}>{this.tracks[track]}</option>
      )
    }

    if (this.state.picture) {

      return <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Your address</Form.Label>
          <Form.Control type="text" value={this.Store.signedInAddress} disabled={true}/>
        </Form.Group>
        <div>&nbsp;</div>
        <img src={this.state.picture} width="100%"/>
        <div><span className={'command'} onClick={() => {
          this.setState({
            picture: null
          })
        }}>Retake the picture</span></div>
        <div>&nbsp;</div>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm serial code inside CD cover</Form.Label>
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
    } else {
      return <div>
        <p>Please, take a picture of yourself with the CD cover, so that the serial code is well visible.</p>
        <WebcamCapture
          callback={this.webcamCallback}
        />
      </div>
    }
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

  render() {

    const {token} = this.props
    // let rows = null
    // if (token.comments) {
    //   let i = 1
    //   rows = token.comments.split('\n').map(e => <p key={i++}><b>{e}</b></p>)
    // }

    return (
      <div className={'cardDiv single'} style={{width: this.props.cw}}>
        <div className="cardBody">
          <p className={'tworem'}><b>{token.label}</b></p>
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
                      <p>Track #{parseInt(token.trackNumber)}</p>
                      <p><b style={{fontSize: '1.1rem'}}>{token.trackTitle}</b></p>
                      <p>&nbsp;</p>
                      <p>Original comments about the track:</p>
                      <i><ReactMarkdown children={token.comments}/></i>
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
