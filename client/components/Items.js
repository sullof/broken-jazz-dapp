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
import Address from '../utils/Address'

let loadingTokens = false

// eslint-disable-next-line no-undef
class Items extends Base {

  constructor(props) {
    super(props)

    this.state = {
      loadingMessage: false
    }

    this.bindMany([
      'getTokens',
      'renderItems',
      'intros',
      'getFilterIdFromPathname'
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
    let sec = 0
    while (!this.Store.signedInAddress) {
      await sleep(100)
      if (sec === 50) {
        this.setState({
          loadingMessage: 'You seem disconnected, loading server side...'
        })
        await sleep(3000)
        break
      }
      sec++
    }
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
          token.id = i
          try {
            let owner = await this.Store.contract.ownerOf(i)
            token.owner = owner
            token.minted = true
            if (Address.equal(token.owner, this.Store.signedInAddress)) {
              token.yours = true
            }
          } catch (e) {
            token.claimed = true
          }
        }
        token.label = this.tokenData(token)
        token.labelLong = this.tokenData(token, true)
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

  tokenData(token = {id: 0}, long) {
    let {id} = token
    return `Broken Jazz ${id < 51
      ? `${long? 'Numbered Edition' : 'NE'} ` + id + '/50'
      : id === 54
        ? `${long? 'Artist\'s Copy' : 'AC'} 1/1`
        : (long ? 'Artist\'s Proof ' : 'AP ') + (id - 50) + '/3'}`
  }


  getFilterIdFromPathname() {
    const {pathname} = this.props
    const filter = pathname.split('/')[2]
    let id
    if (/^\w+$/.test(filter)) {
      let i = parseInt(filter)
      if (i > 0 && i < 55) {
        id = i
      }
    }
    return {filter, id}
  }

  renderItems() {
    const {filter, id} = this.getFilterIdFromPathname()

    const filteredTokens = _.filter(this.Store.tokens, e => id ? e.id === id : filter === 'all' ? true : e[filter])

    let allCols = []
    for (let token of filteredTokens) {
      allCols.push(
        <Item
          key={token.id}
          large={!!id}
          token={token}
          Store={this.Store}
          setStore={this.props.setStore}
          klass={(id ? 'largevideo' : 'smallvideo') + (token.unclaimed ? ' unclaimed' : '')}
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
        getTokens={this.getTokens}
      />)
    }

    return <div>
      {this.intros()}
      <Container>
        {
          allCols.length
            ? <div>
              <div //style={{width: w * cols}}
                className={'m0Auto'}>{allCols}</div>
            </div>
            : <div className={'noTokens m0Auto'}>{
              filter === 'unclaimed' ? 'All the tokens have been claimed :-)'
                : filter === 'claimed' ? 'All the claimed tokens have been minted :-)'
                : filter === 'minted' ? (
                    this.Store.signedInAddress
                      ? 'Connect to the Matic Network to see the minted tokens'
                      : 'Connect your wallet to see the minted tokens'
                  )
                  : filter === 'yours' ? (
                      this.Store.signedInAddress
                        ? 'You do not own any minted token, yet :-('
                        : 'Connect your wallet to see if you own any token'
                    )
                    : filter === 'all' ? null : 'Uhm, what are you looking for?'
            }
            </div>
        }

      </Container>
      <div style={{height: 60, clear: 'both'}}/>
    </div>
  }

  intros() {
    const {filter} = this.getFilterIdFromPathname()
    if (/^\d+$/.test(filter)) {
      return <div className={'subtitle transparent'}/>
    } else {
      let intro
      switch (filter) {
        case 'minted':
          intro = <div><b className={'noMobile'}>Minted NFTs are standard ERC-721 tokens on the blockchain. Sell/buy them on <Ab link={'https://opensea.io/collection/brokenjazz'} label={'OpenSea'}/>.
            {/*{*/}
            {/*  this.Store.chainId ?*/}
            {/*    <span>You can take a look at the Broken Jazz smart contract on <Ab*/}
            {/*      link={`https://etherscan.io/address/${this.Store.contract.address}#code`}*/}
            {/*      label="Etherscan"/>.</span>*/}
            {/*    : null*/}
            {/*}*/}
          </b></div>
          break
        case 'claimed':
          intro = <div><b className={'noMobile'}>Claimed items are just videos on IPFS; if you claimed some, mint your NFT now.
          </b></div>
          break
        case 'unclaimed':
          intro =
            <div><b className={'noMobile'}>If you own a Broken Jazz CD, use the
              6-chars serial to claim yours. If not, you can buy a CD on <Ab link="https://amazon.com/dp/B08YCV1QL7"
                                                                             label="Amazon"/>.</b></div>
          break
        default:
          intro = <div><b className={'noMobile'}>To get a BKJZ NFTs, first buy a CD on <Ab
            link="https://amazon.com/dp/B08YCV1QL7"
            label="Amazon"/>.</b></div>
      }
      return <div className={'subtitle'}>{intro}</div>
    }
  }


  render() {
    if (this.Store.networkNotSupported) {
      return <Container style={{marginTop: 100}}>
        <div className={'noTokens m0Auto'}>
          <p>Please, connect Metamask to the Polygon (ex-MATIC) Network :-)</p>
          {/*<p style={{fontSize: '1rem'}}>If you don't have any Goerli ETH,<br/>get some <Ab*/}
          {/*  link="https://goerli-faucet.slock.it/" label="from the Goerli faucet"/> for free.</p>*/}
        </div>
      </Container>
    }

    const {ready} = this.Store
    return (
      ready
        ? this.renderItems()
        : <LoadingApp
          className="Lato"
          message={this.state.loadingMessage || 'Loading the data from the blockchain...'}
        />
    )

  }
}


module.exports = Items
