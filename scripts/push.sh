
push() {
  git add .
  git commit -m "$1"
  git push
  sh scripts/stat.sh
};

push "$1"
