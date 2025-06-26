import { createFileRoute, Link } from "@tanstack/react-router";
import { PostCard } from "../components/PostCard";
import { cn } from "../lib/utils";
import { button, loadingSpinner, pageTitle } from "../styles/variants";
import { usePosts } from "../user-posts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className={cn(loadingSpinner(), "border-blue-600")}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-800">
          エラーが発生しました: {error.message}
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">投稿がありません</p>
        <Link
          to="/posts/new"
          className={cn(button(), "mt-4 inline-block")}
        >
          最初の投稿を作成
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className={cn(pageTitle(), "mb-6")}>投稿一覧</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
