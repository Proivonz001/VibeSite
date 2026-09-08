import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { enabledLocales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return enabledLocales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const d = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${d.site.name} · ${d.site.tagline}`,
      template: `%s · ${d.site.name}`,
    },
    description: d.site.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const d = await getDictionary();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <SiteHeader locale={locale} d={d} />
          <main className="flex-1 py-12">{children}</main>
          <SiteFooter d={d} />
        </ThemeProvider>
      </body>
    </html>
  );
}
