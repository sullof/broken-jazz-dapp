// eslint-disable-next-line no-undef
const {Link} = ReactRouterDOM

import Base from './Base'
import VideoPlayer from './VideoPlayer'

class Item extends Base {

  constructor(props) {
    super(props)

    this.bindMany([
      'renderUnminted',
      'renderVideo'
    ])

  }

  tokenData(token = {id: 0}) {
    let {id, label} = token
    return <div className={'title'}><Link to={`/items/${id}`}>{label}</Link></div>
  }

  renderVideo(token) {
    return <div style={{width: '100%'}}>
      <VideoPlayer src={token.imageURI.replace(/ipfs:\/\//, 'https://ipfs.io/ipfs/')}/>
    </div>
  }

  renderUnminted(token) {
    return <div>
      <Link to={`/items/${token.id}`}><img src="/images/cover480.jpg" style={{width: '100%'}}/></Link>
    </div>
  }

  async getDescription(description) {
    let i = 1
    let rows = description.split('\n').map(e => <p key={i++}>${e}</p>)
    return <div>{rows}</div>
  }

  render() {

    const {token} = this.props

    return (
      <div className={`cardDiv ${this.props.klass}`}  >
        <div className="cardBody">{
          token && token.imageURI
          ? this.renderVideo(token)
          : this.renderUnminted(token)
        }
          {
            this.props.klass === 'largevideo' ? null :
              <div>{this.tokenData(token)}</div>
          }
        </div>
      </div>
    )

  }
}


module.exports = Item
