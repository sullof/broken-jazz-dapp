import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

import Common from './Common';
import Menu from './Menu';
import Home from './Home';
import Error404 from './Error404';
import Footer from './Footer';
import Credits from './Credits';
import Intro from './Intro';

class App extends Common {
  constructor(props) {
    super(props);

    this.state = {
      Store: {
        content: {},
        editing: {},
        temp: {},
        menuVisibility: false,
        width: this.getWidth(),
      },
    };

    this.bindMany([
      'handleClose',
      'handleShow',
      'setStore',
      'updateDimensions',
      'showModal',
    ]);
  }

  getWidth() {
    return window.innerWidth;
  }

  updateDimensions() {
    this.setStore({
      width: this.getWidth(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  showModal(modalTitle, modalBody, modalClose, secondButton, modalAction) {
    this.setStore({
      modalTitle,
      modalBody,
      modalClose,
      secondButton,
      modalAction,
      showModal: true,
    });
  }

  setStore(newProps) {
    let store = this.state.Store;
    for (let i in newProps) {
      if (newProps[i] === null) {
        delete store[i];
      } else {
        store[i] = newProps[i];
      }
    }
    this.setState({
      Store: store,
    });
  }

  render() {
    const Store = this.state.Store;

    return (
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Menu Store={Store} setStore={this.setStore} />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home Store={Store} setStore={this.setStore} />}
            />
            <Route
              path="/intro"
              element={<Intro Store={Store} setStore={this.setStore} />}
            />
            <Route
              path="/credits"
              element={<Credits Store={Store} setStore={this.setStore} />}
            />
            <Route
              path="*"
              element={<Error404 Store={Store} setStore={this.setStore} />}
            />
          </Routes>
          <Footer />
        </main>
        {Store.showModal ? (
          <Modal show={Store.showModal} onHide={() => this.setStore({ showModal: false })}>
            <Modal.Header closeButton>
              <Modal.Title>{Store.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{Store.modalBody}</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  this.setStore({ showModal: false });
                }}
              >
                {Store.modalClose || 'Close'}
              </Button>
              {Store.secondButton ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    Store.modalAction();
                    this.setStore({ showModal: false });
                  }}
                >
                  {Store.secondButton}
                </Button>
              ) : null}
            </Modal.Footer>
          </Modal>
        ) : null}
      </BrowserRouter>
    );
  }
}

export default App;
