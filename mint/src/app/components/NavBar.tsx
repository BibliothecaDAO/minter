"use client"

import Link from "next/link"
import { useAccount, useConnectors } from "@starknet-react/core"
import { Button } from "./ui/button"

export const NavBar = () => {

    const { connect, connectors } = useConnectors()
    const { account, address, status } = useAccount()
    return (
        <div className="flex justify-between w-full py-4 text-white bg-stone-900">
            <div className="flex px-2 space-x-2">
                <Button variant={'ghost'} href="/">wizard</Button>

                <Button variant={'ghost'} href="/images">all images</Button>
                {address && <Button href={`/images/${address}`}>my images</Button>}
            </div>



            <div className="px-2">
                {status === "connected" ? <Button variant={'ghost'} href={`/images/${address}`}>{shortenHex(address || '')}</Button> : connectors.map((connector) => (
                    <Button variant={'ghost'} key={connector.id()} onClick={() => connect(connector)}>
                        Connect {connector.id()}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export function shortenHex(hexString: string, numDigits = 6) {
    if (hexString.length <= numDigits) {
        return hexString;
    }

    const halfDigits = Math.floor(numDigits / 2);
    const firstHalf = hexString.slice(0, halfDigits);
    const secondHalf = hexString.slice(-halfDigits);
    return `${firstHalf}...${secondHalf}`;
}