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
  if (invite.status == 404) {
    return redirect("/auth/sign-up");
  }
  if (invite.status == 401) {
    <h2>
      not Authorized
      <p>You are not Authorized!</p>
    </h2>;
  }

  if(invite.status === 200){
    return redirect('/auth/callback')
  }
  return <div>invitationPage</div>;
};

export default invitationPage;
