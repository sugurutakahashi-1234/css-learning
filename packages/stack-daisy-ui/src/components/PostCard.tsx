import { Link } from "@tanstack/react-router";
import type { components } from "../generated/api";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
      <Link
        to="/posts/$postId"
        params={{ postId: post.id }}
        className="card-body p-6"
      >
        <h2 className="text-xl font-semibold text-base-content mb-2 hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-base-content/60 line-clamp-3 mb-4">{post.content}</p>
        <div className="flex items-center justify-between text-sm">
          <span
            className={`badge badge-sm ${
              post.published ? "badge-success badge-outline" : "badge-ghost"
            }`}
          >
            {post.published ? "公開" : "下書き"}
          </span>
          <time dateTime={post.createdAt} className="text-base-content/50">
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </Link>
    </article>
  );
}
