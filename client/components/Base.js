import PropTypes from 'prop-types'

import Common from './Common'
import clientApi from '../utils/ClientApi'

class Base extends Common {

  constructor(props) {
    super(props)
    this.bindMany([
      'store',
      'request'
    ])
    this.Store = this.props.Store
  }

  request(api, method, params = {}, query = {}) {
    return clientApi.request(api, method, params, query)
  }

  store(...params) {
    this.props.setStore(...params)
  }

  render() {
    return <div/>
  }
}

Base.propTypes = {
  Store: PropTypes.object,
  setStore: PropTypes.func
}

export default Base
