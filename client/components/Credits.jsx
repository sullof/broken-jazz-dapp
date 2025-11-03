import { Container, Row, Col } from 'react-bootstrap';
import Base from './Base';
import Ab from './Ab';

export default class Credits extends Base {
  render() {
    const col3 = (
      <Col className={'credits textBlock'}>
        <h4 style={{ marginTop: 12 }}>Credits</h4>
        <div className={'license'}>
          <p>
            <span className={'istok'}>Broken Jazz</span> is licensed under a{' '}
            <Ab
              link={'https://creativecommons.org/licenses/by-nc-sa/3.0/'}
              label={'Creative Commons License.'}
            />
            <span className="cc-license-icons">
              <img
                alt="cc logo"
                src="https://creativecommons.org/images/deed/cc_icon_white_x2.png"
              />
              <img src="https://creativecommons.org/images/deed/attribution_icon_white_x2.png" />
              <img src="https://creativecommons.org/images/deed/nc_white_x2.png" />
              <img src="https://creativecommons.org/images/deed/sa_white_x2.png" />
            </span>
          </p>
        </div>

        <p>
          I am not a trained pianist, but I received valuable help along the way
          and would like to express my gratitude to a few amazing people:
        </p>
        <ul>
          <li>
            <Ab link="https://gaelkanievsky.com" label="Gael Kanievsky" />{' '}
            provided me with consistent daily feedback throughout the process
          </li>

          <li>
            <Ab link="http://ostinelli.net" label="Roberto Ostinelli" /> helped
            me understand how to enhance my performances and improve the piano's
            sound quality
          </li>

          <li>
            <Ab link="http://www.danzemelman.com" label="Dan Zemelman" /> helped
            me finalize this album, offering valuable corrections and
            improvements
          </li>

          <li>
            <Ab link="http://allisonlovejoy.com" label="Allison Lovejoy" />{' '}
            provided excellent guidance on how to push beyond my limitations and
            achieve a more natural piano sound
          </li>

          <li>
            <Ab link="http://davidedicillo.com" label="Davide Di Cillo" />{' '}
            created the album cover design
          </li>
        </ul>
        <p>
          I would also like to express special gratitude to the unknown
          photographer whose work I used for the cover.
        </p>
        <p>
          My warmest thanks also go to{' '}
          <Ab
            link="https://cloudacademy.com/instructors/francesco-mosconi/"
            label="Francesco Mosconi"
          />
          , <Ab link="https://www.msk.fm/" label="Antonino Musco" />, Annalisa
          Sullo, and the many others who supported and encouraged my work during
          the recording process.
        </p>
        <p>
          I produced the tracks using Apple Logic Pro X, with the excellent{' '}
          <Ab
            link="http://www.modartt.com/pianoteq"
            label="Modartt's Pianoteq Stage"
          />{' '}
          software.
        </p>
        <p>&nbsp;</p>
        <h4 style={{ marginTop: 12 }}>About</h4>
        <p>
          <Ab
            link={
              'https://francesco-sullo-co.s3.amazonaws.com/StudioN2-2020.jpg'
            }
            label={<img src="/images/studio2.jpg" className={'oil'} />}
          />
          <Ab
            link={
              'https://francesco-sullo-co.s3.amazonaws.com/StudioN3_GirlWithBraid.jpg'
            }
            label={<img src="/images/studio3.jpg" className={'oil'} />}
          />
          <Ab
            link={
              'https://francesco-sullo-co.s3.amazonaws.com/StudioN5_SweetMelancholy.jpg'
            }
            label={<img src="/images/studio5.jpg" className={'oil'} />}
          />
          <Ab
            link={
              'https://francesco-sullo-co.s3.amazonaws.com/StudioN9Untitled.jpg'
            }
            label={<img src="/images/studio9.jpg" className={'oil'} />}
          />
        </p>
        <p>
          I am a serial entrepreneur and software engineer based in San
          Francisco, California. I studied Physics and have extensive
          experience with cryptography, having created Passpack – one of the
          first Host-proof Hosting web applications.
        </p>
        <p>
          Beyond technology, I pursue parallel creative endeavors as a
          painter, writer, musician, and video maker. You can view some of my
          work at{' '}
          <Ab
            link={'https://francesco.sullo.co'}
            label={'https://francesco.sullo.co'}
          />
          .
        </p>
      </Col>
    );

    const col4 = (
      <Col className={'bio textBlock'}>
       
      </Col>
    );

    return (
      <Container style={{ marginTop: 100 }}>
        {this.Store.width > 900 ? (
          <Row>
            {col3}
            
          </Row>
        ) : null}
        {this.Store.width < 900 ? <Row>{col3}</Row> : null}
        {this.Store.width < 900 ? <Row>{col4}</Row> : null}
      </Container>
    );
  }
}
