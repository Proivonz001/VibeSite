import { Gamepad2, Plug, Wrench } from "lucide-react";
import type { ProjectKind } from "@/lib/content";

export function KindIcon({ kind, className }: { kind: ProjectKind; className?: string }) {
  if (kind === "game") return <Gamepad2 className={className} />;
  if (kind === "mcp") return <Plug className={className} />;
  return <Wrench className={className} />;
}
