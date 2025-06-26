import { tv } from "tailwind-variants";

// ローディングインジケーター用のバリアント
export const loadingVariants = tv({
  slots: {
    container: "flex justify-center py-8",
    spinner:
      "animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent",
  },
});

// エラー表示用のバリアント
export const errorVariants = tv({
  base: "rounded-md bg-red-50 p-4",
  slots: {
    text: "text-sm text-red-800",
  },
});

// ページコンテナ用のバリアント
export const pageContainerVariants = tv({
  base: "bg-white rounded-lg shadow-sm p-8",
});

// ページタイトル用のバリアント
export const pageTitleVariants = tv({
  base: "text-2xl font-bold text-gray-900 mb-6",
});

// 一覧ページ用のバリアント
export const homePageVariants = tv({
  slots: {
    title: "text-2xl font-bold text-gray-900 mb-6",
    grid: "grid gap-4 md:grid-cols-2",
    emptyState: "text-center py-12",
    emptyText: "text-gray-500",
    createButton:
      "mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors",
  },
});

// 詳細ページ用のバリアント
export const detailPageVariants = tv({
  slots: {
    backLink: "text-sm text-gray-500 hover:text-gray-700 transition-colors",
    articleTitle: "text-3xl font-bold text-gray-900 mb-4",
    metaContainer: "flex items-center justify-between",
    metaInfo: "flex items-center gap-4 text-sm text-gray-500",
    statusBadge:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    actionButtons: "flex gap-2",
    editButton:
      "rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors",
    deleteButton:
      "rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors",
    content: "prose prose-lg max-w-none",
    contentText: "whitespace-pre-wrap text-gray-700",
    tagsSection: "mt-8 pt-8 border-t border-gray-200",
    tagsTitle: "text-sm font-medium text-gray-500 mb-2",
    tagsContainer: "flex flex-wrap gap-2",
    tag: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800",
  },
  variants: {
    published: {
      true: {
        statusBadge: "bg-green-100 text-green-800",
      },
      false: {
        statusBadge: "bg-gray-100 text-gray-800",
      },
    },
  },
});

// 削除確認モーダル用のバリアント
export const deleteModalVariants = tv({
  slots: {
    overlay:
      "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40",
    modalContainer: "fixed inset-0 z-50 overflow-y-auto",
    modalWrapper:
      "flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",
    modalContent:
      "relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6",
    modalBody: "sm:flex sm:items-start",
    iconWrapper:
      "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",
    icon: "text-red-600",
    textWrapper: "mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",
    modalTitle: "text-lg font-medium leading-6 text-gray-900",
    modalDescription: "mt-2",
    modalDescriptionText: "text-sm text-gray-500",
    buttonContainer: "mt-5 sm:mt-4 sm:flex sm:flex-row-reverse",
    deleteButtonModal:
      "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:opacity-50",
    cancelButton:
      "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto disabled:opacity-50",
  },
});
