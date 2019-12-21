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

## 简介
JSON Web Token（JWT）是目前最流行的跨域身份验证解决方案。是一个开放标准(RFC 7519)，它定义了一种紧凑的、自包含的方式，用于作为JSON对象在各方之间安全地传输信息。该信息可以被验证和信任，因为它是数字签名的。JWT的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。

## 主要流程
1. 前端登录 验证账号密码
2. 后端基于userName、签证有效时间或其他多种信息，根据私钥。生成加密签证。
3. 后端下发签证。
4. 前端存储签证。有权限验证的请求均携带该签证。
5. 后端接收到请求后，根据用户信息、私钥再次进行加密，和签证进行对比，与原签证一致则通过。


下图是client 使用 JWT 与server 交互过程:
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy8xODIxMDU4LTJlMjhmZTZjOTk3YTYwYzkucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy8xMDAwL2Zvcm1hdC93ZWJw)

## JWT的数据结构

典型的，一个JWT看起来如下图。

改对象为一个很长的字符串，字符之间通过"."分隔符分为三个子串。注意JWT对象为一个长字串，各字串之间也没有换行符，此处为了演示需要，我们特意分行并用不同颜色表示了。每一个子串表示了一个功能块，总共有以下三个部分：

JWT的三个部分如下。JWT头、有效载荷和签名，将它们写成一行如下。

![](https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=563276735,1576219691&fm=173&app=25&f=JPEG?w=640&h=237&s=D8243D7287E04D011E54B1CF0000A0B3)

### JWT头
JWT头部分是一个描述JWT元数据的JSON对象，通常如下所示。
```json
{

"alg": "HS256",

"typ": "JWT"

}
```
在上面的代码中，alg属性表示签名使用的算法，默认为HMAC SHA256（写为HS256）；typ属性表示令牌的类型，JWT令牌统一写为JWT。

最后，使用Base64 URL算法将上述JSON对象转换为字符串保存。

### 有效载荷

有效载荷部分，是JWT的主体内容部分，也是一个JSON对象，包含需要传递的数据。 JWT指定七个默认字段供选择。

iss：发行人

exp：到期时间

sub：主题

aud：用户

nbf：在此之前不可用

iat：发布时间

jti：JWT ID用于标识该JWT

除以上默认字段外，我们还可以自定义私有字段，如下例：
```json
{

"sub": "1234567890",

"name": "chongchong",

"admin": true

}
```
请注意，默认情况下JWT是未加密的，任何人都可以解读其内容，因此不要构建隐私信息字段，存放保密信息，以防止信息泄露。

JSON对象也使用Base64 URL算法转换为字符串保存

### 签名哈希

签名哈希部分是对上面两部分数据签名，通过指定的算法生成哈希，以确保数据不会被篡改。

首先，需要指定一个密码（secret）。该密码仅仅为保存在服务器中，并且不能向用户公开。然后，使用标头中指定的签名算法（默认情况下为HMAC SHA256）根据以下公式生成签名。

```shell
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload),secret)
```

在计算出签名哈希后，JWT头，有效载荷和签名哈希的三个部分组合成一个字符串，每个部分用"."分隔，就构成整个JWT对象。

### JWT的用法

客户端接收服务器返回的JWT，将其存储在Cookie或localStorage中。

此后，客户端将在与服务器交互中都会带JWT。如果将它存储在Cookie中，就可以自动发送，但是不会跨域，因此一般是将它放入HTTP请求的Header Authorization字段中。

Authorization: Bearer

当跨域时，也可以将JWT被放置于POST请求的数据主体中。

### JWT问题和趋势

1、JWT默认不加密，但可以加密。生成原始令牌后，可以使用改令牌再次对其进行加密。

2、当JWT未加密方法是，一些私密数据无法通过JWT传输。

3、JWT不仅可用于认证，还可用于信息交换。善用JWT有助于减少服务器请求数据库的次数。

4、JWT的最大缺点是服务器不保存会话状态，所以在使用期间不可能取消令牌或更改令牌的权限。也就是说，一旦JWT签发，在有效期内将会一直有效。

5、JWT本身包含认证信息，因此一旦信息泄露，任何人都可以获得令牌的所有权限。为了减少盗用，JWT的有效期不宜设置太长。对于某些重要操作，用户在使用时应该每次都进行进行身份验证。

6、为了减少盗用和窃取，JWT不建议使用HTTP协议来传输代码，而是使用加密的HTTPS协议进行传输。

## 参考 & 引用
https://blog.csdn.net/zhanyu1/article/details/84255210
https://www.cnblogs.com/mantoudev/p/8994341.html
https://baijiahao.baidu.com/s?id=1608021814182894637&wfr=spider&for=pc
