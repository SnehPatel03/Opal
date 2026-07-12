import { onAuthenticatedUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AuthCallbackPage = async (props: Props) => {
  const auth = await onAuthenticatedUser();
  console.log("auth", auth);
  if (auth.status == 200 || auth.status == 201) {
    return redirect(`/dashboard/${auth.data?.workspace[0].id}`);
  }
  if (auth.status == 400 || auth.status == 401) {
    return redirect(`/auth/sign-in`);
  }
};
export default AuthCallbackPage;