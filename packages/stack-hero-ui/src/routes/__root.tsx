import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@heroui/react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useTheme } from "../components/ThemeProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* ヘッダー */}
        <Navbar
          isBordered
          maxWidth="xl"
          className="bg-gradient-to-r from-primary-50 via-secondary-50 to-primary-50 animate-gradient"
          classNames={{
            wrapper: "px-4 sm:px-6",
          }}
        >
          <NavbarBrand>
            <Link
              to="/"
              className="font-bold text-inherit text-xl hover:text-primary transition-colors"
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ブログ管理システム
              </span>
              <span className="text-default-600 text-sm ml-2">(HeroUI)</span>
            </Link>
          </NavbarBrand>
          <NavbarContent justify="end">
            <NavbarItem>
              <Switch
                isSelected={theme === "dark"}
                onValueChange={toggleTheme}
                size="sm"
                color="secondary"
                startContent={<span>☀️</span>}
                endContent={<span>🌙</span>}
              />
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/theme-test"
                color="secondary"
                variant="flat"
                className="hover:scale-105 transition-transform"
              >
                テーマテスト
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/posts/new"
                color="primary"
                variant="shadow"
                size="lg"
                className="font-medium animate-pulse-scale"
              >
                新規投稿
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>

        {/* メインコンテンツ */}
        <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
