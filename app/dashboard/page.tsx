import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
const DashboardPage = async () => {
  const auth = await onAuthenticatedUser();

  if (auth.status === 200 || auth.status === 201) {
    const workspaceId = auth.data?.workspace?.[0]?.id;

    if (workspaceId) {
      return redirect(`/dashboard/${workspaceId}`);
    }
  }

  return redirect("/auth/sign-in");
};
export default DashboardPage;
