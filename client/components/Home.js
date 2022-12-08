// eslint-disable-next-line no-undef
const { Container, Row, Col } = ReactBootstrap;

import Base from "./Base";

export default class Home extends Base {
  render() {
    const title = (
      <div>
        <h1>Broken Jazz</h1>
        <h3>
          Nocturnal Fragments and Other Mistakes
          <br />
          Vol. 1, December 2020
        </h3>
        <h4>
          <i>A collection of short tunes written late at night</i>
        </h4>
      </div>
    );

    const col1 = (
      <Col>
        <img src={"/images/BrokenJazzCover.jpeg"} className={"cover"} />
      </Col>
    );
    const col2 = (
      <Col>
        <iframe
          width="100%"
          height="600"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1174446544&color=%23734981&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        />
      </Col>
    );

    return (
      <Container style={{ marginTop: 100 }}>
        {this.Store.width < 900 ? (
          <div>
            {title}
            <p>&nbsp;</p>
          </div>
        ) : null}

        {this.Store.width > 900 ? (
          <Row>
            {col1}
            {col2}
          </Row>
        ) : (
          <Row>{col1}</Row>
        )}

        {this.Store.width < 900 ? <Row>{col2}</Row> : null}
      </Container>
    );
  }
}
