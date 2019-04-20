if [ $1 == "a" ]
then
    echo "a";
    for i in */.git; 
    do 
            (echo $i; 
            cd $i/..; 
            git pull;) 
    done;
else 
    echo "single";
    git pull;
fi

