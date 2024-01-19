import NavBar from '@/components/Navbar'
import './globals.css'


export const metadata = {
  title: 'CRUD Nextjs App',
  description: 'CRUD con Nextjs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  )
}
