import { Schema, model, models, mongoose } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //1-* : one user is able to create many prompts
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required!'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required!'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
