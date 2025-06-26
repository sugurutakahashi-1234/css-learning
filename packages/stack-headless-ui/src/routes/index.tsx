import { Transition } from "@headlessui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react";
import { PostCard } from "../components/PostCard";
import { usePosts } from "../user-posts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <Transition
        appear
        show={true}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
        </div>
      </Transition>
    );
  }

  if (error) {
    return (
      <Transition
        appear
        show={true}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4"
        enterTo="opacity-100 translate-y-0"
      >
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">
            エラーが発生しました: {error.message}
          </p>
        </div>
      </Transition>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Transition
        appear
        show={true}
        as={Fragment}
        enter="ease-out duration-500"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
      >
        <div className="text-center py-12">
          <p className="text-gray-500">投稿がありません</p>
          <Link
            to="/posts/new"
            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            最初の投稿を作成
          </Link>
        </div>
      </Transition>
    );
  }

  return (
    <Transition
      appear
      show={true}
      as={Fragment}
      enter="ease-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">投稿一覧</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Transition
              key={post.id}
              show={true}
              appear={true}
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
            >
              <div>
                <PostCard post={post} />
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </Transition>
  );
}
