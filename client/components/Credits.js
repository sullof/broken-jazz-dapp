// eslint-disable-next-line no-undef
const {Container, Row, Col} = ReactBootstrap

import Base from './Base'
import Ab from './Ab'

export default class Home extends Base {

  render() {

    const col3 = <Col className={'credits textBlock'}>
      <h4 style={{marginTop: 12}}>Credits</h4>
      <div className={'license'}>
        <p><span className={'istok'}>Broken Jazz</span> is licensed under a <Ab link={'https://creativecommons.org/licenses/by-nc-sa/3.0/'} label={'Creative Commons License.'}/>
          <span className="cc-license-icons">
<img alt="cc logo" src="https://creativecommons.org/images/deed/cc_icon_white_x2.png"/>
<img src="https://creativecommons.org/images/deed/attribution_icon_white_x2.png"/><img src="https://creativecommons.org/images/deed/nc_white_x2.png"/><img src="https://creativecommons.org/images/deed/sa_white_x2.png"/>
</span>
        </p>

      </div>



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


    const col4 = <Col className={'bio textBlock'}>
      <h4 style={{marginTop: 12}}>About</h4>
      <p>
        <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN2-2020.jpg'}
            label={<img src="/images/studio2.jpg" className={'oil'}/>}/>
        <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN3_GirlWithBraid.jpg'}
            label={<img src="/images/studio3.jpg" className={'oil'}/>}/>
        <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN5_SweetMelancholy.jpg'}
            label={<img src="/images/studio5.jpg" className={'oil'}/>}/>
        <Ab link={'https://francesco-sullo-co.s3.amazonaws.com/StudioN9Untitled.jpg'}
            label={<img src="/images/studio9.jpg" className={'oil'}/>}/>
      </p>
      <p>I am a serial entrepreneur and software engineer living in San Francisco, California. I  studied Physics and have a solid background and a remarkable experience with cryptography, being the creator of Passpack — one of the first Host-proof Hosting web apps.
      </p>
      <p>I also have a parallel life where I am primarily a painter, a writer, a musician, and a video maker. You can see some of my works at <Ab
          link={'https://francesco.sullo.co'} label={'https://francesco.sullo.co'}/>.</p>
    </Col>


    return (
      <Container style={{marginTop: 100}}>
        {
          this.Store.width > 900
            ? <Row>
              {col3}
              {col4}
            </Row>
            : null
        }
        {
          this.Store.width < 900
            ? <Row>
              {col3}
            </Row>
            : null
        }
        {
          this.Store.width < 900
            ? <Row>
              {col4}
            </Row>
            : null
        }
      </Container>
    )
  }
}
