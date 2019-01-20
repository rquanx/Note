# 写入type和subject
message="$1: $2";
# 写入body
if [ $# -gt 2 ]
then
    message="$message 
    
$3";
fi

# 写入foot
if [ $# -gt 3 ]
then 
    message="$message
    
$4";
fi

echo $message;


git add -A; 
git commit -m "$message";
git push;