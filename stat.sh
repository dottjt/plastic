#!/bin/sh

# The intention of this file is to create statistics on the amount of work that has taken place, so I can get an accurate sense of things.

# Per file

# for file in $(ls chapters)
# do
#   FILE_COMMITS=$(git log --oneline ./chapters/$file | sed 's/ .*//')
#   echo "Commits for $file"
#   for file_commit_id in $FILE_COMMITS
#   do
#     echo $file_commit_id
#   done
# done

# Per commit

REPO_COMMITS=$(git log --oneline ./chapters/${file} | sed 's/ .*//')
for repo_commit_id in $REPO_COMMITS
do
  echo $repo_commit_id
  git checkout $repo_commit_id
done

# echo $REPO_COMMITS

git checkout master




