#!/bin/sh

# FUNCTIONS

extract_commit_information () {
  ls
}

revert_to_master() {
  git checkout master --quiet
}

latest_branch_stats() {
  TOTAL_WORD_COUNT=0

  for chapter_file in $(ls chapters)
  do
    CHAPTER_WORD_COUNT=$(wc -w ./chapters/$chapter_file | awk '{print $1}')
    TOTAL_WORD_COUNT=$(($TOTAL_WORD_COUNT + $CHAPTER_WORD_COUNT))

    echo "$chapter_file - Word Count: $CHAPTER_WORD_COUNT"
  done

  echo "Total book word count - $TOTAL_WORD_COUNT"
}

accumulative_commit_word_stats() {
  REPO_COMMITS=$(git log --reverse --oneline | awk '{print $1}')

  for repo_commit_id in $REPO_COMMITS
  do
    git checkout $repo_commit_id --quiet
    COMMIT_WORD_TOTAL=0

    for chapter_file in $(ls chapters)
    do
      COMMIT_CHAPTER_WORD_COUNT=$(wc -w ./chapters/$chapter_file | awk '{print $1}')
      COMMIT_WORD_TOTAL=$(($COMMIT_WORD_TOTAL + $COMMIT_CHAPTER_WORD_COUNT))
    done

    echo $COMMIT_WORD_TOTAL
  done
}

revert_to_master

# The intention of this file is to create statistics on the amount of work that has taken place, so I can get an accurate sense of things.

# Per file commit stats

# for file in $(ls chapters)
# do
#   FILE_COMMITS=$(git log --reverse --oneline ./chapters/$file | extract_commit_id)
#   echo "Commits for $file"
#   for file_commit_id in $FILE_COMMITS
#   do
#     echo $file_commit_id
#   done
# done

revert_to_master

accumulative_commit_word_stats
revert_to_master

# latest_branch_stats
# revert_to_master


# wc -l : Prints the number of lines in a file.
# wc -w : prints the number of words in a file.
# wc -c : Displays the count of bytes in a file.
# wc -m : prints the count of characters from a file.
# wc -L : prints only the length of the longest line in a file.
