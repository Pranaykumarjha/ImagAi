"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { usePathname } from 'next/navigation'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'

function injectIdIntoRoute(route: string, id = "new") {
    if (!route.startsWith("/transformations")) return route;
    const parts = route.split("/").filter(Boolean);
    if (parts[0] !== "transformations") return route;
    const newParts = [parts[0], id, ...parts.slice(1)];
    return "/" + newParts.join("/");
}

const MobileNav = () => {
    const pathname = usePathname();
    const defaultId = "new";

    return (
        <header className="md:hidden w-full bg-white px-4 py-3">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/assets/images/logo-text.svg"
                        alt="Logo"
                        width={160}
                        height={28}
                    />
                </Link>

                <nav className="flex items-center gap-4">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />

                        <Sheet>
                            <SheetTrigger>
                                <Image
                                    src="/assets/icons/menu.svg"
                                    alt="Menu"
                                    width={32}
                                    height={32}
                                    className="cursor-pointer p-1 rounded-md hover:bg-gray-100"
                                />
                            </SheetTrigger>

                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        <Image
                                        src="/assets/images/logo-text.svg"
                                        alt="Logo"
                                        width={160}
                                        height={28}
                                        />
                                    </SheetTitle>
                                    <SheetDescription></SheetDescription>
                                </SheetHeader>

                                <ul className="sidebar-nav_elements flex flex-col gap-2 mt-6">
                                    {navLinks.slice(0, 6).map((link) => {
                                        const href = injectIdIntoRoute(link.route, defaultId);
                                        const isActive = href === pathname;
                                        return (
                                            <li key={href} className="list-none">
                                                <Link
                                                    href={href}
                                                    className={`
                                                        sidebar-nav_element group flex items-center gap-3
                                                        ${isActive ? "bg-linear-to-r from-purple-500 to-indigo-500 text-white" : "text-gray-700 hover:bg-gray-100"}
                                                        px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                                                    `}
                                                >
                                                    {link.icon && (
                                                        <Image
                                                            src={link.icon}
                                                            alt={`${link.label}-icon`}
                                                            width={20}
                                                            height={20}
                                                        />
                                                    )}
                                                    <span>{link.label}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </SheetContent>
                        </Sheet>
                    </SignedIn>
                    <SignedOut>
                        <div className="mt-auto">
                            <Button asChild className="button bg-linear-to-r from-purple-500 to-indigo-500 bg-cover">
                                <Link href="/sign-in">Log-In</Link>
                            </Button>
                        </div>
                    </SignedOut>
                </nav>
            </div>

            <div className="w-full h-px bg-gray-200 mt-3" />
        </header>
    )
}

export default MobileNav
