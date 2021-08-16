# Git 自动化相关

1. Git自动创造repo
- 使用插件
    - 如gh，步骤(需要进行验证)
    1. brew install gh
    2. git init
    3. touch file
    4. git add file
    5. git commit -m "xxx"
    6. **git repo create**
    7. git push -u origin master
    - hub
    ```
        → create a repo for a new project
        $ git init
        $ git add . && git commit -m "It begins."
        $ git create -d "My new thing"
        →  (creates a new project on GitHub with the name of current directory)
        $ git push origin master
    ```

- CLI command
    - E.g.1 
    ```
    curl -u 'USER' https://api.github.com/user/repos -d '{"name":"REPO"}'

    # Remember replace USER with your username and REPO with your repository/application name!

    git remote add origin git@github.com:USER/REPO.git
    git push origin master
    ```
    1. 如果需要Oauth验证，则为如下
    ```
    curl -H "Authorization: token MYTOKEN" -u 'USERNAME:PASSWORD' https://api.github.com/user/repos -d '{"name":"REPONAME"}'
    ```
    其中大写字母根据自身进行替换, ```PASSWORD```可去掉，去掉后需要手动输入密码；
    2. ```'{"name":"REPONAME","private":"true", "description":"none"}'```可以进行选填
    3. 或者也可以去掉Oauth
    操作如链接所示 <a href="https://docs.github.com/en/organizations/restricting-access-to-your-organizations-data/disabling-oauth-app-access-restrictions-for-your-organization
    " title="Hobbit lifestyles">LINK</a>
    - E.g.2
    ```
    curl -F 'login=username' -F 'token=API Token' https://github.com/api/v2/yaml/repos/create -F name=reponame
    ```

