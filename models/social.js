import { Schema, model, models } from "mongoose";

// Define the newSocialsSchema
const SocialSchema = new Schema({
  creator: {
    type: String,
    required: true,
  },

  socialLinks: {
    type: Array,
    required: true,
  },
});

// Check if the model "Socials" already exists in the current Mongoose instance
const Socials = models.Socials || model("Socials", SocialSchema);
// Export the updated Socials model
export default Socials;
