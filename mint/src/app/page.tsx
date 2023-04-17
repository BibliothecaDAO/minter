"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { StarknetConfig, InjectedConnector, useConnectors } from '@starknet-react/core'
import { Connect } from './components/connext'
import { AdventurerWizard } from './components/AdventurerWizard'
import { WizardProvider } from './components/WizardProvider'
import { NavBar } from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {




  return (


    <main className="flex flex-col items-center justify-between w-full min-h-screen p-16 mx-auto">
      {/* <Connect /> */}
      <AdventurerWizard />
    </main>

  )
}
