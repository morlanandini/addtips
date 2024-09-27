"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';


const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();


  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
          src = {post.creator.image}
          alt="img"
          width={40}
          height={40}
          className="rounded-full object-contain"

          />
          <div className='flex flex-col'>
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
              </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
              </p>
          </div>
        </div>

      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p className="font-inter text-sm blue-gradient cursor-pointer">{post.tag}</p>

       {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
          className='font-inter text-sm green_gradient cursor-pointer'
          onClick={handleEdit}
          >
            Edit Tip
          </p>

          <p
          className='font-inter text-sm red_gradient cursor-pointer'
          onClick={handleDelete}
          >
            Delete Tip
          </p>
        </div>
       )} 

      </div>
  )
}

export default PromptCard