import { Mail, ShoppingCart } from "lucide-react";
import { CopyButton } from "./copy-button";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ProjectMeta } from "@/lib/content";
import { site } from "@/lib/site";

export function ToolList({ tools, d }: { tools: ProjectMeta["tools"]; d: Dictionary }) {
  if (!tools || tools.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{d.mcp.tools}</h2>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full table-fixed text-sm">
          <tbody>
            {tools.map((t) => (
              <tr key={t.name} className="border-b border-border last:border-0">
                <td className="w-[38%] break-words bg-muted/50 px-4 py-2 align-top font-mono text-xs">
                  {t.name}
                </td>
                <td className="w-[62%] px-4 py-2 align-top text-muted-foreground">{t.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function InstallSteps({
  install,
  d,
}: {
  install: ProjectMeta["install"];
  d: Dictionary;
}) {
  if (!install || install.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{d.mcp.install}</h2>
      <div className="space-y-4">
        {install.map((step) => (
          <div key={step.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium">{step.label}</span>
              <CopyButton text={step.command} label={d.mcp.copy} copiedLabel={d.mcp.copied} />
            </div>
            <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-3 font-mono text-xs leading-relaxed">
              {step.command}
            </pre>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Requirements({
  requirements,
  d,
}: {
  requirements: ProjectMeta["requirements"];
  d: Dictionary;
}) {
  if (!requirements || requirements.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-sm">
      <h3 className="text-xs text-muted-foreground">{d.mcp.requirements}</h3>
      <ul className="mt-2 list-disc space-y-1 pl-4">
        {requirements.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export function SaleBox({ meta, d }: { meta: ProjectMeta; d: Dictionary }) {
  const sale = meta.sale;
  if (!sale || sale.mode === "free") return null;
  if (sale.mode === "contact") {
    const subject = encodeURIComponent(`${meta.title}: licensing`);
    return (
      <div className="rounded-xl border border-accent/40 bg-accent/5 p-5 text-sm">
        <p className="font-medium">{d.shop.licensingTitle}</p>
        <p className="mt-1 text-muted-foreground">{sale.note ?? d.shop.licensingBody}</p>
        <a
          href={`mailto:${site.email}?subject=${subject}`}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <Mail className="size-4" />
          {d.shop.contact}
        </a>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-accent/40 bg-accent/5 p-5 text-sm">
      <p className="text-2xl font-semibold">
        {new Intl.NumberFormat("en", { style: "currency", currency: sale.currency }).format(
          sale.price,
        )}
      </p>
      <a
        href={sale.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:opacity-90"
      >
        <ShoppingCart className="size-4" />
        {d.shop.buy}
      </a>
    </div>
  );
}
