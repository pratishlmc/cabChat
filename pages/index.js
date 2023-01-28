import Head from 'next/head'
import { Roboto } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { BsCompass } from "react-icons/bs"
import Card from '../components/Card'

const roboto = Roboto({ weight: '400' })

export default function Home() {
  return (
    <main style={{ padding: 20 }}>

      <header style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <BsCompass size={45} />
        <h1 className={roboto.className}> Discover,</h1>
      </header>
      <section className={"cards-container"}>
        <Card title="Chat" img={require("../public/assets/chat.png")} url="chat" />
        <Card title="Translate" img={require("../public/assets/translate.png")} url="language-translate" />
      </section>
    </main>
  )
}