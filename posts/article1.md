# JSX 语法

React 为我们暴露的创建节点的 API 是 `createElement()` 函数，如果我们想要创建一个内容为 Hello World 的 h2 标题：

```js
const h2Node = React.createElement('h2', {}, 'Hello World!');
```

如果我们需要写很多嵌套标签时，这种写法很不直观。所以我们可以借助 babel 编译器，来将一种叫做 JSX 的语法编译为 `createElement()` 函数：

```jsx
const h2Node = <h2>Hello World!</h2>;
// 会被 babel 编译为：
React.createElement('h2', {}, 'Hello World!');
```

JSX 和 HTML 比起来，还是有一些区别的：

- JSX 只能有一个根节点。这点很好理解，JSX 需要被编译为一个 `createElement()` 函数。如果我们不想在外层包裹一个多余的 `div` 标签，可以使用 `<></>` 来包裹。
- JSX 中所有标签必须闭合，他可以自闭和，但必须闭合。像 `<img src="1.jpg" >` 这种写法是错误的，更正为 `<img src="1.jpg" />`。
- 使用小驼峰命名。因为要被编译为 JS，所以需要使用小驼峰命名。很多属性为了避开 JS 关键字，有其他的名称：
	- `className`：`class` 关键字，给节点添加 CSS 类。
	- `htmlFor`：`for` 关键字，比如给 `label` 标签添加。
