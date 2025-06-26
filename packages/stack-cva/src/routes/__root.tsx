import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { cn } from "../lib/utils";
import { button, container, header } from "../styles/variants";

const RootComponent = () => (
  <>
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className={cn(header(), "bg-gray-800")}>
        <div className={cn(container({ size: "sm" }), "sm:px-6 lg:px-8")}>
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="text-xl font-semibold text-white hover:text-gray-300 transition-colors"
            >
              ブログ管理システム (CVA)
            </Link>
            <nav>
              <Link
                to="/posts/new"
                className={cn(
                  button({ variant: "secondary", size: "sm" }),
                  "bg-gray-100 text-gray-800 hover:bg-gray-200",
                )}
              >
                新規投稿
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className={cn(container({ size: "sm" }), "sm:px-6 lg:px-8 py-8")}>
        <Outlet />
      </main>
    </div>
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootComponent,
});
