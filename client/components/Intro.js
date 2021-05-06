// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

import Base from './Base'
import Ab from './Ab'

export default class Home extends Base {

  render() {

    const title = <div>
      <h1>Broken Jazz</h1>
      <h3>Nocturnal Fragments and Other Mistakes<br/>Vol. 1, December 2020</h3>
      <h4><i>A collection of short tunes written late at night</i></h4>
    </div>

    const text = <div className={'textBlock'}>
      <h4 style={{marginTop: 12}}>Intro</h4>
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
      <p>Only 54 BKJZ tokens will exist on the Ethereum main network when all the tokens are minted. Any of them has a unique video. Maybe not soon, but they will have some value, sooner or
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
      </Col>
        <Col>{text}</Col>
      </Row>

    const row2 = this.Store.width > 900
      ? null
      : <Row><Col>>
        {text}
      </Col></Row>


    return (
      <Container style={{marginTop: 100}}>
        <Row>
          {row1}
          {row2}
        </Row>
      </Container>
    )
  }
}
