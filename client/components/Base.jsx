import PropTypes from "prop-types";

import Common from "./Common";

class Base extends Common {
  constructor(props) {
    super(props);
    this.bindMany(["store"]);
    this.Store = this.props.Store;
  }

  store(...params) {
    this.props.setStore(...params);
  }

  render() {
    return <div />;
  }
}

Base.propTypes = {
  Store: PropTypes.object,
  setStore: PropTypes.func,
};

export default Base;
