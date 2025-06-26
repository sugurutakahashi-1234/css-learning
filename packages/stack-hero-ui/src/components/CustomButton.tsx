import { extendVariants, Button } from "@heroui/react";

export const CustomButton = extendVariants(Button, {
  variants: {
    // 新しいバリアントを追加
    variant: {
      bordered: "border-2 bg-transparent",
      ghost: "bg-transparent hover:bg-default-100",
      gradient: "bg-gradient-to-r text-white",
    },
    // 新しいカラーバリアントを追加
    color: {
      violet: "bg-violet-500 text-white hover:bg-violet-600",
      pink: "bg-pink-500 text-white hover:bg-pink-600",
    },
    // サイズバリアント
    size: {
      xs: "text-xs px-2 py-1",
      xl: "text-xl px-8 py-4",
    },
    // グラデーション用の複合バリアント
    gradient: {
      primary: "",
      secondary: "",
      success: "",
    },
  },
  // 複合バリアント（複数の条件を組み合わせ）
  compoundVariants: [
    {
      variant: "gradient",
      gradient: "primary",
      className: "from-blue-500 to-purple-500",
    },
    {
      variant: "gradient",
      gradient: "secondary",
      className: "from-purple-500 to-pink-500",
    },
    {
      variant: "gradient",
      gradient: "success",
      className: "from-green-500 to-teal-500",
    },
  ],
  // デフォルト値
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});