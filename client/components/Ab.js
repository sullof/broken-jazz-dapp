import Base from './Base'


class Ab extends Base {

  render() {
    return <a href={this.props.link} target="_blank">{this.props.label}</a>

  }
}

module.exports = Ab
