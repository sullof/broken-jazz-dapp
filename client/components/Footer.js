// const {Link} = ReactRouterDOM
import Base from './Base'

export default class PrimaryContent extends Base {

  render() {
    return (
      <div className="footer">
        <span>(c) 2020+ <a className="item" href="https://github.com/sullof">Francesco Sullo</a></span>
        <a className="item" href="https://github.com/brokenjazz/brokenjazz">
          <i className="fab fa-github"></i> brokenjazz
        </a>
        <a className="item" target="_blank" href="https://twitter.com/brokenjazz">
          <i className="fab fa-twitter"></i> Follow brokenjazz
        </a>
        <a className="item" href="mailto:brokenjazz@sullo.co">
          <i className="fas fa-envelope-square"></i> Send us an email
        </a>
      </div>
    )
  }
}
