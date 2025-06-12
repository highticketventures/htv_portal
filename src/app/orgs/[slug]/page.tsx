import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, Activity, Calendar, Building2 } from "lucide-react";

export default async function Home(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const authObject = await auth();
  const orgSlug = authObject.orgSlug;

  console.log(params.slug);
  console.log(orgSlug);
  if (params.slug != orgSlug) {
    return <></>;
  }

  // The organization name was added to session claims for this application by
  // [customizing the session token](https://clerk.com/docs/backend-requests/making/custom-session-token),
  // using the following template:
  // ```json
  // {
  //  "org_name": "{{org.name}}"
  // }
  // ```
  let orgName = authObject.sessionClaims["org_name"] as string;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">{orgName}</h1>
        </div>
        <Button asChild variant="outline">
          <Link href={`/orgs/${orgSlug}/settings`}>
            <Settings className="w-4 h-4 mr-2" />
            Organization Settings
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Requests this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2024</p>
            <p className="text-sm text-muted-foreground">
              Organization founded
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href={`/orgs/${orgSlug}/members`}>
                <Users className="w-4 h-4 mr-2" />
                Manage Members
              </Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href={`/orgs/${orgSlug}/requests`}>
                <Activity className="w-4 h-4 mr-2" />
                View Requests
              </Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href={`/orgs/${orgSlug}/settings`}>
                <Settings className="w-4 h-4 mr-2" />
                Organization Settings
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm font-medium">New member joined</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-medium">New request created</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="text-sm font-medium">Settings updated</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
