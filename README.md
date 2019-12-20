## start-user-authentication
一个用户登录，认证的Demo
### 启动
#### back-end
```shell
yarn install

yarn startDev
```

#### front-end
```shell
yarn install

yarn start
```

### 主要工作流程

1. 前端进入登录页面
2. 点击登录按钮
3. 发送登录请求(包含账号和密码)
4. 后端接受登录请求
5. 判断账号和密码是否正确
6. 进入生成签证流程
7. 根据用户名和失效时间 根据key 生成签证
8. 下发签证
9. 前端判断返回参数
10. 将签证记入localStorage
11. 跳转业务页面
12. 发送业务请求(携带签证)
13. 后端进行签证验证
14. 发送业务数据
15. 前端根据返回数据判断
16. 签证验证失败跳转登录页面

