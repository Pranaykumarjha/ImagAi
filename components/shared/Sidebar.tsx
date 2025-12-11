"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";

function injectIdIntoRoute(route: string, id = "new") {
  if (!route.startsWith("/transformations")) return route;
  const parts = route.split("/").filter(Boolean);
  if (parts[0] !== "transformations") return route;
  const newParts = [parts[0], id, ...parts.slice(1)];
  return "/" + newParts.join("/");
}

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const defaultId = "new";

  return (
    <aside className="sidebar w-64 h-screen border-r border-gray-200">
      
      <div className="flex flex-col h-full gap-4 px-4 py-6">
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/logo-text.svg" alt="Logo" width={180} height={28} />
        </Link>

        
        <nav className="sidebar-nav flex flex-col justify-between flex-1">
          <SignedIn>
            
            <ul className="sidebar-nav_elements flex flex-col gap-2">
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
                        <Image src={link.icon} alt={`${link.label}-icon`} width={20} height={20} />
                      )}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

           
            <ul className="sidebar-nav_user">
              {navLinks.slice(6).map((link) => {
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
                        <Image src={link.icon} alt={`${link.label}-icon`} width={20} height={20} />
                      )}
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="flex items-center gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
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
    </aside>
  );
};

export default Sidebar;
