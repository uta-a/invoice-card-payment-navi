import { useEffect } from "react";

function setMetaContent(selector: string, content: string) {
  let meta = document.querySelector(selector);
  if (meta) {
    meta.setAttribute("content", content);
  } else {
    meta = document.createElement("meta");
    const [attr, value] = selector
      .match(/\[(.+?)="(.+?)"\]/)!
      .slice(1, 3);
    meta.setAttribute(attr, value);
    meta.setAttribute("content", content);
    document.head.appendChild(meta);
  }
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
  }, [title, description]);
}
