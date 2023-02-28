import Split from "split.js";
import "github-markdown-css/github-markdown-light.css";
import "./style.scss";

const MARKDOWN_TEXT_KEY = "markdown-text";

import("../wasm/pkg").then((module) => {
  const textDom = document.getElementById("editor") as HTMLTextAreaElement;
  const preview = document.getElementById("preview");

  const text = localStorage.getItem(MARKDOWN_TEXT_KEY);

  function init() {
    const t = `
# Header1 {#top}

## Header2



## Paragraphs

I really like using Markdown.

I think I'll use it to format all of my documents from now on.

## List

* [x] First item
* [x] Second item
* [x] Third item


1. First item 1.
2. Second item 2.
3. Third item 3.

+ First item
+ Second item
+ Third item


- First item
- Second item
- Third item


- First item
- Indented item
    - Indented item

## Blockquote

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

## Code

\`\`\`javascript
console.log('javascript')
console.log('javascript')
console.log('javascript')
\`\`\`

## Link

[ShineShao](https://github.com/freeshineit)

## Image

![ShineShao](https://avatars.githubusercontent.com/u/16034259?v=4)

## Table

|  th1  | th2  |
| ----  | ---- |
| td  | td |
| td  | td |



| th(left) | th(center) | th(right) |
| :-----| :----: | ----: |
| td | td | td |
| td | td | td |


## mark

I need to highlight these <mark>very important words</mark>.

## Smart Punctuation

"CommonMark is the PHP League's Markdown parser," she said.  "It's super-configurable... you can even use additional extensions to expand its capabilities -- just like this one!"

## Font

*斜体文本*

_斜体文本_ 

**粗体文本**

__粗体文本__

***粗斜体文本***

___粗斜体文本___


## Separation line

***

* * *

*****

- - -

----------

## Delete line

~~BAIDU.COM~~

## Html Tag

This **word** is bold. This <em>word</em> is italic.

<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>

## Footnote

Here is a footnote reference,[^1] and another.[^2]

[^1]: Here is the footnote.

[^2]: Here's one with multiple blocks.

    `;

    textDom.value = text || t;

    renderDome(parseText2Html(textDom.value));

    // 滚动

    // 屏蔽 “ctrl+s” 保存页面
    window.addEventListener(
      "keydown",
      (e) => {
        if (
          e.keyCode === 83 &&
          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
        ) {
          e.preventDefault();
        }
      },
      false
    );

    document.getElementById("download").addEventListener(
      "click",
      () => {
        fileDownload(textDom.value, "markdown.md");
      },
      false
    );

    // document.getElementById("downloadPDF").addEventListener(
    //   "click",
    //   () => {
    //     fileDownload(textDom.value, "markdown.md");
    //   },
    //   false
    // );
  }

  setSplit();
  init();

  function setSplit() {
    const splitSizes: string = localStorage.getItem("split-sizes");
    let sizes = [50, 50];
    try {
      sizes = JSON.parse(splitSizes) as [number, number];
    } catch (error) {}

    Split(["#editor", "#preview"], {
      sizes,
      minSize: [300, 300],
      onDragEnd: function (sizes) {
        localStorage.setItem("split-sizes", JSON.stringify(sizes));
      }
    });
  }

  /**
   * parse text to html
   * @param text
   * @returns
   */
  function parseText2Html(text: string) {
    localStorage.setItem(MARKDOWN_TEXT_KEY, text);
    console.time("parse");
    const html = module.parser(text);
    console.timeEnd("parse");

    return html;
  }

  /**
   * render html
   * @param html
   */
  function renderDome(html: string) {
    preview.innerHTML = html;
  }

  const throttleFn = throttle(() => {
    var val = textDom.value;
    localStorage.setItem(MARKDOWN_TEXT_KEY, val);
    renderDome(parseText2Html(val));
  });

  // textarea listen input event
  textDom.addEventListener("input", (e) => {
    //优化 节流
    throttleFn();
  });
});

/**
 * 节流
 * @param fn
 * @param delay
 * @returns
 */
function throttle(fn: Function, delay?: number) {
  let valid = true;
  return function () {
    if (!valid) {
      return false;
    }
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay || 250);
  };
}
/**
 *
 * @param data
 * @param filename
 * @param mime
 * @param bom
 */
function fileDownload(
  data: string | ArrayBuffer | ArrayBufferView | Blob,
  filename: string,
  mime?: string,
  bom?: string | Uint8Array
) {
  var blobData = typeof bom !== "undefined" ? [bom, data] : [data];
  var blob = new Blob(blobData, { type: mime || "application/octet-stream" });

  var blobURL =
    window.URL && window.URL.createObjectURL
      ? window.URL.createObjectURL(blob)
      : window.webkitURL.createObjectURL(blob);
  var tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);

  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();

  // Fixes "webkit blob resource error 1"
  setTimeout(function () {
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }, 200);
}
