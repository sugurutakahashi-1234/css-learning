import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  button,
  card,
  link,
  loadingSpinner,
  modalContent,
  modalDialog,
  modalOverlay,
  statusBadge,
} from "../../../styles/variants";
import { useDeletePost, usePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetailPage,
});

function PostDetailPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const deletePost = useDeletePost();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        <div className={loadingSpinner({ className: "border-blue-600" })}></div>
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
    <article className={card({ className: "p-8" })}>
      <div className="mb-6">
        <Link
          to="/"
          className={link({ className: "text-sm text-gray-500 hover:text-gray-700" })}
        >
          ← 一覧に戻る
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span
              className={statusBadge({
                status: post.published ? "published" : "draft",
              })}
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
              className={button({ size: "sm" })}
            >
              編集
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className={button({ variant: "danger", size: "sm" })}
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

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <>
          {/* 背景のオーバーレイ */}
          <button
            type="button"
            className={modalOverlay()}
            onClick={() => setShowDeleteConfirm(false)}
          />

          {/* モーダル本体 */}
          <div className={modalContent()}>
            <div className={modalDialog()}>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <span className="text-red-600">⚠️</span>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    投稿を削除
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      この投稿を削除してもよろしいですか？この操作は取り消せません。
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deletePost.isPending}
                  className={button({
                    variant: "danger",
                    size: "sm",
                    className: `sm:ml-3 sm:w-auto ${deletePost.isPending ? "opacity-50" : ""}`
                  })}
                >
                  {deletePost.isPending ? "削除中..." : "削除"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deletePost.isPending}
                  className={button({
                    variant: "secondary",
                    size: "sm",
                    className: `mt-3 sm:mt-0 sm:w-auto ${deletePost.isPending ? "opacity-50" : ""}`
                  })}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
