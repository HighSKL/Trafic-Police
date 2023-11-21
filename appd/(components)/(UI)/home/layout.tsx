import Header from '@/app/modules/Header/header'
import Menu from '@/app/modules/Menu/Menu'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import style from './homePage.module.scss'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Главная',
}

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      
      <body className={inter.className}>
        <div className={style.layout_wrapper}>
          <div className={style.header_container}>
            <Header />
          </div>
          <div className={style.horizontal_tools_container}>
            <div className={style.menu_container}>
              <Menu />
            </div>
            {children}
          </div>
          
          
        </div>
      </body>
    </html>
  )
}
