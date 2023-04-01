import MarkdownIt from "markdown-it";
import MarkdownItSub from "markdown-it-sub";
import MarkdownItSup from "markdown-it-sup";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItIns from "markdown-it-ins";
import MarkdownItAbbr from "markdown-it-abbr";
import MarkdownItForInline from "markdown-it-for-inline";
import MarkdownItKatex from "markdown-it-katex";
import MarkdownItHighlightjs from "markdown-it-highlightjs";
// import "highlight.js/styles/github.css";

export const markdown = new MarkdownIt({
  html: true,
  breaks: true,
})
  .use(MarkdownItSub) // 下标
  .use(MarkdownItSup) // 上标
  .use(MarkdownItFootnote) // 脚标
  .use(MarkdownItMark) // 标记
  .use(MarkdownItIns) // 插入
  .use(MarkdownItAbbr) // 缩写注释
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .use(
    MarkdownItForInline,
    "url_new_win",
    "link_open",
    (tokens: any[], idx: number) => {
      const aIndex = tokens[idx].attrIndex("target");

      if (aIndex < 0) {
        tokens[idx].attrPush(["target", "_blank"]);
      } else {
        tokens[idx].attrs[aIndex][1] = "_blank";
      }
    }
  ) // 链接都用新开页
  .use(MarkdownItKatex) // katex插件
  .use(MarkdownItHighlightjs); // 语法高亮插件
