// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

import Base from './Base'
import Ab from './Ab'

export default class Home extends Base {

  render() {
    return (
      <Container style={{marginTop: 100}}>
        <Row>
          <Col>
            <img src={'/images/BrokenJazzCover.jpeg'} width="100%" />
            <iframe
              width="100%"
              height="560"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1174446544&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"/>
          </Col>
          <Col>
            <h1>Broken Jazz</h1>
            <h3>Nocturnal Fragments and Other Mistakes<br/>Vol. 1, December 2020</h3>
            <h4><i>A collection of short tunes written late at night</i></h4>
            <div className={'centered big'}>
              * * *
            </div>

            <div className={'largerp'}>
            <p>As a musician, I focused on songs with vocals and lyrics all my life.</p>
            <p>When I sit down to the piano and improvise something instrumental, I don't usually record it. Since
              I have a terrible memory, I end up composing thousands of fragments that got lost.</p>
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
            <p>Only 54 BKJZ tokens will exist on the Ethereum main network when all the tokens are minted. A little
              while ago, thousands of people minted 20,000 procedurally generated <Ab label="Meebits"
                                                                                      link="https://meebits.larvalabs.com/meebits/list"/> for
              2.34 ETH each, i.e., more than seven thousands dollar each. So I think that fifty-four manually edited
              BKJZ tokens should have a significant value. Maybe not soon, but they will have some value sooner or
              later. If I were you, I would jump on <Ab
                link="https://amazon.com/dp/B08YCV1QL7" label="Amazon"/> and buy one before it is too late.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={'credits'}>
            <h4 style={{marginTop: 34}}>Credits</h4>
            <p>I am not a pianist, but I got help and I want to thank a few amazing people:</p>
            <ul>
              <li><Ab link="https://gaelkanievsky.com" label="Gael Kanievsky"/> gave me great everyday feedback</li>

              <li><Ab link="http://ostinelli.net" label="Roberto Ostinelli"/> helped me figure out how to improve my
                performances and the pianos'
                sound
              </li>

              <li><Ab link="http://www.danzemelman.com" label="Dan Zemelman"/> helped me reach this album's final shape,
                suggesting corrections and
                improvements
              </li>

              <li><Ab link="http://allisonlovejoy.com" label="Allison Lovejoy"/> gave me great advice about how to
                overcome my limits and make
                the piano sound more natural
              </li>

              <li><Ab link="http://davidedicillo.com" label="Davide Di Cillo"/> helped me with the cover</li>
            </ul>
            <p>A special thank to the unknown photographer who took the shot I used for the cover.</p>
            <p>A warm thank to <Ab link="https://cloudacademy.com/instructors/francesco-mosconi/"
                                   label="Francesco Mosconi"/>, <Ab link="https://www.msk.fm/" label="Antonino Musco"/>,
              Annalisa Sullo, and the many others who liked my songs during the recording.</p>
            <p>I produced the tunes with Apple Logic Pro X, using the excellent <Ab
              link="http://www.modartt.com/pianoteq" label="Modartt's Pianoteq Stage"/>.
            </p>
          </Col>
          <Col className={'bio'}>
            <h4 style={{marginTop: 34}}>About</h4>
            <p>
              <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN2-2020.jpg'} label={<img src="/images/studio2.jpg" className={'oil'}/>}/>
              <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN3_GirlWithBraid.jpg'} label={<img src="/images/studio3.jpg" className={'oil'}/>}/>
              <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN5_SweetMelancholy.jpg'} label={<img src="/images/studio5.jpg" className={'oil'}/>}/>
              <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN9Untitled.jpg'} label={<img src="/images/studio9.jpg" className={'oil'}/>}/>
            </p>


            <p>Francesco Sullo is a serial entrepreneur and software engineer living in San Francisco, California. Francesco studied Physics and has a solid background and a remarkable experience with cryptography, being the creator of Passpack, one of the first Host-proof Hosting web apps in the world. He also has a parallel life where he is mostly a painter, a writer, and a musician. You can see some of his works at <Ab link={'https://francesco.sullo.co'} label={'his website'} />.</p>

          </Col>
        </Row>
        <Row>
          <Col>
            <p>&nbsp;</p>
            <hr/>
            <div className={'centered'}>
            <small >

              <b>This website does not use any cookie.</b> &nbsp; &nbsp;
              (c) 2021 Francesco Sullo &nbsp; &nbsp;
                            <a className="item" target="_blank" href="https://twitter.com/sullof" rel="noreferrer">
                <i className="fab fa-twitter"></i> <span className="roboto300">Twitter</span>
              </a>
              <a className="item" target="_blank" href="https://github.com/sullof" rel="noreferrer">
                <i className="fab fa-github"></i> <span className="roboto300">Github</span>
              </a>
              <a className="item" href="mailto:francesco@sullo.co">
                <i className="fas fa-envelope-open-text"></i> <span className="roboto300">Email</span>
              </a>
            </small>

            <p>&nbsp;</p>
            </div>
          </Col>

        </Row>
      </Container>
    )
  }
}
