import Login from '@/components/Login'
import { SessionProvider } from '@/components/SessionProvider'
import Sidebar from '@/components/Sidebar'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import '@/styles/globals.css'
import { getServerSession } from 'next-auth'
import ClientProvioder from '../components/ClientProvioder'
export const metadata = {
  title: 'Chat-GPT',
  description: 'Generated by Next.js',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  // console.log(session)
  return (
    <html>
      <body>
        <SessionProvider session={session}>
          {session ?
            <div className="flex">
              <div className=" bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[40rem] sticky top-0">
                <Sidebar />
              </div>
              <ClientProvioder />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
            :
            <Login />
          }
        </SessionProvider>
      </body>
    </html>
  )
}
