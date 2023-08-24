import Links from "@/models/link";
import { connectToDB } from "@/utils/database";
export const dynamic = 'force-dynamic';
export const GET = async () => {
  try {
    await connectToDB();

    const links = await Links.find({});
    // console.log(links);
    return new Response(JSON.stringify(links), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Links created by user", {
      status: 500,
    });
  }
};
