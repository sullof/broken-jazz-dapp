// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

// eslint-disable-next-line no-undef
const {Navbar, Nav} = ReactBootstrap

import Base from './Base'

export default class Menu extends Base {

  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      expanded: false
    }

    this.bindAll([
      'updateState',
      'toggleAdminMode',
      'makeNotVisible',
      'expandAddress'
    ])
  }

  updateState() {
    this.setState({
      count: this.state.count + 1
    })
  }

  isMe(me) {
    if (!window.location.pathname && me === '/') {
      return 'selected'
    }
    if (window.location.pathname === me) {
      return 'selected'
    }
    return ''
  }

  toggleAdminMode() {
    this.store({
      isAdminMode: !(this.Store.isAdminMode || false)
    })
  }

  makeNotVisible() {
    this.store({
      menuVisibility: false
    })
  }

  expandAddress() {
    this.setState({
      expanded: !this.state.expanded
    })
  }


  render() {

    let address = 'No wallet is connected'
    if (this.Store.signedInAddress) {
      let fullAddress = this.Store.signedInAddress
      let shortAddress = fullAddress.substring(0, 8)
      if (this.state.expanded) {
        address = <span>{this.Store.signedInAddress} <i onClick={this.expandAddress}
                                                        className="command fa fa-minus-circle"
        /></span>
      } else {
        address = <span>{shortAddress} <i onClick={this.expandAddress}
                                          className="command fa fa-plus-circle"
        /></span>
      }
    }

    let connectedTo = <span style={{color: '#ff2050', marginLeft: 120}}>{
      this.Store.signedInAddress
        ? 'Connected to unsupported network'
        : 'Not connected'
    }</span>
    let {connectedNetwork} = this.Store

    if (connectedNetwork) {
      connectedTo =
        <span style={{marginLeft: 120, marginRight: 10}}><i className="fa fa-plug" style={{color: '#40cc90'}}></i> Connected to {connectedNetwork}</span>
    } else {
      // connectedTo = '
    }


    // if (this.Store.
    // <span><i class="fa fa-plug" style="color: rgb(136, 255, 102);"></i> You are connected to the Ropsten Testnet</span>

    return <Navbar bg="light" expand="lg">
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Navbar.Text>
            {connectedTo}
          </Navbar.Text>
        </Nav>

        <span><i className="fas fa-user-astronaut" style={{marginRight: 10}}></i> {address}</span>
      </Navbar.Collapse>
    </Navbar>
  }
}
