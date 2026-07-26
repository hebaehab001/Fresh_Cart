import { toast } from "sonner";

const DEFAULT_DURATION = 2000;

export function toastSuccess(message: string, duration = DEFAULT_DURATION) {
  toast.success(message, { position: "bottom-right", duration });
}

export function toastError(message?: string, duration = DEFAULT_DURATION) {
  toast.error(message || "Something went wrong. Try again.", {
    position: "bottom-right",
    duration,
  });
}
