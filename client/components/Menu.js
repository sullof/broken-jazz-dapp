// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

// eslint-disable-next-line no-undef
const {Navbar, Button} = ReactBootstrap

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

    let isPhone = this.Store.width < 900

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
          {isPhone ? null :
            <i style={{marginLeft: 5}} onClick={this.expandAddress}
               className="command fa fa-plus-circle"
            />
          }</span>
      }
    }

    let connectedTo = <span style={{color: '#ff2050'}}>{
      this.Store.signedInAddress
        ? 'Connected to an unsupported network'
        : null
    }
    </span>
    let {connectedNetwork} = this.Store

    if (connectedNetwork) {
      connectedTo =
        <span><i className="fa fa-plug" style={{color: '#40cc90', marginRight: 10}}></i> Connected to {connectedNetwork}</span>
    } else {
      // connectedTo = '
    }

    const  getTitle = what => {
      let {which} = this.state
      let title = what === 'yours' ? (isPhone ? 'Yours' : 'Your NFTs') :
        what.substring(0,1).toUpperCase() + what.substring(1) + (isPhone ? '' : ' NFTs')
      if (which === what) {
        return <b>{title}</b>
      } else {
        return title
      }
    }

    return <Navbar fixed="top" bg="light" expand="lg" className={'roboto'}>
      <Navbar.Brand href="/"><span className={'alice'}>Broken Jazz</span></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      {
        this.Store.signedInAddress
          ? <Navbar.Collapse id="responsive-navbar-nav">
            {
              isPhone
                ? null :
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
            }

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
            : <Button onClick={this.props.connect} variant="primary">Connect your Metamask</Button>
        }

      </Navbar.Collapse>
    </Navbar>
  }
}
