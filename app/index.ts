import "./style.scss";

import("../wasm/pkg").then((module) => {
  const textDom = document.getElementById("editor") as HTMLTextAreaElement;

  const preview = document.getElementById("preview");

  function init() {
    const t = `
# Header1

## Header2
 


## Paragraphs

I really like using Markdown.

I think I'll use it to format all of my documents from now on.

## List

* First item
* Second item
* Third item

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

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |



| 左对齐 | 右对齐 | 居中对齐 |
| :-----| ----: | :----: |
| 单元格 | 单元格 | 单元格 |
| 单元格 | 单元格 | 单元格 |


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
  }

  init();

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
