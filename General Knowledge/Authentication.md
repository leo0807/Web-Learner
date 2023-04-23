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
- OAuth 2.0是一种授权框架，可以与OpenID Connect（OIDC）一起用于身份验证。OIDC是基于OAuth 2.0构建的身份验证层，允许验证用户身份并授权对受保护资源的受控访问。

- 在使用“使用Google登录”或类似功能时，OAuth 2.0和OIDC共同用于简化身份验证过程。OIDC以标准化的JSON Web Token（JWT）形式提供用户身份数据。此令牌包含有关已验证用户的信息，允许第三方应用程序在不需要单独注册流程的情况下创建用户配置文件。

- 在这种设置中，OAuth 2.0通过发放短期令牌而非密码来提供“安全委托访问”，允许第三方服务在资源所有者的许可下访问受保护的资源。这种方法增强了安全性，因为第三方服务不直接处理或存储用户的密码。

综上所述，OAuth 2.0是一种授权框架，可以与OIDC一起用于身份验证。OIDC提供用户身份数据，OAuth 2.0通过发放短期令牌来提供安全委托访问。这种方法可以提高安全性，并简化身份验证过程。
![OAuth 2.0](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F75a1f3e9-7bad-410a-b059-66ccd6189f6b_1600x998.png)

在“使用Google登录”的例子中，OAuth 2.0定义了四个角色：
- 资源所有者（Resource owner）：最终用户，控制其个人数据的访问。
- 资源服务器（Resource server）：Google服务器，托管作为受保护资源的用户配置文件。它使用访问令牌来响应受保护资源请求，确保只有经过授权的服务才能访问数据。
- 客户端（Client）：代表资源所有者进行请求的设备（PC或智能手机）。这个设备代表寻求访问用户数据的第三方应用程序。
- 授权服务器（Authorization server）：颁发令牌给客户端的Google授权服务器，管理资源服务器和客户端之间的令牌安全交换。

OAuth 2.0提供了四种授权授予类型，以适应不同的情况：
- 授权码授权（Authorization code grant）：最完整和通用的模式，适用于大多数应用程序类型。更多细节见下文。
- 隐式授权（Implicit grant）：设计用于仅具有前端的应用程序，如单页应用程序或移动应用程序。不再推荐使用。更多细节见下文。
- 资源所有者密码凭据授权（Resource owner password credentials grant）：当用户信任第三方应用程序使用其凭据，如受信任的移动应用程序时使用。
- 客户端凭据授权（Client credentials grant）：适用于无前端的情况，如命令行工具或服务器间通信，无需资源所有者交互。

![Oauth 2.0](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fce0b4f94-1fae-4d70-a71e-1f82ef93220c_1600x1257.png)
## Reference
- [bytebytego](https://blog.bytebytego.com/p/password-session-cookie-token-jwt-ec1)
