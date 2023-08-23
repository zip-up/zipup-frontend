"use client";

import { useCreatePost } from "@/hooks/queries/posts";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Button from "../Common/Button";
import Image from "next/image";
import PostUserAvatar from "../PostUserAvatar";
import { FilesIcon } from "../ui/icons";

export default function PostForm() {
  const { mutate } = useCreatePost();
  const session = useSession();
  const [file, setFile] = useState<File>();
  const [content, setContent] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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

  const onHandleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    if (e.type === "dragenter") {
      setIsDragging(true);
    }
    if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const onHandleDragDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.items[0].getAsFile();

    if (droppedFile) setFile(droppedFile);
    setIsDragging(false);
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
          className="hidden"
        />
        <label
          htmlFor="input-upload"
          className={`cursor-pointer w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-400 border-dashed"
          }`}
          onDragEnter={onHandleDragEnter}
          onDragLeave={onHandleDragEnter}
          onDragOver={onHandleDragOver}
          onDrop={onHandleDragDrop}
        >
          {isDragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <>
              <FilesIcon size="w-9 h-9 text-gray-300" />
              <p>Drag and Drop your image here or click</p>
            </>
          )}
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
        </label>

        <textarea
          rows={10}
          placeholder={"Write a caption.."}
          className="outline-none border border-neutral-300 text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <Button type="submit" disabled={!file || !content}>
          Publish
        </Button>
      </form>
    </section>
  );
}
