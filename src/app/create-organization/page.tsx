import { CreateOrganization } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <CreateOrganization />
    </div>
  );
}