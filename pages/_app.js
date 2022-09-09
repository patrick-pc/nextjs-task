import '../styles/globals.css'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import Navbar from '../components/Navbar'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'NextJS Task',
      },
    }),
  ],
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }) {
  const [showing, setShowing] = useState(false)

  useEffect(() => {
    setShowing(true)
  }, [])

  if (!showing) return null

  if (typeof window === 'undefined') {
    return <></>
  } else {
    return (
      <WagmiConfig client={client}>
        <Head>
          <title>NextJS Task</title>
          <meta name="description" content="A NextJS task for NFT Launch Kit." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </WagmiConfig>
    )
  }
}

export default MyApp
