"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const noop = () => () => {};
/** true once we are rendering on the client, false during SSR/hydration. */
const useMounted = () =>
  useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
