import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  // const { email } = req.query;
  try {
    await connectToDB();

    // const links = await User.find({});
    //   find the user with given email
    const user = await User.find({});
    //   if user not found
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    //   if user found
    return new Response(JSON.stringify(user), {
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch Links created by user", {
      status: 500,
    });
  }
};
