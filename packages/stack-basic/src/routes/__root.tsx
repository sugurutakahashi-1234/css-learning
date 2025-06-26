import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-gray-800 shadow-sm">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link
                to="/"
                className="text-xl font-semibold text-white hover:text-gray-300 transition-colors"
              >
                ブログ管理システム (Basic Tailwind)
              </Link>
              <nav>
                <Link
                  to="/posts/new"
                  className="rounded-md bg-gray-100 text-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  新規投稿
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
