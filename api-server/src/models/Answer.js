import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const AnswerSchema = new Schema(
  {
    user_id: {
      type: String,
      trim: true,
    },
    query_id: {
      type: String,
      trim: true,
    },
    answer: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
AnswerSchema.plugin(uniqueValidator);

export default mongoose.model("Answer", AnswerSchema);
