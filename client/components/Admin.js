// eslint-disable-next-line no-undef
const {Button, Container, Form} = ReactBootstrap

import Base from './Base'

import auth from '../utils/Auth'

async function sleep(millis) {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => setTimeout(resolve, millis))
}

class Admin extends Base {

  constructor(props) {
    super(props)

    this.state = {
      claimNow: false
    }

    this.bindMany([
      'getPreClaims',
      'addClaims',
      'handleChanges'
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

  render() {
      return <Container style={{marginTop: 100}}>
        {
          this.state.error
            ? <p className="big error">
              {this.state.error}
            </p>
            : null
        }
        {this.state.preClaims ? <div><code><pre>{JSON.stringify(this.state.preClaims, null, 2)}</pre></code></div> : null}
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
