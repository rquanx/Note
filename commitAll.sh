for i in */.git; 
do 
( echo $i; cd $i/..; ../Note/commit.sh "none" "commit all"; ); 
done

# if [[ `git status --porcelain` ]]; then echo "Changes"; else echo "No changes"; fi;