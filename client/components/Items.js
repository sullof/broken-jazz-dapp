const _ = require('lodash')

// eslint-disable-next-line no-undef
const {Container} = ReactBootstrap

async function sleep(millis) {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => setTimeout(resolve, millis))
}

import Base from './Base'

import allTokens from '../../db/index.json'
import LoadingApp from './LoadingApp'
import Item from './Item'

import Details from './Details'

import comments from '../config/comments.json'

// eslint-disable-next-line no-undef
class Items extends Base {

  constructor(props) {
    super(props)

    this.bindMany([
      'getTokens',
      'renderItems',
      'intros'
    ])

  }

  async componentDidMount() {
    await this.getTokens()
  }

  async getTokens(forceReload) {
    while (!this.Store.signedInAddress) {
      await sleep(1000)
    }
    const {pathname} = this.props
    const filter = pathname.split('/')[2]

    if (!this.Store.ready || this.Store.filter !== filter || forceReload) {
      this.filter = filter
      let tokens = []
      for (let i = 1; i < 55; i++) {
        let token = allTokens[i] ? _.clone(allTokens[i]) : {
          id: i,
          unclaimed: true
        }

        // workaround temporaneo per Mosconi
        if (token.metadata && !token.claimer) {
          token = {
            id: i,
            unclaimed: true
          }
        }

        if (!token.unclaimed) {
          token.id = i
          try {
            let owner = await this.Store.contract.ownerOf(i)
            token.owner = owner
            token.minted = true
            if (owner === this.Store.signedInAddress) {
              token.yours = true
            }
          } catch (e) {
            token.claimed = true
          }
        }
        tokens.push(token)
      }
      this.store({
        ready: true,
        filter,
        tokens
      })
    }
  }

  renderItems() {
    const {pathname} = this.props
    const filter = pathname.split('/')[2]
    let id
    if (/^\w+$/.test(filter)) {
      let i = parseInt(filter)
      if (i > 0 && i < 55) {
        id = i
      }
    }
    const w = id ? 520 : 320

    const width = this.Store.width

    let cols = Math.floor(width / w)
    const filteredTokens = _.filter(this.Store.tokens, e => id ? e.id === id : e[filter])

    const wh = (id ? 480 : 280) - 32
    const cw = w - 32

    let allCols = []
    for (let token of filteredTokens) {
      allCols.push(
        <Item
          key={token.id}
          large={!!id}
          token={token}
          Store={this.Store}
          setStore={this.props.setStore}
          wh={wh}
          cw={cw}
        />)
    }
    if (id) {
      let token = filteredTokens[0]
      let track
      if (token.metadata) {
        track = parseInt(token.metadata.attributes[0].value)
        token.comments = comments[track]
      }
      allCols.push(<Details
        key={0}
        token={token}
        Store={this.Store}
        setStore={this.props.setStore}
        wh={wh}
        cw={cw}
        getTokens={this.getTokens}
      />)
    }

    cols = allCols.length > cols ? cols : allCols.length

    return <Container style={{marginTop: 100}}>
      {
        allCols.length
          ? <div>
            {this.intros()}
            <div //style={{width: w * cols}}
            className={'m0Auto'}>{allCols}</div>
        </div>
          : <div className={'noTokens m0Auto'}>{
            filter === 'unclaimed' ? 'All the tokens have been claimed :-)'
              : filter === 'claimed' ? 'All the claimed tokens have been minted :-)'
              : filter === 'minted' ? 'No token has been minted, yet :-/'
                : filter === 'yours' ? 'You do not own any token, yet :-('
                  : 'Uhm, what are you looking for?'
          }
          </div>
      }

    </Container>
  }

  intros() {
    const {pathname} = this.props
    const filter = pathname.split('/')[2]
    if (/^\d+$/.test(filter)) {
      return null
    } else {
      let intro
      switch(filter) {
        case 'minted':
          intro = <p className={'paglia'}>Mined NFTs are token on the blockchain. They can be transferred, sold, etc. on any NFT marketplace.</p>
          break
        case 'claimed':
          intro = <p className={'paglia'}>Clalmed NFTs are new tokens ready to be minted.</p>
          break
        case 'unclaimed':
          intro = <p className={'paglia'}>Unclaimed NFTs are tokens looking for an owner. If you own a Broken Jazz CD, use the 6-chars serial to claim yours. If not, you can buy a CD on <a href="https://amazon.com/dp/B08YCV1QL7" target="_blank">Amazon</a>.</p>
          break
        default:
          intro = null
      }
      return intro
    }
  }

  render() {
    if (this.Store.networkNotSupported) {

      return <Container style={{marginTop: 100}}>
        <div className={'noTokens m0Auto'}>
          You look connected to an unsupported network.<br/>
          Please connect Metamask to Goerli Testnet.<br/>
          If you don't have any Goerli ETH, get some <a href="https://goerli-faucet.slock.it/" target={'_blanket'}>here</a> for free.
        </div>
      </Container>

    }


    const {ready} = this.Store
    return (
      ready
        ? this.renderItems()
        : <LoadingApp
          className="Lato"
          message="Loading the data from the blockchain..."
        />
    )

  }
}


module.exports = Items
