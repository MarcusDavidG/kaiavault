import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <Link href="/">
        <a className="flex items-center space-x-3">
          <Image
            src="/kaiavault logo.png"
            alt="Kaiavault Logo"
            width={48}
            height={48}
            priority
          />
          <span className="text-xl font-bold">Kaiavault</span>
        </a>
      </Link>
      {/* Add navigation or other header content here */}
    </header>
  )
}
