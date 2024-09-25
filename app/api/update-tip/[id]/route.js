import { connectToDB } from '@/utils/database';
import Prompt from '@/models/prompt';
import { useRouter } from 'next/navigation'; // Added this import


export const GET = async (request, { params }) => {
    try {
        await connectToDB();
        // console.log(params.id+" in route");

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")
        console.log(prompts);

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 
export const PATCH = async (request, { params }) => {

    const { prompt, tag } = await request.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found", {status: 404})

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    }
    catch (error) {
        return new Response("failed to fetch all prompts", { status: 500})
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
