# Authentication方式
3中基本的安全验证
- Identity 
- Authentication
- Authorization

## Password
### Password-based
- HTTP基本访问身份验证要求用户在每次请求受保护资源时提供用户名和密码，这些凭据使用Base64编码并包含在Authorization标头中。
- 服务器验证这些凭据并授予或拒绝访问权限。虽然它提供了相对简单的身份验证方法，但其安全性有限。
- 凭据Credentials可以轻松解码，因此凭据可能会被拦截或中间人攻击所曝光。
- 由于每个网站都维护其自己的凭据，用户可能会忘记他们的用户名和密码。
![password](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F10e83d0a-8fb5-42f6-abeb-a5e8980450c3_1600x1275.png)
### Session-Cookie Authentication
- Session-cookie身份验证通过在服务器和客户端的cookie中存储会话ID来跟踪用户的登录状态，解决了HTTP基本访问身份验证无法实现此功能的问题。
- 用户在最初提供用户名和密码后，服务器会为其生成一个会话Session，并将会话ID作为cookie发送到客户端。
- 随后的请求将携带该cookie，服务器使用其中的会话ID来验证用户身份。
- 当用户退出登录或会话过期时，服务器会使该会话无效并且客户端会删除该cookie。
![session-cookie]([http://baidu.com/pic/doge.png](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F9b3002be-d4f2-489c-99cd-f789012d76dc_1600x1173.png)

## Passwordless
在身份验证Authentication方面，有三个要考虑的因素：
- （Knowledge）知识因素：您知道的东西，比如密码。
- （Ownership）拥有因素：您拥有的东西，比如设备或电话号码。
- （Inhernece）特征因素：与您唯一相关的东西，比如您的生物特征
### One-Time Passwords (OTP)
- 单点登录（Single Sign-On，SSO）是一种用户认证方法，它允许用户只需使用一组凭据即可访问多个系统或应用程序。
- SSO简化了登录过程，为用户在不同平台上提供了无缝的体验。该过程主要依赖于中央认证服务（Central Authentication Service，CAS）服务器。
- 以下是SSO过程的步骤： 
  1. 当用户尝试登录应用程序时，将被重定向到CAS服务器。
  2. CAS服务器验证用户的登录凭据并创建票据授予票证（Ticket Granting Ticket，TGT），该TGT存储在用户浏览器上的票据授予Cookie（Ticket Granting Cookie，TGC）中，代表其全局会话。
  3. CAS为用户访问的应用程序生成服务票证（Service Ticket，ST），并将其与ST一起重定向回应用程序。
  4. 应用程序使用ST验证用户在CAS服务器上的登录，用户便可以访问应用程序。
  5. 当用户想要访问另一个应用程序时，该过程会变得简化，因为他们已经有了先前登录的TGC
  6. CAS识别他们的已认证状态，为新应用程序生成一个新的ST，用户可以在不输入凭据的情况下访问它。
  7. 这个过程消除了为不同的应用程序记住和输入多组凭据的需要，使得它成为一种更高效和方便的认证方法。

- SAML（Security Assertion Markup Language）广泛用于企业应用程序。SAML以XML格式传递身份验证和授权数据。
- OIDC（OpenID Connect）在消费者应用程序中很受欢迎。OIDC通过JSON Web Tokens（JWT）处理身份验证，并构建在OAuth 2.0框架之上。下一节将更详细地介绍这一点。

![OTP](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb27865df-e833-47c8-9340-cba5510a90a0_1600x1069.png)

### OAuth 2.0 and OpenID Connect (OIDC)

## Reference
- [bytebytego](https://blog.bytebytego.com/p/password-session-cookie-token-jwt-ec1)
