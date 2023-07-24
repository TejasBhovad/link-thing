import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { randomBytes } from "crypto";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Fetch the data from the database when the user signs in
      await connectToDB();

      const user = await User.findOne({ email: session.user.email });

      // If the user is found, add the linksArray to the session object
      if (user) {
        session.user.id = user._id.toString();
        session.user.links = user.links;
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if the user exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new user record in the database
        if (!userExists) {
          const username = profile.name.replace(" ", "").toLowerCase();

          // Function to generate a random string of given length
          const generateRandomString = (length) => {
            return randomBytes(length).toString("hex").slice(0, length);
          };

          // Function to check if the username is taken
          const isUsernameTaken = async (usernameToCheck) => {
            const existingUserWithUsername = await User.findOne({
              username: usernameToCheck,
            });
            return !!existingUserWithUsername;
          };

          // Check if the username is already taken
          let modifiedUsername = username;
          let counter = 1;
          while (await isUsernameTaken(modifiedUsername)) {
            modifiedUsername = `${username}${generateRandomString(
              5
            )}_${counter}`;
            counter++;
          }

          const newUser = await User.create({
            email: profile.email,
            username: modifiedUsername,
            image: profile.picture,
            links: [], // Initialize an empty linksArray for the new user
          });

          // Set the newly created user's linksArray in the session
          profile.links = newUser.links;
        } else {
          // If the user exists, set the user's linksArray in the session
          profile.links = userExists.links;
        }

        // Return true to indicate successful sign-in
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
