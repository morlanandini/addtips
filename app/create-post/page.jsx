"use client"

import { useState  } from "react";
import { useSession } from "next-auth/react";
import  Form  from "@/components/Form"
import { useRouter } from 'next/navigation';


const CreatePost = () => {
    const router = useRouter();
    const { data:session } = useSession();
    const [ submitting, setSubmitting ] = useState(false);
    const [ post, setPost ] = useState({
        prompt : '',
        tag: '',
    });

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch("/api/create/new",
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },                    
                      body: JSON.stringify({
                        prompt: post.prompt,
                        userId : session?.user.id,
                        tag:post.tag
                    })
                })
                if(response.ok) {
                    router.push('/');
                }

        } catch (error) {
            console.log(error + " hiii");
        } finally {
            setSubmitting(false);
        }

    }
  return (
    <Form
    type="Create"
    post = {post}
    setPost = {setPost}
    submitting = {submitting}
    handleSubmit = { handleCreatePost } 
    >
    </Form>
  )
}

export default CreatePost