"use client"
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/constants';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar w-64 h-screen border-r border-gray-200">
      <div className="flex side-full flex-col gap-4 px-4 py-6">
        
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/logo-text.svg" alt="Logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    className={`
                      sidebar-nav_element group 
                      ${isActive
                        ? 'bg-linear-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                      }
                      px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                      flex items-center gap-3
                    `}
                  >
                    <Link className='sidebar-link' href={link.route}>
                    <Image
                    src={link.icon}
                    alt='logo'
                    width={24}
                    height={24}
                    className={`${isActive && 'brightness-200'}`}/>
                    {link.label}
                      </Link>
                  </li>
                );
              })}
            </ul>
          </SignedIn>
        </nav>

      </div>
    </aside>
  );
};

export default Sidebar;
