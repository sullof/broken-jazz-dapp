import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Base from './Base';
import Ab from './Ab';

export default class Intro extends Base {
  constructor(props) {
    super(props);

    this.bindMany(['addMaticToMetamask']);
  }

  async addMaticToMetamask() {
    if (this.Store.signedInAddress) {
      const params = {
        chainId: '0x89',
        chainName: 'Matic(Polygon) Mainnet',
        nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
        rpcUrls: [
          'https://rpc-mainnet.maticvigil.com',
          'https://rpc-mainnet.matic.network',
          'wss://ws-mainnet.matic.network',
          'https://rpc-mainnet.matic.quiknode.pro',
          'https://matic-mainnet.chainstacklabs.com',
        ],
        blockExplorerUrls: ['https://polygonscan.com'],
      };

      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
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
      <div className={'textBlock instructionSteps'}>
        <h4 style={{ marginTop: 12 }}>How it worked</h4>

        <p>
          I printed only 50 copies of my Broken Jazz record, numbered from 1 to
          50, plus three artist's proofs and one Artist's copy.
        </p>
        <div className={'roundedIn'}>
          The original owners of a physical CD could claim their NFT by doing so
          before September 26th, 2021. After that deadline passed, the claiming
          process was permanently closed. The NFTs that were successfully minted
          remain on the Polygon blockchain, but new claims are no longer possible.
        </div>

        <h5>How the NFT claiming process worked</h5>
        <p>
          <i>Note: The claiming process expired on September 26th, 2021 and is no longer available.</i>
        </p>
        <ul>
          <li>
            <strong>Connect your wallet:</strong> Users needed to connect a crypto
            wallet (such as Metamask or Coinbase Wallet) to interact with the blockchain.
          </li>
          <li>
            <strong>Switch to Polygon network:</strong> BrokenJazz tokens were
            deployed on the Polygon network (formerly known as Matic), so users
            needed to configure their wallet to connect to that network.
          </li>
          <li>
            <strong>Find available tokens:</strong> Users could browse available
            (unclaimed) tokens that matched their CD's serial number.
          </li>
          <li>
            <strong>Claim the token:</strong> To verify ownership, users took a
            webcam photo of themselves with the CD cover clearly showing the serial
            number. They would then fill out a form, select a track for their NFT,
            and sign the claim using their wallet.
          </li>
          <li>
            <strong>Mint the NFT:</strong> Once the claim was verified, users could
            mint their NFT on the blockchain, creating a permanent, unique token
            with an associated video.
          </li>
        </ul>

        <p>
          When I received a claim, I would verify its validity and create the
          video for the NFT. This process typically took less than 24 hours. I
          also provided Matic ETH to users who needed it to cover transaction fees.
        </p>
        <p>
          The minted BKJZ tokens that exist today can still be viewed and traded
          on NFT marketplaces like{' '}
          <Ab
            link="https://opensea.io/collection/brokenjazz"
            label="OpenSea"
          />, but the claiming process has permanently ended.
        </p>
      </div>
    );

    const text = (
      <div className={'textBlock'}>
        <p>
          As a musician, I have always focused on songs with vocals and lyrics.
          When I sit down at the piano to improvise something instrumental, I
          rarely record it. As a result, I've composed thousands of fragments
          that get lost due to my poor memory.
        </p>
        <p>
          In December 2020, I was trying to remember a piece I had composed a
          few years earlier, but I couldn't recall it. Frustrated by this loss, I
          set up a minimal home studio to record musical ideas for future use.
        </p>
        <p>
          After a few days, I realized that some of the tunes were actually quite
          good, which got me excited. To maintain focus, I challenged myself to
          compose and record a new song every night until the end of the month.
          It was a wonderful experience, and by December 29th, I had 31 tunes.
        </p>
        <p>
          Then I found myself at a crossroads. Should I continue recording new
          songs daily in January, or take time to improve the sound quality,
          fix technical mistakes, and produce a publishable record? The second
          option appealed to me much more. I also considered printing a limited
          edition physical CD and perhaps creating a non-fungible token (NFT)
          using a smart contract. When I designed the cover, I left space for
          a serial code that could be used to claim the NFT associated with
          that copy. I found a company called{' '}
          <Ab
            label="Atomic Disc"
            link="https://www.atomicdisc.com/products/wallet-lite"
          />{' '}
          to handle the printing. In total, I printed 50 numbered editions,
          3 artist's proofs, and 1 personal copy for myself.
        </p>

        <p>
          Once the record became available on{' '}
          <Ab
            link="https://open.spotify.com/album/4My9KYEGqtyx5wpgjDOdqi"
            label="Spotify"
          />
          ,{' '}
          <Ab
            link="https://www.pandora.com/artist/francesco-sullo/broken-jazz/AL25fq3ZmbgdPc4"
            label="Pandora"
          />
          ,{' '}
          <Ab
            link="https://music.amazon.com/albums/B08WZ2DB2N"
            label="Amazon Music"
          />
          , and other online services, I also arranged physical CD distribution
          through <Ab link="https://cdbaby.com" label="CDBaby" />.
        </p>

        <p>
          After Amazon began selling the CDs, I started working on the smart
          contracts and this decentralized application.
        </p>
        <p>
          Although 54 BKJZ tokens were planned for the Polygon network, only 16
          tokens were ultimately minted. Each token features a unique video
          associated with it.
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
            <div className={'spacer'} />
            {title}
            {text}
          </Col>
          <Col>{instruction}</Col>
        </Row>
      );

    const row2 =
      this.Store.width > 900 ? null : (
        <Row>
          <Col>{text}</Col>
        </Row>
      );

    const row3 =
      this.Store.width > 900 ? null : (
        <Row>
          <Col>{instruction}</Col>
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
