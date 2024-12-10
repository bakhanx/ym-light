"use server";
import getSession from "@/utils/session";

export const logOut = async () => {
  try {
    const session = await getSession();
    session.destroy();
  } catch (error) {
    console.error("error logout:", error);
  }
};
