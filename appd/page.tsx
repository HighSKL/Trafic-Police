'use client'
import Image from 'next/image'
import style from './page.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {

  let route = useRouter()
  useEffect(()=>{
    route.push('/auth')
  })

  return (
    <div className={style.wrapper}>
      
    </div>
  )
}
