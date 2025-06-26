import { Link } from "@tanstack/react-router";
import type { components } from "../generated/api";

interface PostCardProps {
  post: components["schemas"]["Post"];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <Link to="/posts/$postId" params={{ postId: post.id }} className="card-body">
        <h2 className="card-title text-base-content hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-base-content/70 line-clamp-3">{post.content}</p>
        <div className="card-actions justify-between items-center">
          <div className={`badge ${post.published ? "badge-success" : "badge-ghost"}`}>
            {post.published ? "公開" : "下書き"}
          </div>
          <time dateTime={post.createdAt} className="text-sm text-base-content/60">
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </time>
        </div>
      </Link>
    </article>
  );
}
