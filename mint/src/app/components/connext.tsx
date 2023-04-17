"use client"

import { useAccount, useConnectors } from "@starknet-react/core"

export const Connect = () => {
    const { connect, connectors } = useConnectors()
    const { account, address, status } = useAccount()
    return <ul>
        {account?.address}
        {connectors.map((connector) => (
            <li key={connector.id()}>

                <button onClick={() => connect(connector)}>
                    Connect {connector.id()}
                </button>
            </li>
        ))}
    </ul>
}