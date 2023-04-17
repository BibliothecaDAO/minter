"use client"

import Link from "next/link"
import { useAccount, useConnectors } from "@starknet-react/core"
import { Button } from "./ui/button"

export const NavBar = () => {

    const { connect, connectors } = useConnectors()
    const { account, address, status } = useAccount()
    return (
        <div className="flex justify-between w-full py-4 text-white bg-black">
            <Button href="/">wizard</Button>

            <Button href="/images">all images</Button>
            {address && <Button href={`/images/${address}`}>my images</Button>}

            {status}
            {connectors.map((connector) => (
                <Button key={connector.id()} onClick={() => connect(connector)}>
                    Connect {connector.id()}
                </Button>
            ))}
        </div>
    )
}