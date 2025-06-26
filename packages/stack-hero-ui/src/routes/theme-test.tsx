import { Button, Card, Chip, Input, Textarea } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { CustomButton } from "../components/CustomButton";

export const Route = createFileRoute("/theme-test")({
  component: ThemeTestPage,
});

function ThemeTestPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">HeroUI テーマ設定テスト</h1>

      {/* 角丸のテスト */}
      <section>
        <h2 className="text-xl font-semibold mb-4">角丸設定（radius）</h2>
        <div className="flex gap-4">
          <Card radius="sm" className="p-4">
            <p>Small radius (8px)</p>
            <p className="text-xs">実際: rounded-small</p>
          </Card>
          <Card radius="md" className="p-4">
            <p>Medium radius (12px)</p>
            <p className="text-xs">実際: rounded-medium</p>
          </Card>
          <Card radius="lg" className="p-4">
            <p>Large radius (14px)</p>
            <p className="text-xs">実際: rounded-large</p>
          </Card>
        </div>
        <div className="mt-4 p-4 bg-default-100 rounded">
          <p className="text-sm">手動テスト:</p>
          <div className="flex gap-4 mt-2">
            <div className="w-20 h-20 bg-primary rounded-small"></div>
            <div className="w-20 h-20 bg-primary rounded-medium"></div>
            <div className="w-20 h-20 bg-primary rounded-large"></div>
          </div>
        </div>
      </section>

      {/* 影のテスト */}
      <section>
        <h2 className="text-xl font-semibold mb-4">影設定（boxShadow）</h2>
        <div className="flex gap-4">
          <Card shadow="sm" className="p-4">
            <p>Small shadow</p>
          </Card>
          <Card shadow="md" className="p-4">
            <p>Medium shadow</p>
          </Card>
          <Card shadow="lg" className="p-4">
            <p>Large shadow</p>
          </Card>
        </div>
      </section>

      {/* カラーテーマのテスト */}
      <section>
        <h2 className="text-xl font-semibold mb-4">カラーテーマ</h2>
        <div className="flex gap-4 flex-wrap">
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="warning">Warning</Button>
          <Button color="danger">Danger</Button>
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          <Chip color="primary">Primary</Chip>
          <Chip color="secondary">Secondary</Chip>
          <Chip color="success">Success</Chip>
          <Chip color="warning">Warning</Chip>
          <Chip color="danger">Danger</Chip>
        </div>
        <div className="mt-4 p-4 bg-default-100 rounded">
          <p className="text-sm mb-2">CSS変数の値:</p>
          <div className="text-xs space-y-1">
            <p>--heroui-primary: <span className="text-primary">確認中</span></p>
            <p>--heroui-secondary: <span className="text-secondary">確認中</span></p>
            <p>--heroui-radius-small: 確認中</p>
          </div>
        </div>
      </section>

      {/* フォントサイズのテスト */}
      <section>
        <h2 className="text-xl font-semibold mb-4">フォントサイズ設定</h2>
        <div className="space-y-2">
          <Button size="sm">Small (0.875rem)</Button>
          <Button size="md">Medium (1rem)</Button>
          <Button size="lg">Large (1.125rem)</Button>
        </div>
      </section>

      {/* ボーダー幅のテスト */}
      <section>
        <h2 className="text-xl font-semibold mb-4">ボーダー幅設定</h2>
        <div className="space-y-4">
          <Input variant="bordered" placeholder="ボーダー入力フィールド" />
          <Textarea variant="bordered" placeholder="ボーダーテキストエリア" />
        </div>
      </section>

      {/* Primary色のグラデーション */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Primary色のグラデーション
        </h2>
        <div className="flex gap-2">
          <div className="w-16 h-16 bg-primary-50 rounded"></div>
          <div className="w-16 h-16 bg-primary-100 rounded"></div>
          <div className="w-16 h-16 bg-primary-200 rounded"></div>
          <div className="w-16 h-16 bg-primary-300 rounded"></div>
          <div className="w-16 h-16 bg-primary-400 rounded"></div>
          <div className="w-16 h-16 bg-primary-500 rounded"></div>
          <div className="w-16 h-16 bg-primary-600 rounded"></div>
          <div className="w-16 h-16 bg-primary-700 rounded"></div>
          <div className="w-16 h-16 bg-primary-800 rounded"></div>
          <div className="w-16 h-16 bg-primary-900 rounded"></div>
        </div>
      </section>
    </div>
  );
}
