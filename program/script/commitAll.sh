for i in */.git;
do
    echo $i;
    (cd $i/..;
    echo $(pwd);
    if [[ `git status --porcelain` ]];
    then
        echo "changes";
        ../Note/program/script/commit.sh "note" "commit all";
    else
        echo "No changes";
    fi;)
done