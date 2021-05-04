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
    let {id} = token
    let title = `Broken Jazz ${id < 51
      ? 'NE ' + id + '/50'
      : id === 54
        ? 'AC 1/1'
        : 'AP ' + (id - 50) + '/3'}`

    return <div className={'title'}><Link to={`/items/${id}`}>{title}</Link></div>
  }

  renderVideo(token) {
    return <div style={{height: this.props.wh, width: this.props.wh}}>
      <VideoPlayer src={token.metadata.image.replace(/ipfs:\/\//, 'https://ipfs.io/ipfs/')}/>
      {this.props.large ? null : this.tokenData(token)}
    </div>
  }

  renderUnminted(token) {
    return <div>
      <img src="/images/cover480.jpg" style={{height: this.props.wh, width: this.props.wh}}/>
      {this.props.large ? null : this.tokenData(token)}
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
      <div className={`cardDiv ${this.props.large ? 'single' : ''}`}  style={{width: this.props.cw, height: this.props.cw + 26}}>
        <div className="cardBody">{
          token && token.metadata
          ? this.renderVideo(token)
          : this.renderUnminted(token)
        }</div>
      </div>
    )

  }
}


module.exports = Item
