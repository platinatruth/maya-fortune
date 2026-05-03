import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | maya-fortune",
  description: "maya-fortune のプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-col flex-1">
      <header className="px-5 sm:px-8 pt-10 pb-4 max-w-2xl mx-auto w-full">
        <Link href="/" className="text-xs text-ink-soft hover:text-turquoise-deep">
          ← トップに戻る
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-ink">
          プライバシーポリシー
        </h1>
      </header>

      <article className="px-5 sm:px-8 pb-16 max-w-2xl mx-auto w-full space-y-6 text-sm leading-relaxed text-ink">
        <p>
          maya-fortune（以下「本サービス」）の運営者は、ご利用者の個人情報の保護を重要な責務と認識し、
          個人情報の保護に関する法律および関連法令を遵守のうえ、以下の方針に従って取り扱います。
        </p>

        <Section title="1. 取得する情報">
          <p>本サービスは、以下の情報を取り扱います。</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>
              <strong>生年月日</strong>：鑑定結果を算出するため、入力フォームを通じて取得します。
              URLのクエリパラメータとしてサーバーに送信され、KIN番号等の計算に使用されます。
            </li>
            <li>
              <strong>アクセス情報</strong>：IPアドレス、ブラウザの種類・バージョン、リファラー情報、
              アクセス日時など、Webサーバーが標準的に取得する情報。
            </li>
          </ul>
        </Section>

        <Section title="2. 情報の保管">
          <p>
            <strong>ご入力いただいた生年月日は、本サービスのデータベースに保存しておりません</strong>。
            アクセスのたびにURLパラメータから受け取り、その場で計算に用いるのみです。
          </p>
          <p className="mt-2">
            アクセス情報は、ホスティング事業者（Vercel Inc.）の標準的なログとして
            一定期間保管されることがあります。詳細は同社のプライバシーポリシーに準じます。
          </p>
        </Section>

        <Section title="3. 利用目的">
          <p>取得した情報は、以下の目的でのみ利用します。</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>マヤ歴ツォルキン鑑定結果の算出と表示</li>
            <li>本サービスの改善および不具合対応</li>
            <li>不正アクセス・不正利用の防止</li>
          </ul>
        </Section>

        <Section title="4. 第三者提供">
          <p>
            法令に基づく場合を除き、取得した情報を第三者に提供することはありません。
          </p>
        </Section>

        <Section title="5. アクセス解析">
          <p>
            本サービスでは、利用状況の把握とサービス改善のため、Vercel Analytics 等のアクセス解析ツールを使用する場合があります。
            これらのツールはCookieを利用してトラフィックデータを収集することがありますが、
            個人を特定する情報は含まれません。
          </p>
        </Section>

        <Section title="6. Cookie">
          <p>
            本サービスは、機能維持に必要な最小限のCookieのみを使用します。
            ブラウザの設定によりCookieの受け取りを拒否することができますが、その場合、
            一部の機能が正常に動作しない可能性があります。
          </p>
        </Section>

        <Section title="7. 安全管理">
          <p>
            取得した情報の漏えい・滅失・改ざんを防止するため、合理的な安全管理措置を講じます。
            通信は HTTPS により暗号化されます。
          </p>
        </Section>

        <Section title="8. 開示・訂正・削除等">
          <p>
            ご自身に関する情報の開示、訂正、利用停止、削除をご希望の場合は、
            下記のお問い合わせ先までご連絡ください。本人確認のうえ、合理的な範囲で対応いたします。
          </p>
        </Section>

        <Section title="9. お問い合わせ">
          <p>
            本ポリシーに関するお問い合わせは、以下までお願いいたします。
          </p>
          <p className="mt-2 px-4 py-3 bg-bg-soft rounded-lg text-xs">
            連絡先メールアドレス: <span className="font-mono">mayareki.fortune@gmail.com</span>
          </p>
        </Section>

        <Section title="10. 改定">
          <p>
            本ポリシーは、法令の変更や本サービスの内容変更に伴い、予告なく改定する場合があります。
            重要な変更がある場合は、本ページにて告知いたします。
          </p>
        </Section>

        <p className="text-xs text-ink-soft pt-4 border-t border-line">
          最終更新日: 2026年5月3日
        </p>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base sm:text-lg font-medium text-ink">{title}</h2>
      <div className="text-ink-soft leading-relaxed">{children}</div>
    </section>
  );
}
