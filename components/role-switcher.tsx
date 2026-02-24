'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, User, Home, Briefcase } from 'lucide-react'

export function RoleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const getCurrentRole = () => {
    if (pathname.includes('/buyer')) return 'Buyer'
    if (pathname.includes('/vendor')) return 'Vendor'
    if (pathname.includes('/realtor')) return 'Realtor'
    return 'Dashboard'
  }

  const getRoleIcon = () => {
    if (pathname.includes('/buyer')) return <User className="w-4 h-4" />
    if (pathname.includes('/vendor')) return <Home className="w-4 h-4" />
    if (pathname.includes('/realtor')) return <Briefcase className="w-4 h-4" />
    return <User className="w-4 h-4" />
  }

  const switchRole = (role: string) => {
    router.push(`/dashboard/${role}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {getRoleIcon()}
          <span>{getCurrentRole()}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Switch Dashboard</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => switchRole('buyer')}
          className="cursor-pointer"
        >
          <User className="w-4 h-4 mr-2" />
          Buyer Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchRole('vendor')}
          className="cursor-pointer"
        >
          <Home className="w-4 h-4 mr-2" />
          Vendor Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchRole('realtor')}
          className="cursor-pointer"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Realtor Dashboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
