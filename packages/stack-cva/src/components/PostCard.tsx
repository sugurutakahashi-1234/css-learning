import { Link } from "@tanstack/react-router";
import type { components } from "../generated/api";
import { card, statusBadge } from "../styles/variants";
import { cn } from "../lib/utils";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className={cn(card({ hover: true }), "p-6")}>
      <Link to="/posts/$postId" params={{ postId: post.id }} className="block">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span
            className={statusBadge({
              status: post.published ? "published" : "draft",
            })}
          >
            {post.published ? "公開" : "下書き"}
          </span>
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </Link>
    </article>
  );
}
