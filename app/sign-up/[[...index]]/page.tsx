import { SignUp } from '@clerk/nextjs'
import { HeaderClient } from '@/components/header-client'
import { Footer } from '@/components/footer'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <HeaderClient />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Kaison Estate and start your property journey</p>
          </div>
          <SignUp />
        </div>
      </main>
      <Footer />
    </div>
  )
}
