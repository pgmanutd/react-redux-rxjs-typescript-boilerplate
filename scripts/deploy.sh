#!/bin/bash

grep_output=`grep -IUlr $'\r' --exclude=*.log --exclude-dir={node_modules,coverage,.nyc_output,.git,logs,.idea,.vscode,dist,dest}`

if [ "$grep_output" != "" ]; then
  dos2unix ${grep_output}
fi

yarn build

rm -rf docs

cp -R dist/. docs/

# deploy to git
git add --all
git commit -a
git push origin master
