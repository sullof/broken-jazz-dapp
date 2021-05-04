// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

// eslint-disable-next-line no-undef
const {Navbar} = ReactBootstrap

import Base from './Base'

export default class Menu extends Base {

  constructor(props) {
    super(props)

    this.state = {
      expanded: false,
      which: window.location.pathname.split('/')[2]
    }

    this.bindMany([
      'expandAddress',
      'checkPathname'
    ])

  }

  componentDidMount() {
    this.checkPathname()
  }

  expandAddress() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  checkPathname() {
    let which = window.location.pathname.split('/')[2]
    if (which !== this.state) {
      this.setState({
        which
      })
    }
    setTimeout(this.checkPathname, 500)
  }


  render() {

    let address = null
    let shortAddress
    if (this.Store.signedInAddress) {
      let fullAddress = this.Store.signedInAddress
      shortAddress = fullAddress.substring(0, 8)
      if (this.state.expanded) {
        address = <span>{this.Store.signedInAddress} <i onClick={this.expandAddress}
                                                        className="command fa fa-minus-circle"
        /></span>
      } else {
        address = <span>{shortAddress}
          <i style={{marginLeft: 5}} onClick={this.expandAddress}
             className="command fa fa-plus-circle"
          /></span>
      }
    }

    let connectedTo = <span style={{color: '#ff2050'}}>{
      this.Store.signedInAddress
        ? 'Connected to an unsupported network'
        : 'Not connected'
    }
      <i style={{marginLeft: 5}} className="command fas fa-question-circle"></i>
    </span>
    let {connectedNetwork} = this.Store

    if (connectedNetwork) {
      connectedTo =
        <span><i className="fa fa-plug" style={{color: '#40cc90', marginRight: 10}}></i> Connected to {connectedNetwork}</span>
    } else {
      // connectedTo = '
    }


    // if (this.Store.
    // <span><i class="fa fa-plug" style="color: rgb(136, 255, 102);"></i> You are connected to the Ropsten Testnet</span>

    const  getTitle = what => {
      let {which} = this.state
      let title = what.substring(0,1).toUpperCase() + what.substring(1) + ' NFTs'
      if (which === what) {
        return <b>{title}</b>
      } else {
        return title
      }
    }

    return <Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand href="/">Broken Jazz</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      {
        this.Store.signedInAddress
          ? <Navbar.Collapse id="responsive-navbar-nav">
            &nbsp; &nbsp;
            <Link to="/items/claimed"><i className="fas fa-chart-pie"></i> {getTitle('claimed')}</Link>

            <Link to="/items/minted"><i className="fas fa-bowling-ball"></i> {getTitle('minted')}</Link>

            <Link to="/items/unclaimed"><i className="fas fa-baby-carriage"></i> {getTitle('unclaimed')}</Link>

            <Link to="/items/yours"><i className="fas fa-cannabis"></i> {getTitle('yours')}</Link>
          </Navbar.Collapse>
          : null
      }
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {connectedTo}
        </Navbar.Text>
        {
          this.Store.signedInAddress
            ? <Navbar.Text>
              <i className="fas fa-user-astronaut" style={{marginRight: 10}}></i>
              {address}
            </Navbar.Text>
            : null
        }

      </Navbar.Collapse>
    </Navbar>
  }
}
