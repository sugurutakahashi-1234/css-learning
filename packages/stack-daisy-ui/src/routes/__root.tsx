import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-base-200">
        {/* ヘッダー */}
        <div className="navbar bg-base-100 shadow-lg">
          <div className="navbar-start">
            <Link
              to="/"
              className="btn btn-ghost text-xl"
            >
              ブログ管理システム (DaisyUI)
            </Link>
          </div>
          <div className="navbar-end">
            <Link
              to="/posts/new"
              className="btn btn-primary"
            >
              新規投稿
            </Link>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="container mx-auto p-4 py-8">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});