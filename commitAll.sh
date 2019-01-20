for i in */.git; 
do 
(echo $i; cd $i/..; if [[ `git status --porcelain` ]]; then echo "changes"; ../Note/commit.sh "none" "commit all"; else echo "No changes"; fi;); 
done