import React from 'react'
import Image from 'next/image'
import { Roboto } from '@next/font/google'
import { FaExternalLinkAlt } from "react-icons/fa"
import Link from 'next/link'


const roboto = Roboto({ weight: '400' })

function Card({ title, img, url }) {
  return (
    <Link href={`/${url}`}>
      <div className='activities-card'>
        <Image src={img} height={100} width={100} alt={title} />
        <button style={roboto.style}>{title} <FaExternalLinkAlt size={14} /></button>
      </div>
    </Link>
  )
}

export default Card