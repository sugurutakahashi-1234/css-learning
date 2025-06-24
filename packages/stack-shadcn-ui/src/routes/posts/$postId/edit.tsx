import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { PostForm } from "../../../components/PostForm";
import type { components } from "../../../generated/api";
import { usePost, useUpdatePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/edit")({
  component: PostEditPage,
});

function PostEditPage(): React.ReactElement {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const updatePost = useUpdatePost();

  const handleSubmit = async (
    formData: components["schemas"]["CreatePost"],
  ): Promise<void> => {
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
      navigate({ to: "/posts/$postId", params: { postId } });
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="destructive">
        <AlertDescription>投稿が見つかりません</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        投稿編集
      </h1>
      <PostForm
        initialData={data.data}
        onSubmit={handleSubmit}
        isSubmitting={updatePost.isPending}
      />
    </div>
  );
}
