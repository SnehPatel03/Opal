import { acceptInvite } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{
    inviteId: string;
  }>;
  children: React.ReactNode;
};

const invitationPage = async ({ params }: Props) => {
  const { inviteId } = await params;
  const invite = await acceptInvite(inviteId);
  if (invite.status === 404) {
    return redirect("/auth/sign-up");
  }

  if (invite.status === 401) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <section className="text-center">
          <h1 className="text-2xl font-semibold">Not authorized</h1>
          <p className="mt-2 text-muted-foreground">
            This invitation belongs to a different account.
          </p>
        </section>
      </main>
    );
  }

  if (invite.status === 200) {
    return redirect("/auth/callback");
  }

  return <div>Unable to process this invitation.</div>;
};

export default invitationPage;
