'use client';

import { SignIn, UserButton } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center items-center ">
      
      <SignIn routing="hash" />

      
      {/* <UserButton afterSignOutUrl='/' /> */}
    </div>
  );
}
