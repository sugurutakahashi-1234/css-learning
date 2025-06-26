import { Button, Checkbox, Input, Textarea } from "@heroui/react";
import { useEffect, useId, useState } from "react";
import type { components } from "../generated/api";

interface PostFormProps {
  initialData?: components["schemas"]["Post"];
  onSubmit: (data: components["schemas"]["CreatePost"]) => Promise<void>;
  isSubmitting: boolean;
}

export function PostForm({
  initialData,
  onSubmit,
  isSubmitting,
}: PostFormProps) {
  const publishedId = useId();
  const [formData, setFormData] = useState<components["schemas"]["CreatePost"]>(
    {
      title: "",
      content: "",
      userId: "clh1234567890abcdef", // 仮のユーザーID
      published: false,
    },
  );

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        content: initialData.content,
        userId: initialData.userId,
        published: initialData.published,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="タイトル"
        placeholder="記事のタイトルを入力"
        value={formData.title}
        onValueChange={(value) => setFormData({ ...formData, title: value })}
        isRequired
        variant="faded"
        size="lg"
        labelPlacement="outside"
        classNames={{
          label: "text-default-700 font-medium",
          input: "font-medium",
        }}
      />

      <Textarea
        label="本文"
        placeholder="記事の内容を入力"
        value={formData.content}
        onValueChange={(value) => setFormData({ ...formData, content: value })}
        isRequired
        variant="faded"
        minRows={10}
        labelPlacement="outside"
        classNames={{
          label: "text-default-700 font-medium",
          input: "font-medium",
        }}
      />

      <Checkbox
        id={publishedId}
        isSelected={formData.published}
        onValueChange={(isSelected) =>
          setFormData({ ...formData, published: isSelected })
        }
      >
        公開する
      </Checkbox>

      <div className="flex gap-4">
        <Button
          type="submit"
          color="primary"
          variant="shadow"
          size="lg"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          {initialData ? "更新" : "作成"}
        </Button>
        <Button
          type="button"
          variant="light"
          size="lg"
          onPress={() => window.history.back()}
          isDisabled={isSubmitting}
        >
          キャンセル
        </Button>
      </div>
    </form>
  );
}