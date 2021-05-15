// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

import Base from './Base'
import Ab from './Ab'

export default class Home extends Base {

  render() {

    const title = <div>
      <h1>Broken Jazz</h1>
      <h3>Nocturnal Fragments and Other Mistakes<br/>Vol. 1, December 2020</h3>
      <h4><i>A collection of short tunes written late at night</i></h4>
    </div>

    const instruction = <div className={'textBlock'}>
      <h4 style={{marginTop: 12}}>How it works</h4>

      <p>Francesco printed only 50 copies of his Broken Jazz record, numbered from 1 to 50, plus four printing
        tests numbered as A, B, C, and F. First owners of a physical CD can claim their NFT.</p>

      <h5>Steps to get your NFT</h5>
      <ul>
        <li>Go to <Link to="/unclaimed">Available</Link></li>
        <li>Find your numbered edition and click on it.</li>
        <li>Have your CD cover with you because, at some moment, you need to take a picture using your computer
          webcam.
        </li>
        <li>Press the button <span className={'button'}>Claim this token</span>. It will ask you to access the webcam. Say yes and take a picture of
          yourself with the cover showing the serial number on the CD.
        </li>
        <li>Fill in the form and chose the song you want as the soundtrack of the NFT.</li>
        <li>You will be asked to sign your claim using Metamask. You are not sending any money, just signing a
          request. If you do not have a Metamask wallet installed in your browser, follow the instruction <Ab link={'https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047'} label={'here'}/>.
        </li>
      </ul>

      <p>Francesco will receive your claim, verify that it is valid, and create the video for your NFT. It usually takes
        less than 24 hours.<br/>
        If you come back here later, look at <Link to="/claimed">Claimed</Link>. You should find your NFT. Then</p>
      <ul>
        <li>Click on the name and go on the details page.</li>
        <li>Press the button <span className={'button'}>Mint your token</span>. At that point, you must spend the gas required to mint the token in the
          blockchain. There is no way to avoid it.
        </li>
        <li>Accept the transaction with Metamask and wait that it is included in a block. When done, in Yours, you will
          find your BKJZ token.
        </li>
        <li>To mint your token you must connect to the Matic network. If you never did, you can follow the instructions at <Ab link={'https://docs.matic.network/docs/develop/metamask/config-matic/'} label={'here'}/> and let me know at francesco@brokenjazz.cc; I will send you 0.1 MATIC, that is 100x what you will need to mint the token.
        </li>

      </ul>


    </div>


    const text = <div className={'textBlock'}>
      <h4 style={{marginTop: 12}}>The project</h4>
      <p>As a musician, I have focused on songs with vocals and lyrics all my life. So, when I sit down to the piano and
        improvise something instrumental, I don't usually record it. Since
        I have a terrible memory, I ended up composing thousands of fragments that get lost.</p>
      <p>In December 2020, I was trying to remember something I composed a few years ago, without success. I was
        distraught. So, I set up a minimalistic home studio to record musical notes I could use somewhere in the
        future.</p>
      <p>After the first few days, I realized that some of the tunes were not bad and got excited. To keep me
        focused, I challenged myself to compose and record a new song every night till the end of the month. It
        was a marvelous experience, and on December 29th, I had 31 tunes.</p>
      <p>Then I found myself at a crossroads. Was it better to continue recording new songs every day in January
        or taking some time to improve the sound, fix technical mistakes, and produce a publishable record? The
        second option was way more attractive. I also thought that I could print a limited edition of a physical
        CD, and, maybe, I could deploy some smart contract and create an NFT. So when I designed the cover, I left
        a space inside to manually write a serial code to claim the NFT associated with that copy. I jumped
        online, found the great <Ab label="Atomic Disc" link="https://www.atomicdisc.com/products/wallet-lite"/>,
        and I printed 50 Numbered Editions, 3 Artist's Proofs, and 1 Artist's Personal Copy.</p>
      <p>When the record was on <Ab link="https://open.spotify.com/album/4My9KYEGqtyx5wpgjDOdqi"
                                    label="Spotify"/>, <Ab
        link="https://www.pandora.com/artist/francesco-sullo/broken-jazz/AL25fq3ZmbgdPc4" label="Pandora"/>, <Ab
        link="https://music.amazon.com/albums/B08WZ2DB2N" label="Amazon Music"/>, and other online services, I
        added the physical CD distribution on <Ab link="https://cdbaby.com" label="CDBaby"/>.</p>
      <p>When Amazon sold the first CDs, I started working on the smart contracts and this dapp.</p>
      <p>Only 54 BKJZ tokens will exist on the Polygon (ex-MATIC) network when all the tokens are minted. Any of them has a
        unique video. Maybe not soon, but they will have some value, sooner or
        later.
      </p>
      <p>So jump on <Ab
        link="https://amazon.com/dp/B08YCV1QL7" label="Amazon"/> and buy one CD before it is too late 🤩 It is only
        ~$15 😎</p>
    </div>

    const row1 = this.Store.width < 900
      ? <Row><Col>
        {title}
      </Col></Row>
      : <Row><Col>
        <div className={'spacer'}/>
        {title}
        {instruction}
      </Col>
        <Col>{text}</Col>
      </Row>

    const row2 = this.Store.width > 900
      ? null
      : <Row><Col>>
        {text}
      </Col></Row>

    const row3 = this.Store.width > 900
      ? null
      : <Row><Col>>
        {instruction}
      </Col></Row>


    return (
      <Container style={{marginTop: 100}}>
        {row1}
        {row2}
        {row3}
      </Container>
    )
  }
}
