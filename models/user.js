import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
    ],
  },
  image: {
    type: String,
  },
});

// we do that only when working with a always on backend server:
// const User = model("User", UserSchema)

/* for the NextJS API we must implement the following scenario:
    1.0 The 'models' object is provided by the Mongoose library and stores all the registered models.
    2.0 If a model named 'User' already exists in the 'models' object, it assigns that existing model to the 'User' variable.
    2.1 This prevents redefining the model and ensures that the existing model is reused.
    3.0 If a model named 'User' doesn't exist in the 'models' object, the 'model' function from Mongoose is called to create a new model.
    3.1 The newly created model is then assigned to the 'User' variable.
*/

// const User = model("User", UserSchema)
const User = models.User || model('User', UserSchema);

export default User;
