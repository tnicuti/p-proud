import { escapeHtml } from "./text";

/**
 * Markdown nhẹ cho tin nhắn chatbot: **đậm**, gạch đầu dòng "- ", xuống dòng.
 * Escape HTML TRƯỚC khi chèn thẻ, nên nội dung không thể chèn mã độc.
 */
export function renderLightMarkdown(text: string): string {
  const html = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  let out = "";
  let inList = false;
  for (const line of html.split(/\n/)) {
    const m = line.match(/^\s*[-•*]\s+(.*)/);
    if (m) {
      if (!inList) {
        out += "<ul>";
        inList = true;
      }
      out += `<li>${m[1]}</li>`;
    } else {
      if (inList) {
        out += "</ul>";
        inList = false;
      }
      if (line.trim()) out += `<p>${line}</p>`;
    }
  }
  if (inList) out += "</ul>";
  return out;
}
