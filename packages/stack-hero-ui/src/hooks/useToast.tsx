import { Card, CardBody } from "@heroui/react";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: Toast["type"] = "info") => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    // 3秒後に自動で削除
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getColorClass = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "bg-success-50 text-success-700 border-success-200";
      case "error":
        return "bg-danger-50 text-danger-700 border-danger-200";
      case "warning":
        return "bg-warning-50 text-warning-700 border-warning-200";
      default:
        return "bg-primary-50 text-primary-700 border-primary-200";
    }
  };

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      default:
        return "ℹ️";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm">
          {toasts.map((toast, index) => (
            <Card
              key={toast.id}
              className={`animate-slide-in-left min-w-[300px] border-2 shadow-lg transition-smooth hover-lift ${getColorClass(toast.type)}`}
              isPressable
              onPress={() => removeToast(toast.id)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardBody className="flex-row items-center gap-3 py-3">
                <span className="text-2xl animate-bounce-soft">
                  {getIcon(toast.type)}
                </span>
                <div className="flex-1">
                  <span className="font-medium">{toast.message}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeToast(toast.id);
                  }}
                  className="text-default-500 hover:text-default-700 transition-colors ml-2"
                  aria-label="閉じる"
                >
                  ×
                </button>
              </CardBody>
            </Card>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
