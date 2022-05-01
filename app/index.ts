import "./style.scss";

import("../wasm/pkg").then((module) => {
  const textDom = document.getElementById("text") as HTMLTextAreaElement;

  function init() {
    const t = `
# Header1

## Header2


aee qeqweq
qwerqwe 

marked

## List

* 第一项
* 第二项
* 第三项

+ 第一项
+ 第二项
+ 第三项


- 第一项
- 第二项
- 第三项

## Block

> 区块引用

> 菜鸟教程

> 学的不仅是技术更是梦想

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



## Footnote

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.


## Html Tag

<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>

    
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
    document.getElementById("html").innerHTML = html;
  }

  // textarea listen input event
  textDom.addEventListener("input", (e) => {
    renderDome(parseText2Html(textDom.value));
  });
});
