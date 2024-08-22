"use server"
import getSession from "@/libs/session";
import { redirect } from "next/navigation";


export const logOut = async () => {
  const session = await getSession();
  await session.destroy();
  redirect("/");
};
