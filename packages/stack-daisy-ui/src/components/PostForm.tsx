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
  const titleId = useId();
  const contentId = useId();
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
      <div className="form-control">
        <label htmlFor={titleId} className="label">
          <span className="label-text text-sm font-medium">タイトル</span>
        </label>
        <input
          type="text"
          id={titleId}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="input input-bordered w-full focus:input-primary"
          placeholder="記事のタイトルを入力"
        />
      </div>

      <div className="form-control">
        <label htmlFor={contentId} className="label">
          <span className="label-text text-sm font-medium">本文</span>
        </label>
        <textarea
          id={contentId}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
          rows={10}
          className="textarea textarea-bordered w-full focus:textarea-primary"
          placeholder="記事の内容を入力"
        />
      </div>

      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            id={publishedId}
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="checkbox checkbox-sm checkbox-primary"
          />
          <span className="label-text text-sm">公開する</span>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-sm px-4"
        >
          {isSubmitting && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          {isSubmitting ? "保存中..." : initialData ? "更新" : "作成"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={isSubmitting}
          className="btn btn-outline btn-sm px-4"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
