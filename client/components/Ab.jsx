import Base from './Base';

class Ab extends Base {
  render() {
    const { link, label, onClick } = this.props;
    if (link)
      return (
        <a href={link} target="_blank" rel="noreferrer">
          {label}
        </a>
      );
    else
      return (
        <span className="command" onClick={onClick}>
          {label}
        </span>
      );
  }
}

export default Ab;
