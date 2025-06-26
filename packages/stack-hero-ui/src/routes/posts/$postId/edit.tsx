import { Card, CardBody, CardHeader, Spinner } from "@heroui/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PostForm } from "../../../components/PostForm";
import type { components } from "../../../generated/api";
import { useToast } from "../../../hooks/useToast";
import { usePost, useUpdatePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/edit")({
  component: PostEditPage,
});

function PostEditPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const updatePost = useUpdatePost();
  const { showToast } = useToast();

  const handleSubmit = async (
    formData: components["schemas"]["CreatePost"],
  ) => {
    try {
      const updateData: components["schemas"]["UpdatePost"] = {
        title: formData.title,
        content: formData.content,
        published: formData.published,
      };
      await updatePost.mutateAsync({
        params: { path: { id: postId } },
        body: updateData,
      });
      showToast("投稿を更新しました", "success");
      navigate({ to: "/posts/$postId", params: { postId } });
    } catch (error) {
      console.error("更新エラー:", error);
      showToast("投稿の更新に失敗しました", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-danger-50">
        <CardBody>
          <p className="text-sm text-danger">投稿が見つかりません</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <h1 className="text-2xl font-bold">投稿編集</h1>
      </CardHeader>
      <CardBody>
        <PostForm
          initialData={data.data}
          onSubmit={handleSubmit}
          isSubmitting={updatePost.isPending}
        />
      </CardBody>
    </Card>
  );
}
