"use server";
import getSession from "@/utils/session";

export const logOut = async () => {
  const session = await getSession();
  session.destroy();
};
