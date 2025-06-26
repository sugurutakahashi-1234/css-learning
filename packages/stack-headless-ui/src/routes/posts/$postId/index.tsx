import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { useDeletePost, usePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetailPage,
});

function PostDetailPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const deletePost = useDeletePost();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync({ params: { path: { id: postId } } });
      navigate({ to: "/" });
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <p className="text-sm text-red-800">投稿が見つかりません</p>
      </div>
    );
  }

  const post = data.data;

  return (
    <>
      <article className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← 一覧に戻る
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  post.published
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {post.published ? "公開" : "下書き"}
              </span>
              <time dateTime={post.createdAt}>
                作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
              </time>
              <time dateTime={post.updatedAt}>
                更新日: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
              </time>
            </div>
            <div className="flex gap-2">
              <Link
                to="/posts/$postId/edit"
                params={{ postId }}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                編集
              </Link>
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(true)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
              >
                削除
              </button>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-wrap text-gray-700">{post.content}</p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-2">タグ</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((postTag) => (
                <span
                  key={postTag.tagId}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {postTag.tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Headless UI 削除確認ダイアログ */}
      <Transition appear show={isDeleteDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <DialogTitle
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        投稿を削除
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          この投稿を削除してもよろしいですか？この操作は取り消せません。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsDeleteDialogOpen(false)}
                      disabled={deletePost.isPending}
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50"
                      onClick={handleDelete}
                      disabled={deletePost.isPending}
                    >
                      {deletePost.isPending ? "削除中..." : "削除"}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}