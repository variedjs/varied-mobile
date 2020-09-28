#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 安装

#npm i

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
 git push -f 'https://github.com/variedjs/varied-mobile.git' master:gh-pages
 git push -f 'https://402341aa5195325dd21cbe646d205481@gitee.com/Wuner/varied-mobile.git' master:gh-pages

cd -
