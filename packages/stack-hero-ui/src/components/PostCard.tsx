import { Card, CardBody, CardFooter, CardHeader, Chip } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import type { components } from "../generated/api";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to="/posts/$postId" params={{ postId: post.id }} className="block">
      <Card isPressable isHoverable className="w-full">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-semibold">{post.title}</p>
          </div>
        </CardHeader>
        <CardBody>
          <p className="text-default-500 line-clamp-3">{post.content}</p>
        </CardBody>
        <CardFooter className="justify-between">
          <Chip
            color={post.published ? "success" : "default"}
            variant="flat"
            size="sm"
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
