相关来源：
- [Git 使用规范流程](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- [GitHub Actions](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
- [Git 工作流程](https://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
# Git 工作流程
三种主流工作流程：
- Git Flow
- Github Flow
- Gitlab FLow

## Git Flow
首先，项目存在两个主要分支
- ```主分支master (master)```
- ```开发分支 (develop)```

其中，项目存在三种短期分支
- 功能分支（feature branch）
- 补丁分支（hotfix branch）
- 预发分支（release branch）
一旦完成开发，它们就会被合并进 ```develop``` 或 ```master```，然后被删除。

```Git flow``` 的优点是清晰可控，缺点是相对复杂，需要同时维护两个长期分支。大多数工具都将 ```master``` 当作默认分支，可是开发是在 ```develop``` 分支进行的，这导致经常要切换分支，非常烦人。

更大问题在于，这个模式是基于"版本发布"的，目标是一段时间以后产出一个新版本。但是，很多网站项目是"持续发布"，代码一有变动，就部署一次。这时，```master``` 分支和 ```develop``` 分支的差别不大，没必要维护两个长期分支。

# Github Flow
- 根据需求，从 master 拉出新分支，不区分功能分支或补丁分支。
- 新分支开发完成后，或者需要讨论的时候，就向 master 发起一个 pull request（简称 PR）。
- Pull Request 既是一个通知，让别人注意到你的请求，又是一种对话机制，大家一起评审和讨论你的代码。对话过程中，你还可以不断提交代码。
- 你的 Pull Request 被接受，合并进 master，重新部署后，原来你拉出来的那个分支就被删除。（先部署再合并也可。）

Github flow 的最大优点就是简单，对于"持续发布"的产品，可以说是最合适的流程。

问题在于它的假设：master 分支的更新与产品的发布是一致的。也就是说，master 分支的最新代码，默认就是当前的线上代码。

可是，有些时候并非如此，代码合并进入 master 分支，并不代表它就能立刻发布。比如，苹果商店的 APP 提交审核以后，等一段时间才能上架。这时，如果还有新的代码提交，master 分支就会与刚发布的版本不一致。另一个例子是，有些公司有发布窗口，只有指定时间才能发布，这也会导致线上版本落后于 master 分支。

上面这种情况，只有 master 一个主分支就不够用了。通常，你不得不在 master 分支以外，另外新建一个 production 分支跟踪线上版本。

# Gitlab Flow
Gitlab flow 的最大原则叫做"上游优先"（upsteam first），即只存在一个主分支 master，它是所有其他分支的"上游"。只有上游分支采纳的代码变化，才能应用到其他分支。

Chromium 项目就是一个例子，它明确规定，上游分支依次为：

  - Linus Torvalds 的分支
  - 子系统（比如 netdev）的分支
  - 设备厂商（比如三星）的分支

对于"持续发布"的项目，它建议在 ```master``` 分支以外，再建立不同的环境分支。比如，"开发环境"的分支是 ```master```，"预发环境"的分支是 ```pre-production```，"生产环境"的分支是 ```production```。

开发分支是预发分支的"上游"，预发分支又是生产分支的"上游"。代码的变化，必须由"上游"向"下游"发展。比如，生产环境出现了 bug，这时就要新建一个功能分支，先把它合并到 ```master```，确认没有问题，再 ```cherry-pick``` 到 ```pre-production```，这一步也没有问题，才进入 ```production```。

只有紧急情况，才允许跳过上游，直接合并到下游分支。

# 常用 Git 命令清单
- 新建代码库
  - 在当前目录新建一个 Git 代码库

    \$ git init

  - 新建一个目录，将其初始化为 Git 代码库

    \$ git init \[project-name\]

  - 下载一个项目和它的整个代码历史

    \$ git clone \[url\]

- 配置
Git 的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。
  - 显示当前的 Git 配置

    \$ git config --list

  - 编辑 Git 配置文件

    \$ git config -e \[--global\]

  - 设置提交代码时的用户信息

    \$ git config \[--global\] user.name "\[name\]"
    \$ git config \[--global\] user.email "[email address]"
- 增加/删除文件

  - 添加指定文件到暂存区

    \$ git add \[file1\]\[file2\] ...

  - 添加指定目录到暂存区，包括子目录

    \$ git add \[dir\]

  - 添加当前目录的所有文件到暂存区

    \$ git add .

  - 添加每个变化前，都会要求确认

  - 对于同一个文件的多处变化，可以实现分次提交

    \$ git add -p

  - 删除工作区文件，并且将这次删除放入暂存区

    \$ git rm \[file1\]\[file2\] ...

  - 停止追踪指定文件，但该文件会保留在工作区

    \$ git rm --cached \[file\]

  - 改名文件，并且将这个改名放入暂存区

    \$ git mv \[file-original\]\[file-renamed\]

- 代码提交
  - 提交暂存区到仓库区

    \$ git commit -m \[message\]

  - 提交暂存区的指定文件到仓库区

    \$ git commit \[file1\]\[file2\] ... -m \[message\]

  - 提交工作区自上次 commit 之后的变化，直接到仓库区

    \$ git commit -a

  - 提交时显示所有 diff 信息

    \$ git commit -v

  - 使用一次新的 commit，替代上一次提交

  - 如果代码没有任何新变化，则用来改写上一次 commit 的提交信息

    \$ git commit --amend -m \[message\]

  - 重做上一次 commit，并包括指定文件的新变化

    \$ git commit --amend \[file1\]\[file2\] ...

- 分支
  - 列出所有本地分支

    \$ git branch

  - 列出所有远程分支

    \$ git branch -r

  - 列出所有本地分支和远程分支

    \$ git branch -a

  - 新建一个分支，但依然停留在当前分支

    \$ git branch \[branch-name]

  - 新建一个分支，并切换到该分支

    \$ git checkout -b \[branch]

  - 新建一个分支，指向指定 commit

    \$ git branch \[branch]\[commit]

  - 新建一个分支，与指定的远程分支建立追踪关系

    \$ git branch --track \[branch\]\[remote-branch\]

  - 切换到指定分支，并更新工作区

    \$ git checkout \[branch-name\]

  - 切换到上一个分支

  \$ git checkout -

  - 建立追踪关系，在现有分支与指定的远程分支之间

    \$ git branch --set-upstream \[branch\]\[remote-branch\]

  - 合并指定分支到当前分支

    \$ git merge \[branch\]

  - 选择一个 commit，合并进当前分支

    \$ git cherry-pick \[commit\]

  - 删除分支

    \$ git branch -d \[branch-name\]

  - 删除远程分支

    \$ git push origin --delete \[branch-name\]
  
    \$ git branch -dr \[remote/ branch\]

- 标签
  - 列出所有 tag

    \$ git tag

  - 新建一个 tag 在当前 commit

    \$ git tag \[tag\]

  - 新建一个 tag 在指定 commit

    \$ git tag \[tag\]\[commit\]

  - 删除本地 tag

    \$ git tag -d \[tag\]

  - 删除远程 tag

    \$ git push origin :refs/tags/\[tagName\]

  - 查看 tag 信息

    \$ git show \[tag\]

  - 提交指定 tag

    \$ git push \[remote\]\[tag\]

  - 提交所有 tag

    \$ git push \[remote\] --tags

  - 新建一个分支，指向某个 tag

    \$ git checkou5t -b \[branch\]\[tag\]

- 查看信息
  - 显示有变更的文件

  \$ git status

  - 显示当前分支的版本历史

    \$ git log

  - 显示 commit 历史，以及每次 commit 发生变更的文件

    \$ git log --stat

  - 搜索提交历史，根据关键词

    \$ git log -S \[keyword\]

  - 显示某个 commit 之后的所有变动，每个 commit 占据一行

    \$ git log \[tag\] HEAD --pretty=format:%s

  - 显示某个 commit 之后的所有变动，其"提交说明"必须符合搜索条件

    \$ git log \[tag\] HEAD --grep feature

  - 显示某个文件的版本历史，包括文件改名

    $ git log --follow \[file\]
    $ git whatchanged \[file\]

  - 显示指定文件相关的每一次 diff

    \$ git log -p \[file\]

  - 显示过去 5 次提交

    \$ git log -5 --pretty --oneline

  - 显示所有提交过的用户，按提交次数排序

    \$ git shortlog -sn

  - 显示指定文件是什么人在什么时间修改过

    \$ git blame \[file\]

  - 显示暂存区和工作区的差异

    \$ git diff

  - 显示暂存区和上一个 commit 的差异

    \$ git diff --cached \[file\]

  - 显示工作区与当前分支最新 commit 之间的差异

    \$ git diff HEAD

  - 显示两次提交之间的差异

    \$ git diff \[first-branch\]...\[second-branch\]

  - 显示今天你写了多少行代码

    \$ git diff --shortstat "@{0 day ago}"

  - 显示某次提交的元数据和内容变化

    \$ git show \[commit\]

  - 显示某次提交发生变化的文件

    \$ git show --name-only \[commit\]

  - 显示某次提交时，某个文件的内容

    \$ git show \[commit\]:\[filename\]

  - 显示当前分支的最近几次提交

    \$ git reflog

- 远程同步
  - 下载远程仓库的所有变动

  \$ git fetch \[remote\]

  - 显示所有远程仓库

  \$ git remote -v

  - 显示某个远程仓库的信息

  \$ git remote show \[remote\]

  - 增加一个新的远程仓库，并命名

  \$ git remote add \[shortname\]\[url\]

  - 取回远程仓库的变化，并与本地分支合并

  \$ git pull \[remote\]\[branch\]

  - 上传本地指定分支到远程仓库

  \$ git push \[remote\]\[branch\]

  - 强行推送当前分支到远程仓库，即使有冲突

  \$ git push \[remote\] --force

  - 推送所有分支到远程仓库

  \$ git push \[remote\] --all

- 撤销
  - 恢复暂存区的指定文件到工作区

    \$ git checkout \[file\]

  - 恢复某个 commit 的指定文件到暂存区和工作区

    \$ git checkout \[commit\]\[file\]

  - 恢复暂存区的所有文件到工作区

    \$ git checkout .

  - 重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变

    \$ git reset \[file\]

  - 重置暂存区与工作区，与上一次 commit 保持一致

    \$ git reset --hard

  - 重置当前分支的指针为指定 commit，同时重置暂存区，但工作区不变

    \$ git reset \[commit\]

  - 重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致

    \$ git reset --hard \[commit\]

  - 重置当前 HEAD 为指定 commit，但保持暂存区和工作区不变

    \$ git reset --keep \[commit\]

  - 新建一个 commit，用来撤销指定 commit, 后者的所有变化都将被前者抵消，并且应用到当前分支

    \$ git revert \[commit\]

  - 暂时将未提交的变化移除，稍后再移入

    \$ git stash
    \$ git stash pop

  - 生成一个可供发布的压缩包

    \$ git archive

# git rebase 
1. 合并多个 commit 为一个完整 commit
  
    ```git rebase -i [startpoint][endpoint]```
2. 将某一段 commit 粘贴到另一个分支上
  
    ```git rebase   [startpoint]   [endpoint]  --onto  [branchName]```

# Git 使用规范流程
1. 新建分支

  ```
  # 获取主干最新代码

  $ git checkout master
  $ git pull

  # 新建一个开发分支 myfeature

  \$ git checkout -b myfeature
  ```

2. 提交分支 commit
  ```
  $ git add --all
  $ git status
  $ git commit --verbose // git commit 命令的 verbose 参数，会列出 diff 的结果。
  ```

3. 撰写提交信息
  提交 commit 时，必须给出完整扼要的提交信息，下面是一个范本。

  ```
  Present-tense summary under 50 characters
  - More information about commit (under 72 characters).
  - More information about commit (under 72 characters).
  http://project.management-system.com/ticket/123
  ```

4. 与主干同步
  ```
  $ git fetch origin 
  $ git rebase origin/master
  ```

5. 合并 commit
  ```
  \$ git rebase -i origin/master
  ```
  - pick：正常选中
  - reword：选中，并且修改提交信息；
  - edit：选中，rebase 时会暂停，允许你修改这个 commit（参考这里）
  - squash：选中，会将当前 commit 与上一个 commit 合并
  - fixup：与 squash 相同，但不会保存当前 commit 的提交信息
  - exec：执行其他 shell 命令
6. 推送到远程仓库
  - \$ git push --force origin myfeature
7. 发出 Pull Request
  - 提交到远程仓库以后，就可以发出 Pull Request 到 master 分支，然后请求别人进行代码 review，确认可以合并到 master。
