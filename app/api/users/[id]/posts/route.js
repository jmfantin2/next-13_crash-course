//MUST RETRIEVE POSTS OF A SPECIFIC USER
import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';

//params will be needed: session must be known
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      //0: useCase -> retrieve posts of a specific user
      //1: structure -> users/[id]/posts
      //2: params -> the id must come from somewhere
      //3: usage -> insert the param as a find option, matching one of the attributes
      creator: params.id,
    }).populate('creator');
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return (
      new Response('Failed to fetch all prompts!'),
      {
        status: 500,
      }
    );
  }
};
