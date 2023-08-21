"use client";

import { useCreatePost } from "@/hooks/queries/posts";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Button from "../Common/Button";
import Image from "next/image";
import PostUserAvatar from "../PostUserAvatar";
import { FilesIcon } from "../UI/icons";

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

  const onHandleDragDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.items[0].getAsFile();

    if (droppedFile) setFile(droppedFile);
  };

  const onHandleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <PostUserAvatar
        username={session.data.user.name}
        image={session.data.user.image ?? ""}
      />
      <form onSubmit={onHandleSubmit} className="w-full flex flex-col mt-2">
        <input
          id="input-upload"
          name="input"
          type="file"
          accept="image/*"
          onChange={onHandleChangeFile}
          required
          className="hidden"
        />
        <label
          htmlFor="input-upload"
          className="cursor-pointer"
          onDragOver={onHandleDragOver}
          onDrop={onHandleDragDrop}
        >
          <FilesIcon size="w-9 h-9" />
          <p>Drag and Drop your image here or click</p>
        </label>

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
          rows={10}
          placeholder={"Write a caption.."}
          className="outline-none text-lg border border-neutral-300"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit">Publish</Button>
      </form>
    </section>
  );
}
