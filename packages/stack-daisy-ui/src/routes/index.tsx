import { createFileRoute, Link } from "@tanstack/react-router";
import { PostCard } from "../components/PostCard";
import { usePosts } from "../user-posts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>エラーが発生しました: {error.message}</span>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-base-content/60">投稿がありません</p>
        <Link
          to="/posts/new"
          className="mt-4 btn btn-primary"
        >
          最初の投稿を作成
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">投稿一覧</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}