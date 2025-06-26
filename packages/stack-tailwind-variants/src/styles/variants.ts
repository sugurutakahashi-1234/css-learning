import { tv } from "tailwind-variants";

// ボタンのバリアント
export const button = tv({
  base: "font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  variants: {
    variant: {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// フォーム入力のバリアント
export const input = tv({
  base: "w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
  variants: {
    hasError: {
      true: "border-red-500 focus:border-red-500 focus:ring-red-500",
    },
  },
});

// テキストエリアのバリアント
export const textarea = tv({
  base: "w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",
  variants: {
    hasError: {
      true: "border-red-500 focus:border-red-500 focus:ring-red-500",
    },
  },
});

// チェックボックスのバリアント
export const checkbox = tv({
  base: "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
});

// ラベルのバリアント
export const label = tv({
  base: "block text-sm font-medium text-gray-700",
});

// カードのバリアント
export const card = tv({
  base: "rounded-lg bg-white shadow-md overflow-hidden",
  variants: {
    hover: {
      true: "transition-shadow hover:shadow-lg",
    },
  },
});

// ステータスバッジのバリアント
export const statusBadge = tv({
  base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  variants: {
    status: {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
    },
  },
});

// コンテナのバリアント
export const container = tv({
  base: "mx-auto px-4",
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

// ヘッダーのバリアント
export const header = tv({
  base: "bg-white shadow-sm",
});

// ページタイトルのバリアント
export const pageTitle = tv({
  base: "text-3xl font-bold text-gray-900",
});

// エラーメッセージのバリアント
export const errorMessage = tv({
  base: "text-sm text-red-600 mt-1",
});

// ローディングスピナーのバリアント
export const loadingSpinner = tv({
  base: "inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]",
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// モーダルのバリアント
export const modal = tv({
  slots: {
    overlay: "fixed inset-0 bg-black bg-opacity-50 transition-opacity",
    content: "fixed inset-0 flex items-center justify-center p-4",
    dialog: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
  },
});

// リンクのバリアント
export const link = tv({
  base: "text-blue-600 hover:text-blue-800 underline transition-colors",
});
