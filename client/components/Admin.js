// eslint-disable-next-line no-undef
const {Button, Container, Form} = ReactBootstrap


import Base from './Base'

import auth from '../utils/Auth'

class Admin extends Base {

  constructor(props) {
    super(props)

    this.state = {
      claimNow: false
    }

    this.bindMany([
      'getPreClaims',
      'addClaims',
      'handleChanges',
      'getClaimAndProofs'
    ])

  }

  handleChanges(event) {
    this.setState({
      claims: event.target.value,
      success: null
    })
  }

  async getPreClaims() {

    this.setState({
      success: null
    })

    const {msgParams, signature} = await auth.getSignedAuthToken(
        this.Store.chainId,
        this.Store.signedInAddress,
        {
          api: 'get-preclaims'
        }
      )

    const res = await this.request('admin', 'post', {
      msgParams,
      signature
    })
    if (res.success) {
      this.setState({
        preClaims: res.preClaims
      })
    } else {
      this.setState({
        error: res.error
      })
    }
  }

  async addClaims() {
    const {msgParams, signature} = await auth.getSignedAuthToken(
      this.Store.chainId,
      this.Store.signedInAddress,
      {
        api: 'set-claims'
      }
    )
    const res = await this.request('admin', 'post', {
      msgParams,
      signature,
      params: this.state.claims
    })
    if (res.success) {
      this.setState({
        success: true
      })
    } else {
      this.setState({
        error: res.error
      })
    }
  }

  getClaimAndProofs() {
    if (!this.state.preClaims) {
      return null
    }
    let rows = []
    let i = 0
    for (let key in this.state.preClaims) {
      let c = this.state.preClaims[key]
      rows.push(
        <img  style={{margin: '12px 0'}} key={i+1} src={`data:image/jpeg;base64,${c.base64Image}`} />
      )
      delete c.base64Image
      rows.push(
        <div key={i} style={{marginBottom: 12}}><code><pre className={'white'}>{JSON.stringify(c, null, 2)}</pre></code></div>
      )
      i += 2
    }
    return <div>{rows}</div>
  }

  render() {
      return <Container style={{marginTop: 100}}>
        {
          this.state.error
            ? <p className="big error">
              {this.state.error}
            </p>
            : null
        }
        {
          this.getClaimAndProofs()
        }
        <div><Button variant="primary" onClick={this.getPreClaims}>Load preclaims</Button></div>
        <p>&nbsp;</p>
        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Add new claims</Form.Label>
            <Form.Control as="textarea" rows={4} onChange={this.handleChanges}/>
          </Form.Group>
          <div>&nbsp;</div>
          <Button variant="primary" type="button" onClick={this.addClaims}>
            Add claims
          </Button>
          {this.state.success ? <p>New claims added</p> : null}
        </Form>
      </Container>

  }
}


module.exports = Admin
