#!/usr/bin/env sh
set -e
echo "Enter release version(输入发布版本): "
read VERSION

echo "Enter COMMIT TEXT(输入提交提示语): "
read TEXT

read -p "Releasing $VERSION - are you sure? (y/n)(发行 $VERSION -您确定吗？ （是/否）)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  npm version $VERSION --no-git-tag-version
  VERSION=$VERSION npm run build:lib

  # commit
  git tag v$VERSION
  git commit -am $TEXT

  # publish
   git push -f 'https://github.com/variedjs/varied-mobile.git'
   git push -f 'https://402341aa5195325dd21cbe646d205481@gitee.com/Wuner/varied-mobile.git'


  if [[ $VERSION =~ [beta] ]]
  then
    npm publish --tag beta
  else
    npm publish
  fi
fi
