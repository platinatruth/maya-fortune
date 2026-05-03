import { ReactNode } from "react";

interface Props {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function LockedSection({ title, description, children }: Props) {
  return (
    <section className="relative rounded-3xl bg-surface border border-line p-6 sm:p-8 overflow-hidden">
      <div className="flex items-center gap-2 text-turquoise-deep">
        <LockIcon />
        <h3 className="text-base sm:text-lg font-medium">{title}</h3>
      </div>
      {description && (
        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{description}</p>
      )}

      <div
        aria-hidden
        className="mt-5 select-none pointer-events-none blur-[3px] opacity-60"
      >
        {children ?? (
          <div className="space-y-2">
            <div className="h-3 rounded bg-bg-soft w-11/12" />
            <div className="h-3 rounded bg-bg-soft w-10/12" />
            <div className="h-3 rounded bg-bg-soft w-9/12" />
            <div className="h-3 rounded bg-bg-soft w-11/12" />
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="flex-1 rounded-full bg-turquoise hover:bg-turquoise-deep transition-colors text-white font-medium py-3 text-sm shadow-sm"
        >
          会員登録して解放する
        </button>
        <button
          type="button"
          className="flex-1 rounded-full border border-turquoise text-turquoise-deep hover:bg-turquoise-soft transition-colors font-medium py-3 text-sm"
        >
          ログイン
        </button>
      </div>
      <p className="mt-3 text-xs text-ink-soft text-center">
        近日公開：月額プランで全運勢・方位マップが見放題に
      </p>
    </section>
  );
}

function LockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
