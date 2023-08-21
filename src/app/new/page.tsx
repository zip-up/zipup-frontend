import { Inter } from "next/font/google";
import PostForm from "@/components/PostForm";

const inter = Inter({ subsets: ["latin"] });

export default async function NewPage() {
  return (
    <section className="flex flex-col items-center max-w-[935px] m-auto">
      <PostForm />
    </section>
  );
}
