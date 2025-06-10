import {
  OrganizationSwitcher,
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      {/* ...your logo and nav links... */}
      <div className="flex items-center gap-4"></div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <OrganizationSwitcher />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
