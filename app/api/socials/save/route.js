import Socials from "@/models/social";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  const { creator, socialLinks } = await req.json();
  try {
    await connectToDB();

  
    // If links exist for the creator, update the socialLinks array in the database
    let existingSocials = await Socials.findOne({ creator });
    if (existingSocials) {
      // console.log(existingSocials);
      console.log(socialLinks);
      existingSocials.socialLinks = socialLinks; // Update the socialLinks array
      await existingSocials.save();
      return new Response(JSON.stringify(existingSocials), { status: 200 });
    } else {
      const newSocials = new Socials({
        creator,
        socialLinks,
      });
      await newSocials.save();
      return new Response(JSON.stringify(newSocials), { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to send Links", { status: 500 });
  }
};
