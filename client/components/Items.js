const _ = require('lodash')

// eslint-disable-next-line no-undef
const {Container} = ReactBootstrap

async function sleep(millis) {
  // eslint-disable-next-line no-undef
  return new Promise(resolve => setTimeout(resolve, millis))
}

import Ab from './Ab'
import Base from './Base'

import LoadingApp from './LoadingApp'
import Item from './Item'

import Details from './Details'

import comments from '../config/comments.json'
import Address from '../../common/Address'

let loadingTokens = false

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
    if (loadingTokens) {
      return
    }
    loadingTokens = true
    // while (!this.Store.signedInAddress) {
    //   await sleep(1000)
    // }
    const {pathname} = this.props
    const filter = pathname.split('/')[2]

    if (!this.Store.ready || this.Store.filter !== filter || forceReload) {
      this.loading = true
      const res = await this.request('tokens', 'get', {}, {
        forceReload,
        chainId: this.Store.chainId
      })
      let allTokens = res.tokens

      this.filter = filter
      let tokens = []
      for (let i = 1; i < 55; i++) {
        let token = allTokens[i] || {
          unclaimed: true
        }
        if (!token.id) {
          token.id = i
        }
        if (!token.unclaimed) {
          if (token.owner) {
            token.minted = true
            if (Address.equal(token.owner,this.Store.signedInAddress)) {
              token.yours = true
            }
          } else {
            token.claimed = true
          }
        }
        token.label = this.tokenData(token)
        tokens.push(token)
      }
      this.store({
        ready: true,
        filter,
        tokens
      })
    }
    loadingTokens = false
  }

  tokenData(token = {id: 0}) {
    let {id} = token
    return `Broken Jazz ${id < 51
      ? 'NE ' + id + '/50'
      : id === 54
        ? 'AC 1/1'
        : 'AP ' + (id - 50) + '/3'}`
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
      if (token.trackNumber) {
        track = parseInt(token.trackNumber)
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
                : filter === 'yours' ? (
                  this.Store.signedInAddress
                    ? 'You do not own any token, yet :-('
                    : 'Connect your Metamask to see if you own any token'
                  )
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
      switch (filter) {
        case 'minted':
          intro = <p className={'paglia'}>Minted NFTs are standard ERC-721 tokens on the blockchain. They can be transferred,
              farmed on DeFi apps, or sold on NFT marketplaces.<br/>
              {
                this.Store.chainId ?
                  <span>You can take a look at <Ab
                    link={`https://${this.Store.chainId === 5 ? 'goerli.' : ''}etherscan.io/address/${this.Store.contract.address}#code`}
                    label="the smart contract on Etherscan"/>.</span>
                  : null
              }
              </p>
          break
        case 'claimed':
          intro = <p className={'paglia'}>Clalmed NFTs are new tokens ready to be minted.</p>
          break
        case 'unclaimed':
          intro =
            <p className={'paglia'}>Unclaimed NFTs are tokens looking for an owner. If you own a Broken Jazz CD, use the
              6-chars serial to claim yours. If not, you can buy a CD on <Ab link="https://amazon.com/dp/B08YCV1QL7"
                                                                             label="Amazon"/>.</p>
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
          <p>Please connect Metamask<br/>to the Goerli Testnet.</p>
          <p style={{fontSize: '1rem'}}>If you don't have any Goerli ETH, get some <Ab
            link="https://goerli-faucet.slock.it/" label="here"/> for free.</p>
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
