import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Chip,
  Divider,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tab,
  Tabs,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/theme-test")({
  component: ThemeTestPage,
});

function ThemeTestPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState<string[]>(["1"]);
  const [radioValue, setRadioValue] = useState("1");
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedTab, setSelectedTab] = useState("photos");

  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ] as const;
  const sizes = ["sm", "md", "lg"] as const;
  const variants = [
    "solid",
    "bordered",
    "light",
    "flat",
    "faded",
    "shadow",
    "ghost",
  ] as const;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          HeroUI コンポーネントショーケース
        </h1>
        <p className="text-default-600">
          HeroUIの全コンポーネントとテーマのテストページです
        </p>
      </div>

      {/* ボタン */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">ボタン</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            {variants.map((variant) => (
              <Button key={variant} variant={variant} color="primary">
                {variant}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {colors.map((color) => (
              <Button key={color} color={color}>
                {color}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {sizes.map((size) => (
              <Button key={size} size={size} color="primary">
                サイズ {size}
              </Button>
            ))}
          </div>
          <ButtonGroup>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </div>
      </section>

      <Divider />

      {/* 入力フィールド */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">入力フィールド</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="デフォルト" placeholder="テキストを入力" />
          <Input label="必須項目" placeholder="必須です" isRequired />
          <Input label="無効" placeholder="無効です" isDisabled />
          <Input label="読み取り専用" value="読み取り専用" isReadOnly />
          <Input
            label="バリデーション"
            placeholder="メールアドレス"
            type="email"
            errorMessage="有効なメールアドレスを入力してください"
          />
          <Select label="選択フィールド" placeholder="オプションを選択">
            <SelectItem key="1">オプション 1</SelectItem>
            <SelectItem key="2">オプション 2</SelectItem>
            <SelectItem key="3">オプション 3</SelectItem>
          </Select>
        </div>
        <div className="mt-4">
          <Textarea
            label="テキストエリア"
            placeholder="複数行のテキストを入力"
            minRows={3}
          />
        </div>
      </section>

      <Divider />

      {/* カード */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">カード</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">デフォルト</p>
              <small className="text-default-500">12 トラック</small>
              <h4 className="font-bold text-large">フロントエンド開発</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-default-600">
                モダンなウェブアプリケーション開発の基礎を学びます
              </p>
            </CardBody>
          </Card>

          <Card isHoverable isPressable>
            <CardHeader>
              <h4 className="font-bold text-large">インタラクティブカード</h4>
            </CardHeader>
            <CardBody>
              <p>ホバーとクリックが可能です</p>
            </CardBody>
            <CardFooter>
              <Button color="primary" size="sm">
                詳細を見る
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-primary-100 to-secondary-100">
            <CardHeader>
              <h4 className="font-bold text-large">グラデーションカード</h4>
            </CardHeader>
            <CardBody>
              <p>カスタムスタイルを適用できます</p>
            </CardBody>
          </Card>
        </div>
      </section>

      <Divider />

      {/* チップとバッジ */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">チップとバッジ</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Chip key={color} color={color}>
                {color}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip variant="solid">Solid</Chip>
            <Chip variant="bordered">Bordered</Chip>
            <Chip variant="light">Light</Chip>
            <Chip variant="flat">Flat</Chip>
            <Chip variant="faded">Faded</Chip>
            <Chip variant="shadow">Shadow</Chip>
            <Chip variant="dot">Dot</Chip>
          </div>
          <div className="flex flex-wrap gap-4">
            {colors.map((color) => (
              <Badge key={color} content="新着" color={color}>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* スイッチとチェックボックス */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">選択コントロール</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="font-medium">スイッチ</h3>
            <Switch isSelected={switchValue} onValueChange={setSwitchValue}>
              通知を有効にする
            </Switch>
            <Switch
              isSelected={switchValue}
              onValueChange={setSwitchValue}
              size="sm"
            >
              小サイズ
            </Switch>
            <Switch
              isSelected={switchValue}
              onValueChange={setSwitchValue}
              size="lg"
            >
              大サイズ
            </Switch>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">チェックボックス</h3>
            <CheckboxGroup
              value={checkboxValues}
              onValueChange={setCheckboxValues}
            >
              <Checkbox value="1">オプション 1</Checkbox>
              <Checkbox value="2">オプション 2</Checkbox>
              <Checkbox value="3">オプション 3</Checkbox>
            </CheckboxGroup>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">ラジオボタン</h3>
            <RadioGroup value={radioValue} onValueChange={setRadioValue}>
              <Radio value="1">オプション 1</Radio>
              <Radio value="2">オプション 2</Radio>
              <Radio value="3">オプション 3</Radio>
            </RadioGroup>
          </div>
        </div>
      </section>

      <Divider />

      {/* プログレスとスピナー */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">進行状況</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <Progress value={70} className="max-w-md" />
            <Progress value={50} color="success" className="max-w-md" />
            <Progress value={30} color="warning" className="max-w-md" />
            <Progress isIndeterminate color="primary" className="max-w-md" />
          </div>
          <div className="flex gap-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner color="primary" />
            <Spinner color="secondary" />
            <Spinner color="success" />
          </div>
        </div>
      </section>

      <Divider />

      {/* タブ */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">タブ</h2>
        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
        >
          <Tab key="photos" title="写真">
            <Card>
              <CardBody>写真コンテンツがここに表示されます</CardBody>
            </Card>
          </Tab>
          <Tab key="music" title="音楽">
            <Card>
              <CardBody>音楽コンテンツがここに表示されます</CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="動画">
            <Card>
              <CardBody>動画コンテンツがここに表示されます</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </section>

      <Divider />

      {/* その他のコンポーネント */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">その他</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">アバター</h3>
            <div className="flex gap-4 items-center">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar name="田中 太郎" />
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                size="sm"
              />
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                size="lg"
              />
              <AvatarGroup>
                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
              </AvatarGroup>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">スライダー</h3>
            <Slider
              label="音量"
              value={sliderValue}
              onChange={(value) => setSliderValue(value as number)}
              className="max-w-md"
            />
          </div>

          <div>
            <h3 className="font-medium mb-4">スケルトン</h3>
            <Card className="w-[300px]">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <Skeleton className="rounded-full w-12 h-12" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-[150px] rounded-lg" />
                    <Skeleton className="h-3 w-[100px] rounded-lg" />
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-3 py-0">
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-default-300"></div>
                </Skeleton>
              </CardBody>
            </Card>
          </div>

          <div>
            <h3 className="font-medium mb-4">ツールチップ</h3>
            <div className="flex gap-4">
              <Tooltip content="デフォルトのツールチップ">
                <Button variant="bordered">ホバーしてください</Button>
              </Tooltip>
              <Tooltip content="色付きツールチップ" color="primary">
                <Button color="primary">Primary</Button>
              </Tooltip>
              <Tooltip content="遅延表示" delay={1000}>
                <Button variant="flat">遅延あり</Button>
              </Tooltip>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">リンク</h3>
            <div className="flex gap-4">
              <Link href="#">デフォルトリンク</Link>
              <Link href="#" color="primary">
                プライマリーリンク
              </Link>
              <Link href="#" isExternal>
                外部リンク
              </Link>
              <Link href="#" isDisabled>
                無効なリンク
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">モーダル</h3>
            <Button onPress={onOpen} color="primary">
              モーダルを開く
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      モーダルタイトル
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        これはモーダルのコンテンツです。ここに任意のコンテンツを配置できます。
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        閉じる
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        アクション
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
}
