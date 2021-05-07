// eslint-disable-next-line no-undef
// const {BrowserRouter, Route //, Link
// } = ReactRouterDOM

// eslint-disable-next-line no-undef
import Address from '../utils/Address'

// eslint-disable-next-line no-undef
const {BrowserRouter, Route, Switch, Redirect} = ReactRouterDOM

// eslint-disable-next-line no-undef
const {Modal, Button} = ReactBootstrap

const ethers = require('ethers')

// import {Web3Provider} from '@ethersproject/providers'
// import Web3Modal from 'web3modal'

import {Contract} from '@ethersproject/contracts'

import config from '../config'

import ls from 'local-storage'

import Common from './Common'
import Menu from './Menu'
import Home from './Home'
import Items from './Items'
import Admin from './Admin'
import Error404 from './Error404'
import Footer from './Footer'
import Credits from './Credits'
import Intro from './Intro'

class App extends Common {

  constructor(props) {
    super(props)

    this.state = {
      Store: {
        content: {},
        editing: {},
        temp: {},
        menuVisibility: false,
        config,
        width: this.getWidth()
      }
    }

    this.bindMany([
      'handleClose',
      'handleShow',
      'setStore',
      'getContract',
      'updateDimensions',
      'showModal'
    ])
  }

  getWidth() {
    // let width = 2 * (window.innerWidth - 100) / 6
    // if (window.innerWidth < 800) {
    //   width = window.innerWidth - 50
    // }
    return window.innerWidth
  }

  updateDimensions() {
    this.setStore({
      width: this.getWidth()
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }


  handleClose() {
    this.setState({show: false})
  }

  handleShow() {
    this.setState({show: true})
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateDimensions.bind(this))
    await this.connect(true)
  }

  async setWallet() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const chainId = (await provider.getNetwork()).chainId
      const signedInAddress = await signer.getAddress()

      const {
        contract,
        connectedNetwork,
        networkNotSupported
      } = this.getContract(config, chainId, provider)

      this.setStore({
        provider,
        signer,
        signedInAddress,
        chainId,
        contract,
        connectedNetwork,
        networkNotSupported
      })
    } catch (e) {
      window.location.reload()
    }
  }

  async connect(dontShowError) {

    if (typeof window.ethereum !== 'undefined') {

      if (await window.ethereum.request({method: 'eth_requestAccounts'})) {

        window.ethereum.on('accountsChanged', () => this.setWallet())
        window.ethereum.on('chainChanged', () => window.location.reload())
        window.ethereum.on('disconnect', () => window.location.reload())

        this.setWallet()
      }

    } else {

      // if (!dontShowError) {
      //   this.showModal(
      //     'No wallet extention found',
      //     'Please, activate your wallet and reload the page',
      //     'Ok'
      //   )
      // }
    }

  }

  showModal(modalTitle, modalBody, modalClose, secondButton, modalAction) {
    this.setStore({
      modalTitle,
      modalBody,
      modalClose,
      secondButton,
      modalAction,
      showModal: true
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
    return {
      contract,
      connectedNetwork,
      networkNotSupported
    }
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

    const Store = this.state.Store

    const items = (params) => {
      return (
        <Items
          Store={Store}
          setStore={this.setStore}
          pathname={params.match.url}
        />
      )
    }

    return <BrowserRouter>
      <Menu
        Store={Store}
        setStore={this.setStore}
        connect={this.connect}
      />
      <main>
        <Switch>
          <Route exact path="/">
            <Home
              Store={Store}
              setStore={this.setStore}
            />
          </Route>
          <Route exact path="/items/:param" component={items}/>
          <Route exact path="/admin">
            {
              Store.signedInAddress
                ? (
                  Address.isAdmin(Store.signedInAddress)
                  ? <Admin
                    Store={Store}
                    setStore={this.setStore}
                  />
                  : <Redirect to={'/404'}/>
                )
                : null
            }
          </Route>
          <Route exact path="/intro">
            <Intro
              Store={Store}
              setStore={this.setStore}
            />
          </Route>
          <Route exact path="/credits">
            <Credits
              Store={Store}
              setStore={this.setStore}
            />
          </Route>
          <Route exact path="*">
            <Error404
              Store={Store}
              setStore={this.setStore}
            />
          </Route>
        </Switch>
        <Footer/>
      </main>
      {Store.showModal
        ? <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{Store.modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>{Store.modalBody}</Modal.Body>

          <Modal.Footer>
            <Button onClick={() => {
              this.setStore({showModal: false})
            }}>{Store.modalClose || 'Close'}</Button>
            {
              this.state.secondButton
                ? <Button onClick={() => {
                  Store.modalAction()
                  this.setStore({showModal: false})
                }} bsStyle="primary">{Store.secondButton}</Button>
                : null
            }
          </Modal.Footer>
        </Modal.Dialog>
        : null}
    </BrowserRouter>
  }
}

module.exports = App
