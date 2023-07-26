import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDB();
    
    // Get the data from the request body
    const { email, username, userId, image } = req.body;

    // Find the user with the given email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user data
    user.username = username;
    user.userId = userId;
    user.image = image;

    // Save the updated user data to the database
    await user.save();

    return res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    console.error("Error updating user data", error);
    return res.status(500).json({ message: "Failed to update user data" });
  }
}
