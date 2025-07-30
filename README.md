
## 🧪 このリポジトリについて

このプロジェクトは、同一のブログアプリケーション（投稿の一覧表示、詳細表示、編集、新規作成機能）を7つの異なるCSSライブラリ/アプローチで実装し、それぞれの特徴を実践的に比較検証しています。

### リポジトリの構成

各パッケージは同一のブログアプリケーションUIを実装しており、以下の機能を持っています：
- 📝 投稿一覧の表示
- 📖 投稿詳細の閲覧
- ✏️ 投稿の編集
- ➕ 新規投稿の作成

## 📦 パッケージ一覧と特徴

### 1. **stack-basic** (基本実装)
- **特徴**: 純粋なTailwind CSSクラスを直接使用
- **実装方式**: インラインでTailwindクラスを記述
- **利点**: シンプル、追加の依存関係なし
- **欠点**: クラス名が長くなりがち、再利用性が低い

```tsx
// 例：PostCardでの実装
className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
  post.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
}`}
```

### 2. **stack-cva** (Class Variance Authority)
- **特徴**: バリアント管理ライブラリを使用したタイプセーフなスタイリング
- **実装方式**: `cva`関数でバリアントを定義し、コンポーネントで使用
- **利点**: タイプセーフ、バリアントの管理が容易、再利用性が高い
- **欠点**: 追加の依存関係

```tsx
// variants.tsで定義
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

// コンポーネントで使用
className={statusBadge({ status: post.published ? "published" : "draft" })}
```

### 3. **stack-daisy-ui** (DaisyUI)
- **特徴**: Tailwind CSS上に構築されたコンポーネントクラスライブラリ
- **実装方式**: 事前定義されたコンポーネントクラス（`card`、`badge`等）を使用
- **利点**: すぐに使えるコンポーネント、テーマシステム内蔵
- **欠点**: カスタマイズに制限がある場合も

```tsx
// DaisyUIのクラスを使用
className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
className={`badge badge-sm ${
  post.published ? "badge-success badge-outline" : "badge-ghost"
}`}
```

### 4. **stack-headless-ui** (Headless UI)
- **特徴**: アクセシビリティを重視したUIコンポーネント（主にインタラクティブ要素）
- **実装方式**: 基本的なスタイリングはTailwindで、複雑なUIパターンはHeadless UIコンポーネント
- **利点**: アクセシビリティが保証される、Tailwindと完全互換
- **欠点**: スタイリング付きコンポーネントではない（自分でスタイルを定義）

### 5. **stack-hero-ui** (HeroUI)
- **特徴**: Next UI v3のベータ版、フルフィーチャーのコンポーネントライブラリ
- **実装方式**: 専用のReactコンポーネント（`Card`、`Chip`等）を使用
- **利点**: 豊富なコンポーネント、アニメーション内蔵、テーマシステム
- **欠点**: 学習コスト、バンドルサイズが大きい

```tsx
// HeroUIコンポーネントを使用
<Card isPressable isHoverable className="w-full shadow-md hover:shadow-xl">
  <CardHeader>...</CardHeader>
  <CardBody>...</CardBody>
  <CardFooter>
    <Chip color={post.published ? "success" : "warning"} variant="dot">
      {post.published ? "公開" : "下書き"}
    </Chip>
  </CardFooter>
</Card>
```

### 6. **stack-shadcn-ui** (shadcn/ui)
- **特徴**: コピー&ペースト型のコンポーネントライブラリ、Radix UIベース
- **実装方式**: コンポーネントをソースコードとして含め、カスタマイズ可能
- **利点**: 完全にカスタマイズ可能、高機能（削除確認ダイアログ等）、アクセシビリティ対応
- **欠点**: 初期セットアップが必要

```tsx
// shadcn/uiコンポーネントを使用（最も高機能な実装）
<Card className="h-full transition-all hover:shadow-lg">
  <CardHeader>
    <CardTitle>{post.title}</CardTitle>
    <Badge variant={post.published ? "default" : "secondary"}>
      {post.published ? "公開" : "下書き"}
    </Badge>
  </CardHeader>
  <CardContent>...</CardContent>
</Card>

// 削除確認ダイアログも実装
<AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
  ...
</AlertDialog>
```

### 7. **stack-tailwind-variants** (Tailwind Variants)
- **特徴**: Tailwind CSS用のバリアント管理ライブラリ、CVAの代替
- **実装方式**: `tv`関数でバリアントを定義、slotsサポートで複合コンポーネントも可能
- **利点**: CVAと同様の利点＋より高度な機能（slots、複合バリアント）
- **欠点**: 追加の依存関係

```tsx
// tailwind-variantsで定義（slotsサポート）
export const modal = tv({
  slots: {
    overlay: "fixed inset-0 bg-black bg-opacity-50",
    content: "fixed inset-0 flex items-center justify-center p-4",
    dialog: "bg-white rounded-lg shadow-xl max-w-md w-full p-6",
  },
});
```

## 🔍 比較のポイント

1. **開発効率**: DaisyUI、HeroUI、shadcn/uiは事前定義コンポーネントで高速開発可能
2. **カスタマイズ性**: basic、CVA、Tailwind Variantsは完全な制御が可能
3. **タイプセーフティ**: CVA、Tailwind Variants、shadcn/uiはTypeScriptサポートが優秀
4. **バンドルサイズ**: basicが最小、HeroUIが最大
5. **機能の豊富さ**: shadcn/uiが最も高機能（削除確認、トースト通知等）
6. **学習コスト**: basicが最低、HeroUIが最高

### 動作確認方法

```bash
# 依存関係のインストール
pnpm install

# コード生成（型定義など）
pnpm run generate

# モックAPIサーバーの起動
pnpm run mock

# 開発サーバーの起動（全パッケージ同時）
pnpm run dev
```

起動後、以下のURLで各実装にアクセスできます：
- stack-basic: http://localhost:5150
- stack-cva: http://localhost:5151
- stack-daisy-ui: http://localhost:5152
- stack-headless-ui: http://localhost:5153
- stack-hero-ui: http://localhost:5154
- stack-shadcn-ui: http://localhost:5160
- stack-tailwind-variants: http://localhost:5161

### 技術スタック

- **フレームワーク**: React 19
- **ビルドツール**: Vite
- **言語**: TypeScript（厳格な型チェック設定）
- **スタイリング**: Tailwind CSS v4
- **データフェッチ**: TanStack Query + openapi-typescript
- **モックサーバー**: Prism
