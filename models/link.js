import { Schema, model, models } from "mongoose";

// Define the new LinkSchema
const LinkSchema = new Schema({
  creator: {
    type: String,
    required: true,
  },

  links: {
    type: Array,
    required: true,
  },
});

// Check if the model "Links" already exists in the current Mongoose instance
const Links = models.Links || model("Links", LinkSchema);

// Export the updated Links model
export default Links;
