use pulldown_cmark::{html, Options, Parser};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn parser(text: &str) -> String {
    let mut options = Options::empty();

    options.insert(Options::ENABLE_STRIKETHROUGH); // 启用删除线
    options.insert(Options::ENABLE_TABLES); // 启用table
    options.insert(Options::ENABLE_FOOTNOTES); // 启用脚注
    options.insert(Options::ENABLE_TASKLISTS); // 启用任务列表
    options.insert(Options::ENABLE_SMART_PUNCTUATION); // 启用智能标点符号
    options.insert(Options::ENABLE_HEADING_ATTRIBUTES); // 启用标题属性
    let parser = Parser::new_ext(text, options);

    // Write to String buffer.
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);

    html_output
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(
            parser("> a"),
            r#"<blockquote>
<p>a</p>
</blockquote>
"#
        );
    }
}
