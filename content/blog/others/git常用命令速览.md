---
tags:
- CheatSheet
categories: others
title: Git常用命令速览
date: 2019-08-12T00:00:00.000+08:00
excerpt: Git命令的CheatSheet
thumbnail: ''

---
### git基本概念

### 设置git信息
- `git config --global user.name "[name]"`
  设置提交时的用户名
- `git config --global user.email "[email]"`
  设置提交时的用户邮箱
- `git config --global color.ui auto`
  设置命令行颜色

### 新建仓库
- `git init [project-name]`
  代码文件夹初始化git
- `git clone [url]`
  克隆项目仓库（包含整个版本信息）

### 修改
- `git status`
  列出所有即将被提交的新建和更改的文件
- `git diff`
  显示所有未加入暂存区的差异
- `git add [file]`
  1. git add -A: [`<path>`]表示把`<path>`中所有tracked文件中被修改过或已删除文件和所有untracted的文件信息添加到索引库。
  2. git add -i: [`<path>`]查看`<path>`中被所有修改过或已删除文件但没有提交的文件，并通过其revert子命令可以查看`<path>`中所有untracted的文件，同时进入一个子命令系统。
- `git diff --staged`
  显示暂存区文件与最新文件版本的差异
- `git reset [file]`
  取消文件暂存，但保留其内容
- `git commit -m "[descriptive message]"`
  1. `-m`指后面可以直接输入message，否则需要调用编辑器
  2. `-a`命令后，与单独执行`git add`类似，但不会将新文件加入暂存区，因而不推荐使用
  3. `-v`命令可以在提交时显示所有diff信息

### 分工协作
- `git branch`
  默认无参数时，列出所有本地的当前仓库的分支
- `git branch [branch-name]`
  在本地创建一个新的分支
- `git checkout [branch-name]`
  切换到指定的分支并更新当前工作区
- `git merge [branch]`
  将指定分支的代码历史拼合到当前分支
- `git branch -d [branch-name]`
  删除指定的分支（慎用）

### 文件编辑
- `git rm [file]`
  将文件从当前工作区删除，暂存删除操作
- `git rm --cached [file]`
  将文件从版本控制中移除，但本地保留文件
- `git mv [file-original] [file-renamed]`
  修改文件名称，准备提交

### 跟踪设置
- `.gitignore`
  设置当前目录下版本控制自动忽略的文件，后缀或指定文件夹均可 
- `git ls-files --other --ignored --exclude-standard`
  列出当前项目下所有忽略的文件

### 碎片储存
- `git stash`
  临时保存所有的已跟踪的修改，以下命令都可以通过传入@n删除指定的更改
- `git stash pop`
  恢复最近一次暂存的修改，并从栈中移除
- `git stash list`
  列出栈中所有已暂存的修改条目
- `git stash drop`
  直接放弃最近一次暂存的更改

### 查看历史
- `git log`
  列出当前分支的版本历史
- `git log --follow [file]`
  列出指定的文件的版本历史，包括重命名
- `git diff [first-branch]...[second-branch]`
  显示两个分支的内容差异
- `git show [commit]`
  输出指定提交的metadata以及内容变化

### 撤销操作
- `git reset [commit]`
  撤销指定`[commit]`后所有的提交，保留本地更改
- `git reset --hard [commit]`
  删除所有的更改和历史，回退到指定的`[commit]`

### 同步更改
- `git fetch [bookmark]`
  下载从`[bookmark]`所有的更改历史
- `git merge [bookmark]/[branch]`
  组合`[bookmark]`分支到当前分支
- `git push [alias] [branch]`
  上传所有本地分支的提交到git服务器
- `git pull`
  下载书签历史以及非协作变化