import { useState } from 'react'
import { Button, Card, Container, TextField, Select, Switch, Badge, Alert, Progress, Tag, Divider } from '@repo/hero-ui'
import { AppLayout } from '../components/app-layout'

export function ThemeTestPage() {
  const [switchValue, setSwitchValue] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [selectValue, setSelectValue] = useState('option1')
  const [progress, setProgress] = useState(30)

  return (
    <AppLayout>
      <Container>
        <div className="py-8 space-y-8">
          {/* ヘッダー */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              HeroUI コンポーネントギャラリー
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              すべてのUIコンポーネントのショーケース
            </p>
          </div>

          <Divider />

          {/* ボタン */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">ボタン</h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">プライマリ</Button>
                <Button variant="secondary">セカンダリ</Button>
                <Button variant="success">成功</Button>
                <Button variant="danger">危険</Button>
                <Button variant="warning">警告</Button>
                <Button variant="info">情報</Button>
                <Button variant="primary" disabled>無効</Button>
              </div>
            </div>
          </Card>

          {/* フォーム要素 */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">フォーム要素</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">テキストフィールド</label>
                  <TextField
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="テキストを入力..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">セレクト</label>
                  <Select
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="option1">オプション 1</option>
                    <option value="option2">オプション 2</option>
                    <option value="option3">オプション 3</option>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">スイッチ</label>
                  <Switch
                    checked={switchValue}
                    onChange={setSwitchValue}
                  />
                  <span className="text-sm text-gray-500">
                    {switchValue ? 'オン' : 'オフ'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* バッジとタグ */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">バッジとタグ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">バッジ</h3>
                  <div className="flex gap-2">
                    <Badge variant="primary">新着</Badge>
                    <Badge variant="success">完了</Badge>
                    <Badge variant="warning">保留中</Badge>
                    <Badge variant="danger">エラー</Badge>
                    <Badge variant="info">12</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">タグ</h3>
                  <div className="flex gap-2">
                    <Tag variant="primary">React</Tag>
                    <Tag variant="secondary">TypeScript</Tag>
                    <Tag variant="success">完了</Tag>
                    <Tag variant="info">v1.0.0</Tag>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* アラート */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">アラート</h2>
              <div className="space-y-3">
                <Alert variant="info">これは情報メッセージです。</Alert>
                <Alert variant="success">操作が正常に完了しました！</Alert>
                <Alert variant="warning">注意が必要な状況です。</Alert>
                <Alert variant="danger">エラーが発生しました。</Alert>
              </div>
            </div>
          </Card>

          {/* プログレスバー */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">プログレスバー</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">進捗状況</span>
                    <span className="text-sm text-gray-500">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* カラーパレット */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">カラーパレット</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Primary', class: 'bg-primary-500' },
                  { name: 'Secondary', class: 'bg-gray-500' },
                  { name: 'Success', class: 'bg-green-500' },
                  { name: 'Danger', class: 'bg-red-500' },
                  { name: 'Warning', class: 'bg-yellow-500' },
                  { name: 'Info', class: 'bg-blue-500' },
                  { name: 'Light', class: 'bg-gray-100' },
                  { name: 'Dark', class: 'bg-gray-900' },
                ].map((color) => (
                  <div key={color.name} className="text-center">
                    <div className={`h-20 rounded-lg ${color.class}`} />
                    <p className="mt-2 text-sm font-medium">{color.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* スペーシング */}
          <Card>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">スペーシング</h2>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((space) => (
                  <div key={space} className="flex items-center gap-4">
                    <span className="text-sm font-mono w-16">p-{space}</span>
                    <div className={`bg-primary-100 p-${space} rounded`}>
                      <div className="bg-primary-500 h-4 w-4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </AppLayout>
  )
}