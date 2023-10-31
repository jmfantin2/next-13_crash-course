'use client'; //CLIENT COMPONENT

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

export function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <Image
          src={post.creator.image}
          alt="user image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
      </div>
    </div>
  );
}
