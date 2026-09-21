import { getAdaptedHtml } from "./adapted-content";

export function FullDocument({ path }: { path: string }) {
  // The Markdown is a versioned, repository-local source controlled by this project.
  const html = getAdaptedHtml(path);
  return <div className="method-markdown" dangerouslySetInnerHTML={{ __html: html }} />;
}

