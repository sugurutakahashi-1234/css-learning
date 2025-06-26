import { cva, type VariantProps } from "class-variance-authority";

// ボタンのバリアント
export const button = cva(
  "font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
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
  },
);

export type ButtonVariants = VariantProps<typeof button>;

// フォーム入力のバリアント
export const input = cva(
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
  {
    variants: {
      hasError: {
        true: "border-red-500 focus:border-red-500 focus:ring-red-500",
      },
    },
  },
);

export type InputVariants = VariantProps<typeof input>;

// テキストエリアのバリアント
export const textarea = cva(
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none",
  {
    variants: {
      hasError: {
        true: "border-red-500 focus:border-red-500 focus:ring-red-500",
      },
    },
  },
);

export type TextareaVariants = VariantProps<typeof textarea>;

// チェックボックスのバリアント
export const checkbox = cva(
  "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
);

// ラベルのバリアント
export const label = cva("block text-sm font-medium text-gray-700");

// カードのバリアント
export const card = cva("rounded-lg bg-white shadow-md overflow-hidden", {
  variants: {
    hover: {
      true: "transition-shadow hover:shadow-lg",
    },
  },
});

export type CardVariants = VariantProps<typeof card>;

// ステータスバッジのバリアント
export const statusBadge = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        published: "bg-green-100 text-green-800",
        draft: "bg-yellow-100 text-yellow-800",
      },
    },
  },
);

export type StatusBadgeVariants = VariantProps<typeof statusBadge>;

// コンテナのバリアント
export const container = cva("mx-auto px-4", {
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

export type ContainerVariants = VariantProps<typeof container>;

// ヘッダーのバリアント
export const header = cva("bg-white shadow-sm");

// ページタイトルのバリアント
export const pageTitle = cva("text-3xl font-bold text-gray-900");

// エラーメッセージのバリアント
export const errorMessage = cva("text-sm text-red-600 mt-1");

// ローディングスピナーのバリアント
export const loadingSpinner = cva(
  "inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]",
  {
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
  },
);

export type LoadingSpinnerVariants = VariantProps<typeof loadingSpinner>;

// モーダルのバリアント（複合バリアント）
export const modalOverlay = cva(
  "fixed inset-0 bg-black bg-opacity-50 transition-opacity",
);

export const modalContent = cva(
  "fixed inset-0 flex items-center justify-center p-4",
);

export const modalDialog = cva(
  "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
);

// リンクのバリアント
export const link = cva(
  "text-blue-600 hover:text-blue-800 underline transition-colors",
);
