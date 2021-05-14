// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

// eslint-disable-next-line no-undef
const {Navbar, Button} = ReactBootstrap

import Address from '../utils/Address'
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

    let connectedTo = <span className={'connected'}>{
      this.Store.signedInAddress
        ? <span className={'notConnected'}>Connected to an unsupported network</span>
        : null
    }
    </span>
    let {connectedNetwork} = this.Store

    if (connectedNetwork) {
      connectedTo =
        <span><i className="fa fa-plug"
                 style={{color: '#40cc90', marginRight: 10}}/> Connected to {connectedNetwork}</span>
    } else {
      // connectedTo = '
    }

    const getTitle = (what, title) => {
      let {which} = this.state
      title = title || what.substring(0, 1).toUpperCase() + what.substring(1)
      if (which === what) {
        return <b>{title}</b>
      } else {
        return title
      }
    }

    return <Navbar fixed="top" bg="dark" expand="lg" className={'roboto'}>
      <Navbar.Brand href="/"><b className={'istok white'}>Broken Jazz</b></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Link to="/" className={'cyan'}><i className="fab fa-itunes-note"/> Tracks</Link>
        <Link to="/intro" className={'cyan'}><i className="fas fa-book-open"/> Intro</Link>
        <Link to="/credits" className={'cyan'}><i className="fas fa-copyright"/> Credits</Link>

        <div className={'splitter'}><br/></div>

        <Link to="/items/unclaimed"><i className="fas fa-baby-carriage"/> {getTitle('unclaimed', 'Available')}</Link>

        <Link to="/items/claimed"><i className="fas fa-chart-pie"/> {getTitle('claimed')}</Link>

        <Link to="/items/minted"><i className="fas fa-bowling-ball"/> {getTitle('minted')}</Link>


        <Link to="/items/yours"><i className="fas fa-cannabis"/> {getTitle('yours')}</Link>

        <div className={'splitter2'}><br/></div>

      </Navbar.Collapse>

      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {connectedTo}
        </Navbar.Text>
        {
          this.Store.signedInAddress
            ? <Navbar.Text>
              <i className="fas fa-user-astronaut" style={{marginRight: 10}}/>
              {address}
            </Navbar.Text>
            : <Button onClick={this.props.connect} variant="primary">Connect your Metamask</Button>
        }
        {
          Address.isAdmin(this.Store.signedInAddress)
            ? <Navbar.Text>
              <Link to="/admin"><i className="fas fa-tools"/> Admin</Link>
            </Navbar.Text>
            : null
        }

      </Navbar.Collapse>
    </Navbar>
  }
}
