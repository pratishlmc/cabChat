import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import { Roboto } from '@next/font/google'
const roboto = Roboto({ weight: '400' })

import { BsHouseFill } from "react-icons/bs"
import Link from 'next/link'
import { useRouter } from 'next/router'



export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <>
      {
        router.pathname !== '/' ?
          <Link href={'/'}>
            <section className={styles.header}>
              <BsHouseFill size={20} />
              <span style={roboto.style}>Home</span>
            </section>
          </Link>
          :
          null
      }

      <Component {...pageProps} />
    </>
  )
}
