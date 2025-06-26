import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
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
  const deleteModalId = useId();

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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="エラー"
        >
          <title>エラー</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>投稿が見つかりません</span>
      </div>
    );
  }

  const post = data.data;

  return (
    <article className="card bg-base-100 shadow-sm p-8">
      <div className="mb-6">
        <Link to="/" className="link link-hover text-sm text-base-content/60">
          ← 一覧に戻る
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span
              className={`badge badge-sm ${
                post.published ? "badge-success badge-outline" : "badge-ghost"
              }`}
            >
              {post.published ? "公開" : "下書き"}
            </span>
            <time dateTime={post.createdAt} className="text-base-content/50">
              作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </time>
            <time dateTime={post.updatedAt} className="text-base-content/50">
              更新日: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
            </time>
          </div>
          <div className="flex gap-2">
            <Link
              to="/posts/$postId/edit"
              params={{ postId }}
              className="btn btn-primary btn-sm"
            >
              編集
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="btn btn-error btn-sm"
            >
              削除
            </button>
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <p className="whitespace-pre-wrap text-base-content/70">
          {post.content}
        </p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 pt-8 border-t border-base-200">
          <h3 className="text-sm font-medium mb-2 text-base-content/50">
            タグ
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((postTag) => (
              <span
                key={postTag.tagId}
                className="badge badge-primary badge-outline"
              >
                {postTag.tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 削除確認モーダル */}
      <input
        type="checkbox"
        id={deleteModalId}
        className="modal-toggle"
        checked={showDeleteConfirm}
        onChange={() => {}}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="警告"
            >
              <title>警告</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            投稿を削除
          </h3>
          <p className="py-4">
            この投稿を削除してもよろしいですか？この操作は取り消せません。
          </p>
          <div className="modal-action">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="btn btn-error btn-sm"
            >
              {deletePost.isPending && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              {deletePost.isPending ? "削除中..." : "削除"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deletePost.isPending}
              className="btn btn-sm"
            >
              キャンセル
            </button>
          </div>
        </div>
        <button
          type="button"
          className="modal-backdrop"
          onClick={() => setShowDeleteConfirm(false)}
        >
          Close
        </button>
      </div>
    </article>
  );
}
