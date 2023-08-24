import Socials from "@/models/social";

import { connectToDB } from "@/utils/database";
export const dynamic = 'force-dynamic';
export const GET = async () => {
  try {
    await connectToDB();

    const socialLinks = await Socials.find({});
    // console.log(links);
    return new Response(JSON.stringify(socialLinks), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Links created by user", {
      status: 500,
    });
  }
};
