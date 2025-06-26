import { useEffect, useId, useState } from "react";
import type { components } from "../generated/api";
import { button, checkbox, input, label, textarea } from "../styles/variants";
import { cn } from "../lib/utils";

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
  const titleId = useId();
  const contentId = useId();
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
      <div>
        <label htmlFor={titleId} className={cn(label(), "mb-2")}>
          タイトル
        </label>
        <input
          type="text"
          id={titleId}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className={input()}
          placeholder="記事のタイトルを入力"
        />
      </div>

      <div>
        <label htmlFor={contentId} className={cn(label(), "mb-2")}>
          本文
        </label>
        <textarea
          id={contentId}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
          rows={10}
          className={textarea()}
          placeholder="記事の内容を入力"
        />
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className={checkbox()}
          />
          <span className="ml-2 text-sm text-gray-700">公開する</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            button(),
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? "保存中..." : initialData ? "更新" : "作成"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
          className={cn(
            button({ variant: "secondary" }),
            isSubmitting && "opacity-50"
          )}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
