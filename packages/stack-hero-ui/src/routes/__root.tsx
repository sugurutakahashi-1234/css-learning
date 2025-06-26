import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-background">
        {/* ヘッダー */}
        <Navbar isBordered maxWidth="xl" className="bg-gradient-to-r from-primary-50 to-secondary-50">
          <NavbarBrand>
            <Link to="/" className="font-bold text-inherit text-xl">
              ブログ管理システム (HeroUI)
            </Link>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button as={Link} to="/theme-test" color="secondary" variant="flat">
                テーマテスト
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} to="/posts/new" color="primary" variant="shadow" size="lg">
                新規投稿
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* メインコンテンツ */}
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});