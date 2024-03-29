// eslint-disable-next-line no-undef
const { Container, Row, Col } = ReactBootstrap;

// eslint-disable-next-line no-undef
const { Link } = ReactRouterDOM;

import Base from "./Base";
import Ab from "./Ab";

export default class Intro extends Base {
  constructor(props) {
    super(props);

    this.bindMany(["addMaticToMetamask"]);
  }

  async addMaticToMetamask() {
    if (this.Store.signedInAddress) {
      const params = {
        chainId: "0x89",
        chainName: "Matic(Polygon) Mainnet",
        nativeCurrency: { name: "Matic", symbol: "MATIC", decimals: 18 },
        rpcUrls: [
          "https://rpc-mainnet.maticvigil.com",
          "https://rpc-mainnet.matic.network",
          "wss://ws-mainnet.matic.network",
          "https://rpc-mainnet.matic.quiknode.pro",
          "https://matic-mainnet.chainstacklabs.com",
        ],
        blockExplorerUrls: ["https://polygonscan.com"],
      };

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [params, this.Store.signedInAddress],
      });
    }
  }

  render() {
    const title = (
      <div>
        <h1>Broken Jazz</h1>
        <h3>
          Nocturnal Fragments and Other Mistakes
          <br />
          Vol. 1, December 2020
        </h3>
        <h4>
          <i>A collection of short tunes written late at night</i>
        </h4>
      </div>
    );

    const instruction = (
      <div className={"textBlock instructionSteps"}>
        <h4 style={{ marginTop: 12 }}>How it works</h4>

        <p>
          I printed only 50 copies of my Broken Jazz record, numbered from 1 to
          50, plus three printing tests and an Artist's copy.
        </p>
        <div className={"roundedIn"}>
          The first owners of a physical CD can claim their NFT as long as they
          claim it before September 26th, 2021. After that, all unclaimed tokens will
          be put on the market using a reverse mechanism: whoever buys the NFT
          will receive the corresponding CD copy.
        </div>

        <h5>Steps to get your NFT</h5>
        <ul>
          <li>
            First, you must connect your wallet. If you don't have one installed
            in your browser, visit{" "}
            <Ab link={"https://metamask.io/"} label={"Metamask"} />, install it
            and create your wallet (look{" "}
            <Ab
              link={
                "https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047"
              }
              label={"here"}
            />{" "}
            for instructions).
            <br />
            Alternatively, you can use{" "}
            <Ab
              link={"https://wallet.coinbase.com/"}
              label={"Coinbase Wallet"}
            />{" "}
            or other compatible browser extensions.
          </li>
          <li>
            Second, BrokenJazz tokens live on the Polygon network (formerly
            Matic). If you haven't set your Metamask to use it, click{" "}
            <Ab onClick={this.addMaticToMetamask} label={"here"} /> to add Matic
            configuration or to switch to it.
          </li>
          <li>
            When you're ready, clink on{" "}
            <Link to="/items/unclaimed">Available</Link> in the top menu.
          </li>
          <li>Find your numbered edition and click on it.</li>
          <li>Be sure that you are connected to the Polygon network.</li>
          <li>
            Have your CD cover with you because you will need to take a picture
            of it using your computer's webcam at some point.
          </li>
          <li>
            Press the button <span className={"button"}>Claim this token</span>.
            It will ask you to access the webcam. Say yes and take a picture of
            yourself with the cover showing the serial number on the CD.
          </li>
          <li>
            Fill in the form and choose the song you want as the soundtrack for
            the NFT.
          </li>
          <li>
            You will be asked to sign your claim using your wallet. You are not
            sending any money, just signing a request.
          </li>
        </ul>

        <p>
          When I receive your claim, I will verify that it is valid and create
          the video for your NFT. This usually takes me less than 24 hours. I
          will also send you some Matic ETH if you don't have any.
          <br />
          Later, in <Link to="/items/claimed">Claimed</Link>, you should find
          your NFT.
        </p>
        <p>To mint you token:</p>
        <ul>
          <li>Click on the name and go to the details page.</li>
          <li>
            Press the button <span className={"button"}>Mint your token</span>.
          </li>
          <li>
            Accept the transaction with Metamask and wait for it to be included
            in a block. When it's done you will find your BKJZ token in{" "}
            <Link to="/items/yours">Yours</Link>.
          </li>
        </ul>
      </div>
    );

    const text = (
      <div className={"textBlock"}>
        <p>
          As a musician, I have always focused on songs with vocals and lyrics.
          So, when I sit down at the piano to improvise something instrumental,
          I don't usually record it. As a result, I've composed thousands of
          fragments that get lost because of my terrible memory.
        </p>
        <p>
          In December 2020, I was trying to remember a piece I had composed a
          few years ago, but I couldn't. I was distraught, so I set up a
          minimalistic home studio to record musical ideas that I could use in
          the future.
        </p>
        <p>
          After a few days, I realized that some of the tunes were not bad and
          became excited. To keep me focused, I challenged myself to compose and
          record a new song every night until the end of the month. It was a
          wonderful experience, and by December 29th, I had 31 tunes.
        </p>
        <p>
          Then I found myself at a crossroads. Should I continue recording new
          songs every day in January, or take some time to improve the sound,
          fix technical mistakes, and produce a publishable record? The second
          option was much more appealing to me. I also thought that I could
          print a limited edition physical CD and maybe even create a
          non-fungible token (NFT) using a smart contract. So when I designed
          the cover, I left space for a serial code that could be used to claim
          the NFT associated with that copy. I looked online and found a company
          called{" "}
          <Ab
            label="Atomic Disc"
            link="https://www.atomicdisc.com/products/wallet-lite"
          />{" "}
          that could print the CDs for me. In total, I printed 50 numbered
          editions, 3 artist's proofs, and 1 personal copy for myself.
        </p>

        <p>
          When the record was available on{" "}
          <Ab
            link="https://open.spotify.com/album/4My9KYEGqtyx5wpgjDOdqi"
            label="Spotify"
          />
          ,{" "}
          <Ab
            link="https://www.pandora.com/artist/francesco-sullo/broken-jazz/AL25fq3ZmbgdPc4"
            label="Pandora"
          />
          ,{" "}
          <Ab
            link="https://music.amazon.com/albums/B08WZ2DB2N"
            label="Amazon Music"
          />
          , and other online services, I also added physical CD distribution
          through <Ab link="https://cdbaby.com" label="CDBaby" />.
        </p>

        <p>
          Once Amazon started selling the CDs, I began working on the smart
          contracts and this dapp.
        </p>
        <p>
          Only 54 BKJZ tokens will exist on the Polygon (formerly known as
          MATIC) network when all the tokens are minted. Each token has a unique
          video associated with it. It's possible that they will have some value
          in the future, even if it's not soon.
        </p>
        <p>
          So jump on{" "}
          <Ab link="https://amazon.com/dp/B08YCV1QL7" label="Amazon" /> and buy
          one CD before it is too late 🤩 It is only ~$15 😎
        </p>
      </div>
    );

    const row1 =
      this.Store.width < 900 ? (
        <Row>
          <Col>{title}</Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <div className={"spacer"} />
            {title}
            {text}
          </Col>
          <Col>{instruction}</Col>
        </Row>
      );

    const row2 =
      this.Store.width > 900 ? null : (
        <Row>
          <Col>>{text}</Col>
        </Row>
      );

    const row3 =
      this.Store.width > 900 ? null : (
        <Row>
          <Col>>{instruction}</Col>
        </Row>
      );

    return (
      <Container style={{ marginTop: 100 }}>
        {row1}
        {row2}
        {row3}
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </Container>
    );
  }
}
