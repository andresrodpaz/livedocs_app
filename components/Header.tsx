import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'


const Header = ({children, className}:HeaderProps) => {
    return (
      <div className={cn("header", className)}>
          <Link href='/' className='md:flex-1 '>
              <Image
              src="/assets/icons/app-logo.png"
              alt='Logo with name'
              width={120}
              height={32}
              className='hidden ms:block'
              />
  
              <Image
              src="/assets/icons/app-logo.png"
              alt='Logo'
              width={150}
              height={32}
              className='mr-2 ms:block'
              />
          </Link>
          {children}
      </div>
    )
  }

export default Header