import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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

  const post = data.data;

  return (
    <article className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="mb-6">
          <Link
            to="/"
            className="link link-hover text-base-content/60"
          >
            ← 一覧に戻る
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="card-title text-3xl mb-4">{post.title}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className={`badge ${post.published ? "badge-success" : "badge-ghost"}`}>
                {post.published ? "公開" : "下書き"}
              </div>
              <time dateTime={post.createdAt} className="text-base-content/60">
                作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
              </time>
              <time dateTime={post.updatedAt} className="text-base-content/60">
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

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-base-300">
            <h3 className="text-sm font-medium mb-2">タグ</h3>
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
      </div>

      {/* 削除確認モーダル */}
      <dialog className={`modal ${showDeleteConfirm ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">投稿を削除</h3>
          <p className="py-4">
            この投稿を削除してもよろしいですか？この操作は取り消せません。
          </p>
          <div className="modal-action">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deletePost.isPending}
              className="btn btn-error"
            >
              {deletePost.isPending && <span className="loading loading-spinner"></span>}
              {deletePost.isPending ? "削除中..." : "削除"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={deletePost.isPending}
              className="btn"
            >
              キャンセル
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={() => setShowDeleteConfirm(false)}>close</button>
        </form>
      </dialog>
    </article>
  );
}