import { Card, CardBody, CardHeader } from "@heroui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PostForm } from "../../components/PostForm";
import type { components } from "../../generated/api";
import { useToast } from "../../hooks/useToast";
import { useCreatePost } from "../../user-posts";

export const Route = createFileRoute("/posts/new")({
  component: PostCreatePage,
});

function PostCreatePage() {
  const navigate = useNavigate();
  const createPost = useCreatePost();
  const { showToast } = useToast();

  const handleSubmit = async (data: components["schemas"]["CreatePost"]) => {
    try {
      await createPost.mutateAsync({ body: data });
      showToast("投稿を作成しました", "success");
      navigate({ to: "/" });
    } catch (error) {
      console.error("作成エラー:", error);
      showToast("投稿の作成に失敗しました", "error");
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h1 className="text-2xl font-bold">新規投稿作成</h1>
      </CardHeader>
      <CardBody>
        <PostForm onSubmit={handleSubmit} isSubmitting={createPost.isPending} />
      </CardBody>
    </Card>
  );
}
