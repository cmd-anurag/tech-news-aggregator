'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Menu, X, Search, Moon, Sun, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  
  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${
      isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : "bg-transparent"
    }`}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        {/* Logo */}
        <Link 
          href="/" 
          className="group relative flex items-center font-black text-3xl md:text-4xl tracking-tight hover:scale-105 transition-all duration-300 ease-out"
        >
          <span className="bg-gradient-to-br from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow">Tech</span>
          <span className="relative">
            <span className="relative z-10">News</span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-primary to-blue-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg -z-10"></div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((category) => (
                      <Link key={category.title} href={category.href} legacyBehavior passHref>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">{category.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/trending" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Trending
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search button */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User account */}
          <Button>Sign In</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                  <span className="text-primary">Tech</span>News
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-medium" onClick={(e) => e.target instanceof Element && e.target.closest('button')?.click()}>
                    Home
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full text-lg font-medium">
                      Categories
                      <ChevronDown className="h-5 w-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56">
                      {categories.map((category) => (
                        <DropdownMenuItem key={category.title} asChild>
                          <Link href={category.href}>{category.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link href="/trending" className="text-lg font-medium" onClick={(e) => e.target instanceof Element && e.target.closest('button')?.click()}>
                    Trending
                  </Link>
                  <Link href="/about" className="text-lg font-medium" onClick={(e) => e.target instanceof Element && e.target.closest('button')?.click()}>
                    About
                  </Link>
                </nav>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="icon">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </div>
                <Button>Sign In</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const categories = [
  {
    title: "Artificial Intelligence",
    href: "/category/ai",
    description: "Latest news on AI, machine learning, and deep learning innovations.",
  },
  {
    title: "Blockchain",
    href: "/category/blockchain",
    description: "Cryptocurrency, NFTs, and blockchain technology developments.",
  },
  {
    title: "Programming",
    href: "/category/programming",
    description: "Updates on programming languages, frameworks, and developer tools.",
  },
  {
    title: "Startups",
    href: "/category/startups",
    description: "Emerging tech companies, funding rounds, and entrepreneurship.",
  },
  {
    title: "Cloud Computing",
    href: "/category/cloud",
    description: "News about cloud platforms, services, and infrastructure.",
  },
  {
    title: "Cybersecurity",
    href: "/category/security",
    description: "Security vulnerabilities, threats, and protection strategies.",
  },
]