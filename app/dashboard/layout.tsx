import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <HeaderClient />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
