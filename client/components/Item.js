// eslint-disable-next-line no-undef
const { Link } = ReactRouterDOM;

import Base from "./Base";
import VideoPlayer from "./VideoPlayer";
import Address from "../utils/Address";

class Item extends Base {
  constructor(props) {
    super(props);

    this.bindMany(["renderUnminted", "renderVideo"]);
  }

  tokenData(token = { id: 0 }) {
    let { id, label } = token;
    return (
      <div className={"title"}>
        <Link to={`/items/${id}`}>{label}</Link>
      </div>
    );
  }

  renderVideo(token) {
    return (
      <div style={{ width: "100%" }}>
        <VideoPlayer
          src={token.imageURI.replace(/ipfs:\/\//, "https://ipfs.io/ipfs/")}
        />
      </div>
    );
  }

  renderUnminted(token) {
    return (
      <div>
        <Link to={`/items/${token.id}`}>
          <img src="/images/cover480.jpg" style={{ width: "100%" }} />
        </Link>
      </div>
    );
  }

  async getDescription(description) {
    let i = 1;
    let rows = description.split("\n").map((e) => <p key={i++}>${e}</p>);
    return <div>{rows}</div>;
  }

  render() {
    const { token } = this.props;
    const all = /all$/.test(window.location.pathname);

    let yours =
      this.Store.signedInAddress &&
      (Address.equal(token.claimer, this.Store.signedInAddress) ||
        Address.equal(token.owner, this.Store.signedInAddress)) ? (
        <div className={"isMine"}>YOURS</div>
      ) : null;

    if (!yours && all) {
      if (token.owner) {
        yours = <div className={"isMine ttype"}>MINTED</div>;
      } else if (token.claimer) {
        yours = <div className={"isMine ttype"}>CLAIMED</div>;
      }
    }

    return (
      <div className={`cardDiv ${this.props.klass}`}>
        {yours}
        <div className="cardBody">
          {token && token.imageURI
            ? this.renderVideo(token)
            : this.renderUnminted(token)}
          {this.props.klass === "largevideo" ? null : (
            <div>{this.tokenData(token)}</div>
          )}
        </div>
      </div>
    );
  }
}

module.exports = Item;
