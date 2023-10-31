import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';

//this is what an API route looks like in NextJS
export const POST = async (req) => {
  //you can immediately extract all of the data
  //that you pass through the post request
  const { userId, prompt, tag } = await req.json();
  try {
    //you connect to the db, which has to be done everytime
    //since it's a LAMBDA FUNCTION (it dies once it does its job)
    await connectToDB();
    //if everything's right, the Form data is saved in the Schema
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), {
      status: 201, //it means CREATED
    });
  } catch (error) {
    return new Response('Failed to create a new prompt', {
      status: 500, //server error
    });
  }
};
