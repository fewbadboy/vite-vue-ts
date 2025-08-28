# Note

## Tailwind CSS

Tailwind CSS v4.0 不适用于与 Sass、Less 或 Stylus 等 CSS 预处理器一起使用。

### Variables

```css
.success {
  color: var(--text-green-700);
}
```

### Nesting

Tailwind 在底层使用 Lightning CSS 来处理嵌套 CSS

```css
.typography {
  .title {
    color: var(--text-green-700);
  }
}
```

### CSS modules

不建议 CSS modules and Tailwind 一起使用

### Using arbitrary values

```html
<div class="h-[calc(100vh-(--spacing(6)))]"></div>
```

### Using custom CSS

```css
@layer components {
  .custom-class {
    color: var(--text-green-700);
  }
}
```

### Pseudo classes

- first/last/odd/even/nth-\*/nth-last-\*nth-of-type-\*

#### Styling based in parent state

当你需要根据某个父元素的状态来设置元素的样式时，请使用 group 类标记父元素

```html
<div class="group">
  <div class="group-hover:text-red-700"></div>
  <div class="group-hover:text-red-700"></div>
</div>
```

#### Styling based in sibling state

当你需要根据同级元素的状态来设置元素的样式时，请使用 peer 类标记同级元素，并使用 peer-\*

### Pseudo elements

- before/after
- placeholder
- file: input 类型为 file 样式
- marker:设置列表中计数器或项目符号的样式
- selection
- first-line/first-letter
- backdrop:原生 dialog 元素背景

## Detecting classes in source files

始终使用完整的类名

```html
<div :class="[error?'text-red-600':'text-green-600']"></div>
```

始终将 props 映射到静态类名

## DevTools

[DevTools](https://devtools.vuejs.org/getting-started/installation#installation)
