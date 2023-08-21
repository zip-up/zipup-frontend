"use client";

import { useCreatePost } from "@/hooks/queries/posts";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../Common/Button";
import Image from "next/image";

export default function PostForm() {
  const { mutate } = useCreatePost();
  const session = useSession();
  const [file, setFile] = useState<File>();
  const [content, setContent] = useState("");

  if (!session.data?.user.id) return null;

  const onHandleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("file", file);
      formData.append("userId", session.data?.user.id);

      mutate(formData);
    }
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <form onSubmit={onHandleSubmit} className="w-full flex flex-col mt-2">
        <input
          type="file"
          accept="image/*"
          onChange={onHandleChangeFile}
          required
        />
        {file && (
          <div className="relative w-full aspect-square">
            <Image
              className="object-cover"
              src={URL.createObjectURL(file)}
              alt="local file"
              fill
              sizes="650px"
            />
          </div>
        )}
        <textarea
          className="outline-none text-lg border border-neutral-300"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit">제출</Button>
      </form>
    </section>
  );
}
