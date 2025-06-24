import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useDeletePost, usePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetailPage,
});

function PostDetailPage(): React.ReactElement {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const deletePost = useDeletePost();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async (): Promise<void> => {
    try {
      await deletePost.mutateAsync({ params: { path: { id: postId } } });
      navigate({ to: "/" });
    } catch (error) {
      console.error("削除エラー:", error);
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

  const post = data.data;

  return (
    <>
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            一覧に戻る
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              {post.title}
            </h1>
            <div className="flex gap-2">
              <Button size="sm" asChild>
                <Link to="/posts/$postId/edit" params={{ postId }}>
                  <EditIcon className="mr-2 h-4 w-4" />
                  編集
                </Link>
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                削除
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Badge variant={post.published ? "default" : "secondary"}>
              {post.published ? "公開" : "下書き"}
            </Badge>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              更新日: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-3">
                タグ
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((postTag) => (
                  <Badge key={postTag.tagId} variant="secondary">
                    {postTag.tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 削除確認ダイアログ */}
      {showDeleteConfirm && (
        <>
          <button
            type="button"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40"
            onClick={() => setShowDeleteConfirm(false)}
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Card className="relative w-full max-w-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                      <AlertTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">投稿を削除</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        この投稿を削除してもよろしいですか？この操作は取り消せません。
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={deletePost.isPending}
                    >
                      キャンセル
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deletePost.isPending}
                    >
                      {deletePost.isPending ? "削除中..." : "削除"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
