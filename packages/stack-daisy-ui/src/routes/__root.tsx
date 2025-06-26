import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-base-200">
        {/* ヘッダー */}
        <header className="navbar bg-base-300 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex-1">
              <Link
                to="/"
                className="text-xl font-semibold hover:text-primary transition-colors"
              >
                ブログ管理システム (DaisyUI)
              </Link>
            </div>
            <div className="flex-none">
              <Link to="/posts/new" className="btn btn-sm btn-neutral">
                新規投稿
              </Link>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
