@echo off
setlocal

set "msgFile=.git_commit_msg.txt"
notepad "%msgFile%"

if not exist "%msgFile%" (
  echo Commit abgebrochen.
  exit /b 1
)

git add .
git commit -F "%msgFile%"
del "%msgFile%"
git push

