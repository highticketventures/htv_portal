import { SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { Container, Flex, Text, Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="py-10">
      <SignedOut>
        <Flex direction="column" align="center" justify="center" gap="4" className="min-h-[60vh]">
          <Text size="8" weight="bold">Welcome to Request Hub</Text>
          <Text size="4" color="gray">Submit and manage requests across companies</Text>
          <SignIn />
        </Flex>
      </SignedOut>

      <SignedIn>
        <Flex direction="column" align="center" justify="center" gap="4" className="min-h-[60vh]">
          <Text size="8" weight="bold">Welcome back!</Text>
          <Text size="4" color="gray">Go to your dashboard to manage requests</Text>
          <Link href="/dashboard">
            <Button size="3">Go to Dashboard</Button>
          </Link>
        </Flex>
      </SignedIn>
    </Container>
  );
}
