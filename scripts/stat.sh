#!/bin/sh

# VARS
TOTAL_CURRENT_BOOK_WORD_COUNT=0

# FUNCTIONS

revert_to_master() {
  git checkout master --quiet
}

extract_commit_date() {
  echo $1 | awk '{print $2 " " $3 " " $4 " " $6}'
}

# NOTE: The problem with this is that it does not diff the word count between the dates,
# therefore it adds the total, producing an inflated, inaccurate amount.

# accumulative_commit_word_stats_by_date() {
#   REPO_COMMITS=$(git log --pretty=format:"%h%x09%ad%x09%s\n")

#   CURRENT_DATE=$(extract_commit_date "$repo_commit_id_with_date")
#   DATE_WORD_TOTAL=0

#   echo $REPO_COMMITS | while read -r repo_commit_id_with_date
#   do
#     REPO_COMMIT_ID=$(echo $repo_commit_id_with_date | awk '{print $1}')
#     git checkout $REPO_COMMIT_ID --quiet

#     REPO_COMMIT_DATE=$(extract_commit_date "$repo_commit_id_with_date")

#     if [[ $CURRENT_DATE = $REPO_COMMIT_DATE ]]
#     then
#       for chapter_file in $(ls ./chapters)
#       do
#         DATE_CHAPTER_WORD_COUNT=$(wc -w ./chapters/$chapter_file | awk '{print $1}')
#         echo $DATE_CHAPTER_WORD_COUNT
#         DATE_WORD_TOTAL=$(($DATE_WORD_TOTAL + $DATE_CHAPTER_WORD_COUNT))
#       done
#     else
#       echo "$REPO_COMMIT_DATE - Word Count - $DATE_WORD_TOTAL"

#       DATE_WORD_TOTAL=0
#       CURRENT_DATE=$(extract_commit_date "$repo_commit_id_with_date")
#     fi
#   done
# }

accumulative_commit_word_stats() {

  # REPO_COMMITS=$(git log --reverse --oneline --quiet)
  REPO_COMMITS=$(git log --reverse --pretty=format:"%h%x09%ad%x09%s\n")
  # CURRENT_DATE="NA"

  echo $REPO_COMMITS | while read -r repo_commit_id_with_date
  do
    REPO_COMMIT_ID=$(echo $repo_commit_id_with_date | awk '{print $1}')
    # REPO_COMMIT_DATE=$(echo $repo_commit_id_with_date | awk '{print $2 " " $3 " " $4 " " $6}')

    git checkout $REPO_COMMIT_ID --quiet
    TOTAL_COMMIT_WORD_TOTAL=0

    # TODO: How do I get this to wc while ignoring all HTML comments?
    # Maybe it's about using sed with a regex to filter out all cases with HTML comments.

    for chapter_file in $(ls ./chapters)
    do
      # COMMIT_CHAPTER_WORD_COUNT=$(cat ./chapters/$chapter_file | sed 's/  <!--[^>]*-->//g' | wc -w | awk '{print $1}')
      COMMIT_CHAPTER_WORD_COUNT=$(cat ./chapters/$chapter_file | sed 's/^#* .*//g' | wc -w | awk '{print $1}')
      # COMMIT_CHAPTER_WORD_COUNT=$(wc -w ./chapters/$chapter_file | awk '{print $1}')

      TOTAL_COMMIT_WORD_TOTAL=$(($TOTAL_COMMIT_WORD_TOTAL + $COMMIT_CHAPTER_WORD_COUNT))
    done

    # if [[ $CURRENT_DATE != $REPO_COMMIT_DATE ]]
    # then
      echo $TOTAL_COMMIT_WORD_TOTAL
      # echo $REPO_COMMIT_DATE
      # CURRENT_DATE=$REPO_COMMIT_DATE
    # fi
  done
}

# It would be cool to do this per git command as well.
latest_total_branch_stats() {
  for chapter_file in $(ls ./chapters)
  do
    # CHAPTER_WORD_COUNT=$(cat ./chapters/$chapter_file | sed 's/  <!--[^>]*-->//g' | wc -w | awk '{print $1}')
    CHAPTER_WORD_COUNT=$(cat ./chapters/$chapter_file | sed 's/^#* .*//g' | wc -w | awk '{print $1}')


    TOTAL_CURRENT_BOOK_WORD_COUNT=$(($TOTAL_CURRENT_BOOK_WORD_COUNT + $CHAPTER_WORD_COUNT))
    echo "$chapter_file - Word Count: $CHAPTER_WORD_COUNT"
  done
  echo "Total book word count - $TOTAL_CURRENT_BOOK_WORD_COUNT"
}

# NOTE: Not tested at all, so no idea.
# latest_total_branch_stats_for_each_commit() {
#   REPO_COMMITS=$(git log --reverse --oneline --quiet | awk '{print $1}')

#   for repo_commit_id in $REPO_COMMITS
#   do
#     git checkout $repo_commit_id --quiet
#     latest_total_branch_stats
#   done
# }

# NOTE: This is technically not possibly, given that the file names change and are not concrete in the slightest.

# per_file_commit_stats() {
#   REPO_COMMITS=$(git log --reverse --oneline --quiet | awk '{print $1}')

#   for file in $(ls chapters)
#   do
#     for repo_commit_id in $REPO_COMMITS
#     do
#       git checkout $repo_commit_id --quiet
#       COMMIT_CHAPTER_WORD_COUNT=$(wc -w ./chapters/$file | awk '{print $1}')
#       echo $
#     done

#     echo "Commits for $file"
#     for file_commit_id in $FILE_COMMITS
#     do
#       echo $file_commit_id
#     done
#   done
# }

main() {
  revert_to_master

  # per_file_commit_stats
  # revert_to_master

  accumulative_commit_word_stats
  revert_to_master

  latest_total_branch_stats
  revert_to_master
}

main

# wc -l : Prints the number of lines in a file.
# wc -w : prints the number of words in a file.
# wc -c : Displays the count of bytes in a file.
# wc -m : prints the count of characters from a file.
# wc -L : prints only the length of the longest line in a file.
