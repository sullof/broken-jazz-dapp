// const {Link} = ReactRouterDOM
import Base from './Base'

class Footer extends Base {

  render() {
    return (
      <div className="footer">
        <div className={'centered'}>
          <small>
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
        </div>
      </div>
    )
  }
}

module.exports = Footer
