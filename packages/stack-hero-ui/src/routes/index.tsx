import { Button, Spinner } from "@heroui/react";
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
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-danger-50 p-4">
        <p className="text-sm text-danger">
          エラーが発生しました: {error.message}
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-default-500 mb-4">投稿がありません</p>
        <Button as={Link} to="/posts/new" color="primary" variant="solid">
          最初の投稿を作成
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 gradient-text animate-gradient">
          投稿一覧
        </h1>
        <p className="text-default-600">すべての投稿を表示しています</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
