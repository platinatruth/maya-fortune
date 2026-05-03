import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "占い免責事項 | maya-fortune",
  description: "maya-fortune の占い結果に関する免責事項です。",
};

export default function DisclaimerPage() {
  return (
    <main className="flex flex-col flex-1">
      <header className="px-5 sm:px-8 pt-10 pb-4 max-w-2xl mx-auto w-full">
        <Link href="/" className="text-xs text-ink-soft hover:text-turquoise-deep">
          ← トップに戻る
        </Link>
        <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-ink">
          占い免責事項
        </h1>
      </header>

      <article className="px-5 sm:px-8 pb-16 max-w-2xl mx-auto w-full space-y-6 text-sm leading-relaxed text-ink">
        <p>
          maya-fortune（以下「本サービス」）は、古代マヤ文明に伝わる260日周期の神聖暦「ツォルキン」の体系に基づき、
          ご入力いただいた生年月日からKIN番号・太陽の紋章・銀河の音を算出して鑑定文を表示するWebサービスです。
          ご利用の前に、以下の事項をお読みいただき、ご同意のうえご利用ください。
        </p>

        <Section title="1. 鑑定の性質">
          <p>
            本サービスが提供する鑑定結果は、マヤ暦ツォルキンの伝統的な解釈をもとに作成された、
            <strong>娯楽および自己理解のための参考情報</strong>です。科学的・医学的に検証された結論ではありません。
          </p>
        </Section>

        <Section title="2. 重要な判断の代替ではないこと">
          <p>
            鑑定結果は、医療・法律・税務・投資・進学・就職・結婚・離婚・転居など、
            人生における重要な判断や専門家の助言に代わるものではありません。
            これらの判断にあたっては、必ず資格を持つ専門家にご相談ください。
          </p>
        </Section>

        <Section title="3. 健康に関する注意">
          <p>
            身体・精神の不調を感じている場合は、本サービスの結果を理由に受診や治療を遅らせず、
            速やかに医療機関にご相談ください。本サービスは医療行為ではありません。
          </p>
        </Section>

        <Section title="4. 結果の解釈と責任">
          <p>
            鑑定結果の受け取り方や活用の仕方は、ご利用者ご自身の感性と判断に委ねられます。
            鑑定結果に基づいて行われた行動・選択・判断によって生じたいかなる結果につきましても、
            本サービスの運営者は責任を負いかねます。
          </p>
        </Section>

        <Section title="5. 内容の正確性">
          <p>
            本サービスの計算ロジックや鑑定文は継続的に改善しておりますが、
            その内容の完全性・正確性・有用性を保証するものではありません。
            予告なく内容を変更・追加・削除する場合があります。
          </p>
        </Section>

        <Section title="6. 第三者の権利">
          <p>
            本サービスは、特定の個人・団体・宗教・思想を肯定または否定するものではありません。
            また、占いの結果を他者の判断や評価に用いることは推奨しておりません。
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
