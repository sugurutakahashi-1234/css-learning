import { Card, CardBody, CardFooter, CardHeader, Chip } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import type { components } from "../generated/api";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to="/posts/$postId" params={{ postId: post.id }} className="block">
      <Card
        isPressable
        isHoverable
        className="w-full shadow-md hover:shadow-xl transition-shadow"
      >
        <CardHeader className="pb-0">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{post.title}</p>
          </div>
        </CardHeader>
        <CardBody className="py-2">
          <p className="text-default-600 line-clamp-3">{post.content}</p>
        </CardBody>
        <CardFooter className="justify-between pt-2">
          <Chip
            color={post.published ? "success" : "warning"}
            variant="dot"
            size="sm"
            className="font-medium"
          >
            {post.published ? "公開" : "下書き"}
          </Chip>
          <p className="text-default-400 text-small">
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
