import Split from "split.js";

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

  const debounceFn = debounce(() => {
    var val = textDom.value;
    localStorage.setItem(MARKDOWN_TEXT_KEY, val);
    renderDome(parseText2Html(val));
  });

  // textarea listen input event
  textDom.addEventListener("input", (e) => {
    new Promise(() => {
      //优化防抖
      debounceFn();
    });
  });

  /**
   * 防抖
   * @param fn 回调
   * @param delay 时间(单位ms)
   * @returns Function
   */
  function debounce(fn: Function, delay?: number) {
    var timeout: number = null;
    return function () {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, delay || 100);
    };
  }

  // /**
  //  * 节流
  //  * @param fn 回调
  //  * @param delay 时间(单位ms)
  //  * @returns Function
  //  */
  // function throttle(fn: Function, delay?: number) {
  //   var prev = Date.now();
  //   return function () {
  //     var context = this;
  //     var args = arguments;
  //     var now = Date.now();
  //     if (now - prev >= delay || 100) {
  //       fn.apply(context, args);
  //       prev = Date.now();
  //     }
  //   };
  // }
});
