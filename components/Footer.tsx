import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-line bg-bg-soft/40">
      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-8 text-xs text-ink-soft flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <p className="font-medium text-ink">maya-fortune</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/legal/disclaimer" className="hover:text-turquoise-deep">
            占い免責事項
          </Link>
          <Link href="/legal/privacy" className="hover:text-turquoise-deep">
            プライバシーポリシー
          </Link>
        </nav>
        <p className="sm:ml-auto text-ink-soft/80">© {year} maya-fortune</p>
      </div>
    </footer>
  );
}
