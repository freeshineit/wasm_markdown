import Split from "split.js";

import "./style.scss";

import("../wasm/pkg").then((module) => {
  const textDom = document.getElementById("editor") as HTMLTextAreaElement;

  const preview = document.getElementById("preview");

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

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    `;

    textDom.value = t;
    // console.log(parseText2Html(t));
    renderDome(parseText2Html(t));

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

  // textarea listen input event
  textDom.addEventListener("input", (e) => {
    renderDome(parseText2Html(textDom.value));
  });
});
