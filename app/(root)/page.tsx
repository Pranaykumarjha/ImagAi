'use client';

import { SignIn, UserButton } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen gap-4">
      
      <SignIn routing="hash" />

      
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}
