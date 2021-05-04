// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

// eslint-disable-next-line no-undef
import Base from './Base'

export default class Home extends Base {

  render() {
    return (
      <Container style={{marginTop: 100}}>
        <Row>
          <Col >
            {/*<iframe*/}
            {/*  src="https://open.spotify.com/embed/album/4My9KYEGqtyx5wpgjDOdqi"*/}
            {/*  width="100%"*/}
            {/*  height="820"*/}
            {/*  frameBorder="0"*/}
            {/*  allowTransparency="true"*/}
            {/*  allow="encrypted-media" />*/}
            <iframe
              width="100%"
              height="820"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1174446544&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true" />
          </Col>
          <Col >
            <h2>Broken Jazz</h2>
            <h5>Nocturnal Fragments and Other Mistakes<br/>Vol. 1, December 2020</h5>
            <h5><i>A collection of short tunes written late at night</i></h5>
            <p></p>

            <p>As an experiment, I started on December 3rd to compose and record a new tune every day, with a few
              exceptions, completing 31 songs by December 29th. During the first two weeks of January, I fixed the many
              errors and improved the sound.</p>

            <p>I am not a pianist, but I got help and I want to thank a few amazing people:</p>
            <ul>
              <li><a
                href="https://gaelkanievsky.com" target="_blank">Gael Kanievsky</a> gave me great everyday feedback</li>

              <li><a
                href="http://ostinelli.net" target="_blank">Roberto Ostinelli</a> helped me figure out how to improve my performances and the pianos'
                sound
              </li>

              <li><a
                href="http://www.danzemelman.com" target="_blank">Dan Zemelman</a> helped me reach this album's final shape, suggesting corrections and
                improvements
              </li>

              <li><a
                href="http://allisonlovejoy.com" target="_blank">Allison Lovejoy</a> gave me great advice about how to overcome my limits and make
                the piano sound more natural
              </li>

              <li><a
                href="http://davidedicillo.com" target="_blank">Davide Di Cillo</a> helped me with the cover</li>
            </ul>
            <p>A special thank to the unknown photographer who took the shot I used for the cover.</p>
            <p>A warm thank to <a href="https://cloudacademy.com/instructors/francesco-mosconi/" target="_blank">Francesco Mosconi</a>, <a href="https://www.msk.fm/" target="_blank">Antonino Musco</a>, Annalisa Sullo, and the many others who liked my songs during the recording.</p>
            <p>I produced the tunes with Apple Logic Pro X, using the excellent <a
              href="http://www.modartt.com/pianoteq" target="_blank">Modartt's Pianoteq Stage</a>.
              </p>

            <hr />
            <h4>The BKJZ Non-fungible Token</h4>

            <p>When the record was on <a
              href="https://open.spotify.com/album/4My9KYEGqtyx5wpgjDOdqi" target="_blank">Spotify</a>, <a
              href="https://www.pandora.com/artist/francesco-sullo/broken-jazz/AL25fq3ZmbgdPc4" target="_blank">Pandora</a>, <a
              href="https://music.amazon.com/albums/B08WZ2DB2N" target="_blank">Amazon Music</a>, and others online services, I started the physical CD distribution.</p>
              <p>I printed 50 Numbered Editions, 3 Artist's Proofs, and 1 Artist's Personal Copy. Any CD has internally a
              serial code than allows to claim the relative NFT. You can buy a CD on <a
                href="https://amazon.com/dp/B08YCV1QL7" target="_blank">Amazon</a>, if still there is an available copy.
            </p>
          </Col>
        </Row>
      </Container>
    )
  }
}
