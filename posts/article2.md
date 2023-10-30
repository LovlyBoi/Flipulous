# 2. Props

React 工作树由一个个组件构成，由于使用了 Hooks，现在几乎全部都在使用函数组件，以下是一个父子组件，通过 props 传递数据：

```tsx
const ToDoItem: React.FC<{ title?: string }> = ({ title = "默认标题" }) => {
  return <li>{title}</li>;
}

const ToDoList: React.FC = () => {
  return (
    <ul>
      <ToDoItem title="吃饭" />
      <ToDoItem title="睡觉" />
      <ToDoItem title="打豆豆" />
      <ToDoItem />
    </ul>
  );
}
```

通过结构赋值语法的默认值，我们还可以为 Props 赋予默认值：`title = "默认标题"`。

如果我们想要做透传，可以直接：

```tsx
const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
};
```
