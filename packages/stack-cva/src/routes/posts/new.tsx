import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PostForm } from "../../components/PostForm";
import type { components } from "../../generated/api";
import { cn } from "../../lib/utils";
import { card, pageTitle } from "../../styles/variants";
import { useCreatePost } from "../../user-posts";

export const Route = createFileRoute("/posts/new")({
  component: PostCreatePage,
});

function PostCreatePage() {
  const navigate = useNavigate();
  const createPost = useCreatePost();

  const handleSubmit = async (data: components["schemas"]["CreatePost"]) => {
    try {
      await createPost.mutateAsync({ body: data });
      navigate({ to: "/" });
    } catch (error) {
      console.error("作成エラー:", error);
    }
  };

  return (
    <div className={cn(card(), "p-8")}>
      <h1 className={cn(pageTitle(), "mb-6")}>新規投稿作成</h1>
      <PostForm onSubmit={handleSubmit} isSubmitting={createPost.isPending} />
    </div>
  );
}
