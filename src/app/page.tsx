import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-20">
        <SignedOut>
          <div className="flex flex-col items-center justify-center gap-6 min-h-[70vh] text-center animate-fade-in">
            <div className="transform transition-all duration-500">
              <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Welcome to Request Hub
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Streamline your workflow by submitting and managing requests
              across companies efficiently
            </p>
            <div className="transform transition-all duration-300">
              <Link href="/sign-in">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col items-center justify-center gap-6 min-h-[70vh] text-center animate-fade-in">
            <div className="transform transition-all duration-500">
              <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Welcome back!
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Access your dashboard to manage and track all your requests in one
              place
            </p>
            <div className="transform transition-all duration-300">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
