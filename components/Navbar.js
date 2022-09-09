import NextLink from 'next/link'
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

const Navbar = () => {
  const { address, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <header className="flex flex-row items-center justify-between gap-2 p-6 mb-6">
      <NextLink href="/">
        <h1 className="font-bold text-2xl cursor-pointer">NextJS Task</h1>
      </NextLink>

      <div className="flex gap-2">
        {isConnected ? (
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              {ensAvatar && (
                <img className="h-6 w-6 rounded-full" src={ensAvatar} alt="ENS Avatar" />
              )}
              <div>{ensName ? ensName : address}</div>
            </div>
            <button className="text-white bg-black rounded-md py-2 px-4" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        ) : (
          connectors.map((connector) => (
            <button
              className="text-white bg-black rounded-md px-4 py-2"
              onClick={() => connect({ connector })}
              disabled={!connector.ready}
              key={connector.id}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))
        )}
      </div>
    </header>
  )
}
export default Navbar
