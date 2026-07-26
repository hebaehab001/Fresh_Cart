import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingBtn({
  loadingTitle,
  title,
  isSubmitting,
  variant,
  size,
  className,
  ...props
}) {
  return (
    <Button
      className={className}
      disabled={isSubmitting}
      variant={variant}
      size={size}
      {...props}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2">
          <Spinner data-icon="inline-start" className={undefined} />
          {loadingTitle}
        </span>
      ) : (
        <span>{title}</span>
      )}
    </Button>
  );
}
