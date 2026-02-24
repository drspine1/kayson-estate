'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Home, Heart, FileText, Settings, LogOut, BarChart3, Plus, Users, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface DashboardSidebarProps {
  userType: 'buyer' | 'vendor' | 'realtor'
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false) // Mobile: closed by default
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)

  const navItems = {
    buyer: [
      { href: '/dashboard/buyer', icon: Home, label: 'Overview', exact: true },
      { href: '/properties', icon: Heart, label: 'Browse Properties' },
    ],
    vendor: [
      { href: '/dashboard/vendor', icon: Home, label: 'Overview', exact: true },
      { href: '/properties', icon: FileText, label: 'View Listings' },
    ],
    realtor: [
      { href: '/dashboard/realtor', icon: Home, label: 'Overview', exact: true },
      { href: '/properties', icon: Plus, label: 'All Properties' },
    ],
  }

  const items = navItems[userType]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isDesktopCollapsed ? 'lg:w-20' : 'lg:w-64'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 bg-primary text-primary-foreground transition-all duration-300 
          fixed h-screen flex flex-col z-40
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-primary-foreground/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary">
              K
            </div>
            {!isDesktopCollapsed && <span className="font-semibold text-lg">Kaison</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {items.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 text-base ${
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground border-l-4 border-accent hover:bg-primary-foreground/30'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isDesktopCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Settings and Logout */}
        <div className="p-4 border-t border-primary-foreground/20 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-3 text-base text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Home className="w-5 h-5 flex-shrink-0" />
              {!isDesktopCollapsed && <span>Home</span>}
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start gap-3 text-base text-primary-foreground/80 hover:bg-destructive/20 hover:text-primary-foreground">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isDesktopCollapsed && <span>Logout</span>}
          </Button>
        </div>

        {/* Toggle Button (Desktop only) */}
        <div className="hidden lg:block p-4 border-t border-primary-foreground/20">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
            className="w-full text-primary-foreground hover:bg-primary-foreground/10"
          >
            {isDesktopCollapsed ? '→' : '←'}
          </Button>
        </div>
      </aside>
    </>
  )
}
