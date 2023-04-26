"use client"

import { NavBar } from './components/NavBar'
import './globals.css'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import { Inconsolata, Karla } from "next/font/google";
import { WizardProvider } from './components/WizardProvider'

const connectors = [
  new InjectedConnector({ options: { id: 'braavos' } }),
  new InjectedConnector({ options: { id: 'argentX' } }),
]

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  display: "swap"
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: "800",
  display: "swap"
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inconsolata.variable} ${karla.variable} bg-stone-900 text-stone-200 bg-background bg-no-repeat bg-cover min-h-screen flex flex-col`}>
        <StarknetConfig autoConnect connectors={connectors}>
          <WizardProvider>
            <NavBar />
            {children}
          </WizardProvider>
        </StarknetConfig>
      </body>
    </html>
  )
}
