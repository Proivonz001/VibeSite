import { notFound } from "next/navigation";

/**
 * Catch-all so that unknown URLs render the localized not-found page
 * inside the [lang] layout instead of the bare Next.js 404.
 */
export default function CatchAll() {
  notFound();
}
