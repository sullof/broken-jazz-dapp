// eslint-disable-next-line no-undef
const {BrowserRouter, Route} = ReactRouterDOM

// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

import { Web3Provider } from '@ethersproject/providers'
import Web3Modal from 'web3modal'

import { Contract } from '@ethersproject/contracts'

import config from '../config'

import ls from 'local-storage'

import Common from './Common'
import Menu from './Menu'
import Home from './Home'
import Info from './Info'

export default class App extends Common {

  constructor(props) {
    super(props)

    this.state = {
      Store: {
        content: {},
        editing: {},
        temp: {},
        menuVisibility: false
      }
    }
    this.setStore = this.setStore.bind(this)
    this.getContract = this.getContract.bind(this)
    let accessToken = ls('accessToken')
    if (accessToken) {
      if (Array.isArray(accessToken)) {
        accessToken = accessToken[0]
      }
      const deadline = parseInt(accessToken.split(';')[2])
      if (Date.now() > deadline) {
        ls.remove('accessToken')
      } else {
        this.setStore({accessToken})
      }
    }
    let email = ls('email')
    if (email) {
      this.setStore({email})
    }
  }

  async componentDidMount() {

    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions: {
      }
    })

    const provider = await web3Modal.connect()

    provider.on('accountsChanged', accounts => {
      this.setStore({
        accounts
      })
    })

    provider.on('chainChanged', chainId => {

      chainId = parseInt(chainId)
      this.setStore({
        chainId
      })
      this.getContract(config, chainId, this.state.Store.web3Provider)

    })

    provider.on('connect', info => {
      this.setStore({
        chainId: parseInt(info.chainId)
      })
    })

    provider.on('disconnect', error => {
      this.setStore({
        disconnectError: {
          code: error.code,
          message: error.message
        }
      })
    })

    const web3Provider = new Web3Provider(provider)
    const signedInAddress = provider.selectedAddress
    const chainId = parseInt(web3Provider.provider.chainId)

    this.getContract(config, chainId, web3Provider)
    this.setStore({
      provider,
      web3Provider,
      signedInAddress,
      chainId
    })
  }

  getContract(config, chainId, web3Provider) {
    let contract
    let networkNotSupported = false
    let connectedNetwork = null

    if (config.address[chainId]) {
      contract = new Contract(config.address[chainId], config.abi, web3Provider)
      connectedNetwork = config.supportedId[chainId]
    } else {
      networkNotSupported = true
    }
    this.setStore({
      contract,
      connectedNetwork,
      networkNotSupported
    })
  }

  setStore(newProps, localStorage) {
    let store = this.state.Store
    for (let i in newProps) {
      if (newProps[i] === null) {
        if (localStorage) {
          ls.remove(i)
        }
        delete store[i]
      } else {
        if (localStorage) {
          ls(i, newProps[i])
        }
        store[i] = newProps[i]
      }
    }
    this.setState({
      Store: store
    })
  }

  render() {

    const home = () => {
      return (
        <Home
          Store={this.state.Store}
          setStore={this.setStore}
        />
      )
    }

    // const signout = () => {
    //   return (
    //     <Signout
    //       Store={this.state.Store}
    //       setStore={this.setStore}
    //     />
    //   )
    // }

    const info = () => {
      return (
        <Info
          Store={this.state.Store}
          setStore={this.setStore}
        />
      )
    }

    return <BrowserRouter>
      <Menu
        Store={this.state.Store}
        setStore={this.setStore}
      />
      <main>
        <img src="/images/BrokenJazz-logo-small.png" className="imageLogo"/>
        <Container>
          <Row>
            <Col style={{margin: 16}}>
              <Route exact path="/" component={home}/>
              {/*<Route exact path="/signout" component={signout}/>*/}
              <Route exact path="/info" component={info}/>
            </Col>
          </Row>
        </Container>
      </main>

    </BrowserRouter>
  }
}
