message="$1: $2";

if [ $# -gt 2 ]
then
    message="
    
    $message $3";
fi

if [ $# -gt 3 ]
then 
    message="$message
    
     $4";
fi

echo $message;


git add -A; 
git commit -m "$message";
git push;