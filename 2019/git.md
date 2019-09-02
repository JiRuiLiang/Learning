小白三大命令

- `git clone url`   copy项目至本地
- `git checkout 分支名称 `  切换至分支
- `git pull`  拉取最新代码
- `git add *`  将所有文件添加到暂存区
- `git add 文件名称`  将指定文件添加到暂存区
- `git commit -m '上传备注'`  备注修改描述
- `git push`   上传文件

- `git branch` 查看所有分支

## Git 基本概念

**三种工作区域**
1. Git的本地仓库：在.git 目录中
2. 工作区：用户操作目录
3. 暂存区：在.git 目录中
**三种状态**
1. 已提交(committed):该文件已经被安全地保存在本地仓库中
2. 已修改(modified):修改了某个文件，但还没有提交保存
3. 已暂存(staged):把已修改的文件放在下次提交时要保存的清单中

---

## Git分支初识
1. Git中的分支，其实本质上仅仅是个指向commit对象的可变指针。
2. Git会使用master作为分支的默认名字。在若干次提交后，你其实已经有了一个指向最后一次提交对象的master分支，它在每次提交的时候都会自动向前移动
3. Git鼓励在工作流程中频繁使用分支与合并

---

## Git基本操作
**配置用户名和邮件**
打开 git bash ， 配置命令：
git config --global user.name "your name"
git config --global user.email "your email"

**创建版本库**
版本库又名仓库，英文名repository，可以简单理解成一个目录，这个目录里的所有文件都可以被Git管理起来
1. 新建目录初始化
  mkdir testgit
  cd testgit

2. 从当前目录初始化
  $ git init
  查看仓库状态
  git status
  添加到暂存区
  git add fileA fileB fileC ...
  提交到本地仓库
  git commit -m "remarks"
  查看修改内容（工作区和仓库的区别）：
  git diff (file)
  查看版本（参数可以简化版本信息，commit id和备注）：
  git log --pretty=oneline

3. git stash: 备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。
  git stash pop: 从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
  git stash list: 显示Git栈内的所有备份，可以利用这个列表来决定从那个地方恢复。

  git stash clear: 清空Git栈。此时使用gitg等图形化工具会发现，原来stash的那些节点都消失了。

---

## 版本回退
在Git中，用HEAD表示当前版本，也就是最新的提交commit id，上一个版本就是HEAD^,上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
回退到上一个版本：
git reset --hard HEAD^
丢弃工作区的修改（撤销）：
git checkout -- file
删除文件：
1. 正确操作：git rm file git commit -m "remove file"(文件被删除)
2. 操作失误： git checkout -- file(文件被恢复)
查看当前分支：
git branch (-a)
新建分支：
git branch develop(只是新建了一条分支，并未切换)
切换分支
git checkout develop
新建并切换分支：
git checkout -b feature(相当于3.10和3.11两步操作)
合并分支（--no-ff参数，表示禁用Fast forward）：
git checkout develop && git merge feature(把feature分支合并到develop分支)
注：
1. 因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以默认git commit就是往master分支上提交更改。
2. 如果要丢弃一个没有被合并过的分支，可以通过git branch -D <branch> 强行删除
3. 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name;
## Git基本操作---和远程服务器交互（一）
添加远程服务器：
git remote add dcmsStatics4.5git(别名)
http://gitlab.cephchina.com/ccod_project/dcmsstatics4-5git.git
查看远程服务器的相关信息：
git remote -v
git remote show dcmsStatic4.5git
重命名远程仓库：
git remote rename demo test
删除远程仓库：
git remote rm test
注： 由于远程库时空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送到远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
之后，只要本地做了提交，就可以通过命令把本地master分支的最新修改推送至GitLab：
git push dcmsStatic4.5git master
**远程仓库**
从远程仓库获取数据：
- git fetch origin develop --- 只是获取远程仓库的数据至.git目录，并未merge本地
- git merge origin/develop --- 把获取的远程仓库的数据手工merge到当前分支
- git pull origin develop --- 获取远程仓库的数据，并自动merge至当前的分支，相当于以上两步
合并两个不同的项目：
--alllow-unrelated-histories
把本地仓库的内容推送到远程库上：
git push (-u) demo develop (从svn迁移到gitlab 注意路径，要确保路径正确)
注：
从远程分支checkout 出来的本地分支，称为跟踪分支（tracking branch)。跟踪分支时一种和远程分支有直接联系的本地分支。在跟踪分支里输入git push，Git会自行推断应该向哪个服务器的哪个分支推送数据。反过来，在这些分支里运行git pull 会获取所有远程索引，并把它们的数据都合并到本地分支中来。
在克隆仓库时，Git通常会自动创建一个名为master的分支来跟踪origin/master。这正是git push 和 git pull 一开始就能正常工作的原因。当然，你可以随心所欲地设定为其它跟踪分支，比如origin上除了master之外的其它分支。

---

## Git 基本操作：和远程服务器交互（二）
从远程库克隆：
1. 从svn克隆git svn clone 地址
2. 从git远程库上克隆： git clone 地址
在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name

---

## Git标签
Git标签，通常用来给分支做标记，如标记一个版本号。
创建
标签分类
轻量级标签：
git tag <tagname> commit id
带说明标签：
git tag -a <tagname> commit id
git tag -m <msg> <tagname> commit id
带签名的标签（GPG加密，需安装配置）：
git tag -s <tagname> commit id
git tag -u <key-id> commit id
**查看和删除
查看标签：
git tag
git tag -n 
git show <tagname>
删除标签：
git tag -d <tagname>
**共享标签**
向上游版本库提交标签：
git push origin <tagname>
git push origin --tags
删除远程版本库的标签
git push origin :tag2

---

## 补充
如果在不容的分支中都修改了同一个文件的同一部分，Git就无法干净地把两者合到一起Git做了合并，但没有提交，它会停下来等你解决冲突。可以用git status 查阅哪些文件在合并时出现冲突。
Git会在有冲突的文件里加入标准的冲突解决标记，可以通过他们来手工定位并解决这些冲突。
注：
用带参数的git log 也可以看到分支的合并情况：
git log --graph --pretty=oneline --abbrev-commit
冲突标记<<<<<<<(7个<)与=======之间的内容是我的修改，=======与>>>>>>>之间的内容是别人的修改。最简单的编辑冲突的办法，就是直接编辑冲突了的文件，把冲突标记删掉，把冲突解决正确。
**特殊场景**
场景：当接到一个新的bug，急需解决，但是目前工作想保留。
方法：Git还提供了一个stash功能，可以把当前工作现场‘储藏’起来，等以后恢复现场后继续工作：比如你正在dev分支开发，突然接到master上有一个特别急的bug需要解决，这是就可以把dev的工作现场‘储藏’起来

首先‘储藏’dev的工作现场git status，然后从master创建临时分支：
git checkout master
git checkout -b issue-101
现在修复bug,然后提交：
git add readme.md
git commit -m "fix bugg 101"

修复完成后，切换到master分支，并完成合并，最后删除issue-101分支：
git checkout master
git merge --no-ff -m 'merged bug fix 101' issue-101
接着回到dev分支干活了！
git checkout dev
git status
工作区是干净的，刚才的工作现场存到哪去了？用git stash list 命令看看：
git stash list
工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法:
一使用git stash apply 恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；另一种方式是用git stash pop,恢复的同时把stash内容也删了：
git stash pop
再用git stash list查看，就看不到任何stash内容了。你可以多次stash,恢复的时候，先用git stash list查看，然后恢复指定的stash,用命令：
git stash apply stash@{0}

远程分支
提交本地test分支作为远程的develop的分支：
git push origin develop:test
删除远程的test分支，但是本地还会保存的：
git push origin:test

**忽略特殊文件**
我们在开发过程中，有一些文件是不需要提交的，但是git总显示这部分文件会让人不舒服，这时我们就可以通过编辑.gitignore文件来使不需要提交的文件不再提示，编写要忽略的文件，下列内容是java开发者经常用到的
\#java:
*.class
\# My configurations
db.ini
deploy_key_rsa
注：#此为注释，这行内容将被Git忽略
\# 忽略所有.a结尾的文件
*.a
\# 但lib.a除外
！lib.a
\# 仅仅忽略项目根目录下的TODO文件，
/TODO
\# 忽略build/目录下的所有文件
build/
\# 忽略doc/notes.txt
doc/*.txt
配置别名 
git命令可不可以根据自己的特点配置别名呢，当然是可以的，这样做能提高工作效率，下列是一些简单的例子。
git config --global alias.st status (git st=git status)
git config --global alias.co checkout (git co=git checkout)
git config --global alias.ci commit(git ci=git commit)
git config --global alias.br branch ( git br=git branch)
git config --global alias.last 'log -1'(git lat= git log -l)
git config --global alias.unstage 'reset HEAD'(git unstage=git reset HEAD)
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
**切换用户**
查看当前配置（用户）
git config --list
修改配置：打开全局的.gitconfig 文件：vi~/.gitconfig;然后在文件中直接修改。

## git 公钥配置
`git config --global user.name "账号"` 设置登录账号
`git config --global user.email "邮箱"` 设置邮箱
`ssh-keygen -t rsa -C "邮箱"`  生成公钥
`cat ~/.ssh/id_rsa.pub`  查看生成的公钥(手动复制)
在git中打开项目： Settings => Deploy keys => Add deploy key => 将复制的公钥粘贴到 Key输入框里 => Title自由设置 => 选中Allow write access => Add key
**注意：** clone项目需要通过SSH key方式, 不然git提交还是需要输入账号密码

