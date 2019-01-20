for i in */.git; 
do 
( echo $i; cd $i/..; ../Note/commit.sh "none" "commit all";); 
done