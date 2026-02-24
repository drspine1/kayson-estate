import { SignIn } from '@clerk/nextjs'
import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderClient />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Kaison-Estate account</p>
          </div>
          <SignIn />
        </div>
      </main>
      <Footer />
    </div>
  )
}
