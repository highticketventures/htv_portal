import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}