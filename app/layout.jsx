import '@/styles/globals.css'
import { Children } from 'react'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'


export const metadata = {
    title : "Tipomania",
    description : "A mondern way to interact"
}


const RootLayout = ({ children }) => {

  return (
    <html lang="en">
        <body>
          <Provider>
            <div className='main'>
                <div className='gradient'></div>
            </div>
            <main className='app'>
            <Nav></Nav>
             {children}
            </main>
            </Provider>
        </body>

    </html>
  )
}

export default RootLayout