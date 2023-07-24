import Links from "@/models/link";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { creator, links } = await req.json();
  try {
    await connectToDB();

    console.log(links);
    // If links is created, update the linksArray in the database
    const existingLinks = await Links.findOne({ creator });
    if (existingLinks) {
      existingLinks.links = links;
      await existingLinks.save();
      return new Response(JSON.stringify(existingLinks), { status: 200 });
    } else {
      const newLink = new Links({
        creator,
        links,
      });
      await newLink.save();
      return new Response(JSON.stringify(newLink), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to send Links", { status: 500 });
  }
};
