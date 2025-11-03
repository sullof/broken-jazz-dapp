import Base from './Base';

class Footer extends Base {
  render() {
    return (
      <div className="footer">
        <div className={'centered'}>
          <small style={{ fontSize: '0.8rem' }}>
            (c) 2021 Francesco Sullo | This website does not use any cookie
          </small>
        </div>
      </div>
    );
  }
}

export default Footer;
