import Base from './Base'

import Webcam from 'react-webcam'

// eslint-disable-next-line no-undef
const {Button} = ReactBootstrap

class WebcamCapture extends Base {

  constructor(props) {
    super(props)

    this.bindMany([
      'setRef',
      'capture'
    ])

  }

  setRef (webcam) {
    this.webcam = webcam
  }

  capture(){
    this.props.callback(this.webcam.getScreenshot())
  }

  render() {
    const videoConstraints = {
      facingMode: 'user'
    }

    return (
      <div className={'webcam-capture'}>
        <Webcam
          audio={false}
          // height={this.props.height || 360}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width="100%"
          videoConstraints={videoConstraints}
        />
        <Button onClick={this.capture} variant="primary">Capture photo</Button>
      </div>
    )
  }
}

module.exports = WebcamCapture
