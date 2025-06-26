import { Button, Card, CardBody, CardHeader, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from "@heroui/react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useDeletePost, usePost } from "../../../user-posts";

export const Route = createFileRoute("/posts/$postId/")({
  component: PostDetailPage,
});

function PostDetailPage() {
  const { postId } = Route.useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = usePost(postId);
  const deletePost = useDeletePost();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-danger-50">
        <CardBody>
          <p className="text-danger">投稿が見つかりません</p>
        </CardBody>
      </Card>
    );
  }

  const post = data.data;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-start gap-4">
          <Button
            as={Link}
            to="/"
            variant="light"
            size="sm"
            className="text-default-500"
          >
            ← 一覧に戻る
          </Button>
          
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <Chip
                  color={post.published ? "success" : "default"}
                  variant="flat"
                  size="sm"
                >
                  {post.published ? "公開" : "下書き"}
                </Chip>
                <span className="text-default-500">
                  作成日: {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                </span>
                <span className="text-default-500">
                  更新日: {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  as={Link}
                  to="/posts/$postId/edit"
                  params={{ postId } as any}
                  color="primary"
                  size="sm"
                >
                  編集
                </Button>
                <Button
                  onPress={onOpen}
                  color="danger"
                  size="sm"
                >
                  削除
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardBody>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-default-700">{post.content}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-divider">
              <h3 className="text-sm font-medium text-default-500 mb-2">タグ</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((postTag) => (
                  <Chip
                    key={postTag.tagId}
                    color="primary"
                    variant="flat"
                  >
                    {postTag.tag.name}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </CardBody>
      </Card>

      {/* 削除確認モーダル */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-danger">投稿を削除</span>
              </ModalHeader>
              <ModalBody>
                <p>この投稿を削除してもよろしいですか？この操作は取り消せません。</p>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="default" 
                  variant="light" 
                  onPress={onClose}
                  isDisabled={deletePost.isPending}
                >
                  キャンセル
                </Button>
                <Button 
                  color="danger" 
                  onPress={handleDelete}
                  isLoading={deletePost.isPending}
                  isDisabled={deletePost.isPending}
                >
                  削除
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}