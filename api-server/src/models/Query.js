import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const QuerySchema = new Schema(
  {
    query: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
QuerySchema.plugin(uniqueValidator);

export default mongoose.model("Query", QuerySchema);
