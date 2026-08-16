import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
const AuthCallbackPage = async () => {
  const auth = await onAuthenticatedUser();

  if (auth.status === 200 || auth.status === 201) {
    const workspaceId = auth.data?.workspace.at(0)?.id;

    if (workspaceId) {
      redirect(`/dashboard/${workspaceId}`);
    }
  }

  redirect("/auth/sign-in");
};
export default AuthCallbackPage;
