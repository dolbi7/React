import style from'./globals.css'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next.js 게시판',
  description: '제작자 : 김현우',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Image 
            className="topBanner" 
            width="0"
            height="0"
            priority="true"
            src ="/logo.jpg" 
            alt="서울기술교육센터" />
        </div>
	      {children}
      </body>
    </html>
  )
}
