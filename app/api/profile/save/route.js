import { connectToDB } from "@/utils/database";
import User from "@/models/user";
export const dynamic = 'force-dynamic';
export const POST = async (req, res) => {
  try {
    await connectToDB();

    // Get the data from the request body
    const { username, name, image, email } = await req.json();
    // log all re body
    console.log("Email: " + email);
    console.log("Username: " + username);
    console.log("Name: " + name);
    console.log("Image: " + image);

    // Find the user with the given email
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return new Response("User not defined", { status: 500 });
    }

    // Update the user data
    user.username = username;
    user.image = image;
    user.name = name;

    // Save the updated user data to the database
    await user.save();

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error updating user data", error);
    return new Response("Failed to send Links", { status: 500 });
  }
};
