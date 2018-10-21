// em = required / parent 
var Calc =() => {
    var requiredVal=document.getElementById('required').value;
    var parentVal=document.getElementById('parent').value;
    var result=document.getElementById('result');
    
    
    if(!requiredVal | !parentVal){
        alert("Please fill both numbers");
    }
    else
    {
        result.innerHTML=requiredVal / parentVal;
    }
    
}

var btn=document.querySelector('button');
btn.addEventListener('click',Calc);