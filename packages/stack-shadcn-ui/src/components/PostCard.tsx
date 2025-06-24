import { Link } from "@tanstack/react-router";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { components } from "../generated/api";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps): React.ReactElement {
  return (
    <Link to="/posts/$postId" params={{ postId: post.id }}>
      <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="flex items-center justify-between">
            <Badge variant={post.published ? "default" : "secondary"}>
              {post.published ? "公開" : "下書き"}
            </Badge>
            <span className="flex items-center gap-1 text-xs">
              <CalendarIcon className="h-3 w-3" />
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {post.content}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
