import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <Link href="/" className="flex items-center space-x-3">
        <Image
          src="/kaiavault logo.png"
          alt="Kaiavault Logo"
          width={48}
          height={48}
          priority
        />
        <span className="text-xl font-bold">Kaiavault</span>
      </Link>
      <nav className="hidden md:flex space-x-8">
        <Link href="/dashboard" className="hover:text-cyan-400 transition-colors">
          Dashboard
        </Link>
        <Link href="/vault" className="hover:text-cyan-400 transition-colors">
          Vault
        </Link>
        <Link href="/about" className="hover:text-cyan-400 transition-colors">
          About
        </Link>
        <Link href="/docs" className="hover:text-cyan-400 transition-colors">
          Docs
        </Link>
      </nav>
    </header>
  )
}
