import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { visit } from "unist-util-visit";

const rehypeScrollableWrapper = () => (tree) => {
  visit(tree, { tagName: "table" }, (node, index, parent) => {
    const wrapper = {
      type: "element",
      tagName: "div",
      properties: { className: ["markdown-scrollable"] },
      children: [node],
    };
    parent.children.splice(index, 1, wrapper);
  });
};

export async function renderMarkdown(content: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeScrollableWrapper)
    .use(rehypeExternalLinks, {
      rel: ["nofollow", "noopener", "noreferrer"],
      target: "_blank",
    })
    .use(rehypeStringify)
    .process(content);

  return String(file);
}
