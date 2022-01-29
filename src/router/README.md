# 路由/菜单说明

## 格式和说明

```ecmascript 6
const routerObject = {
  path: 'router-path',
  name: 'router-name',
  redirect: noredirect,
  component: ViewDom
  meta: {
    title: 'title',
    keepAlive: true,
  }
}
```

`{ Route }` 对象

| 参数      | 说明                                      | 类型                          | 默认值 |
| --------- | ----------------------------------------- | ----------------------------- | ------ |
| path      | 跳转路由地址                              | string                        | -      |
| name      | 路由名称, 必须设置,且不能重名             | string                        | -      |
| redirect  | 重定向地址, 访问这个路由时,自定进行重定向 | string                        | -      |
| component | 命名视图组件                              | { [name: string]: Component } | -      |
| meta      | 路由元信息（路由附带扩展信息）            | object                        | {}     |

`{ Meta }` 路由元信息对象

| 参数      | 说明                                          | 类型    | 默认值 |
| --------- | --------------------------------------------- | ------- | ------ |
| title     | 路由标题, 用于显示面包屑, 页面标题 \*推荐设置 | string  | -      |
| keepAlive | 缓存该路由                                    | boolean | false  |
