import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PostForm } from "../../../components/PostForm";
import type { components } from "../../../generated/api";
import { usePost, useUpdatePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/edit")({
  component: PostEditPage,
});

function PostEditPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const updatePost = useUpdatePost();

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
      navigate({ to: "/posts/$postId", params: { postId } });
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="alert alert-error">
        <span>投稿が見つかりません</span>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-sm p-8">
      <h1 className="text-2xl font-bold mb-6">投稿編集</h1>
      <PostForm
        initialData={data.data}
        onSubmit={handleSubmit}
        isSubmitting={updatePost.isPending}
      />
    </div>
  );
}