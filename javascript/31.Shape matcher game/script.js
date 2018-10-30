
//let is vairable for blocks, var is globale
let currentValue=0;
let playing=false;
let shape1;
let shape2;
const matchBtn=document.getElementById('match');
const shapes=[
{color:'#FF59FE',width:'250',height:'160'},
{color:'#FF59FE',width:'270',height:'150'},
{color:'#FFCA3A',width:'320',height:'170'},
{color:'#FFCA3A',width:'310',height:'180'},
{color:'#8AC926',width:'190',height:'160'},
{color:'#8AC926',width:'200',height:'175'},
{color:'#1982C4',width:'380',height:'185'},
{color:'#1982C4',width:'400',height:'120'},
{color:'#6A4C93',width:'370',height:'145'},
{color:'#6A4C93',width:'440',height:'160'},

]

const selectRandomShape =() =>{
const randomNum=Math.floor((Math.random()*shapes.length));
const randomSelection=shapes[randomNum];
return randomSelection;
}


const repeatShape=()=>{

//this function will keep running so we put it inside function to be called
setInterval(()=>{
    shape1=selectRandomShape();
    shape2=selectRandomShape();
    matchBtn.disabled=false;
   
    const shape1Style=`width:${shape1.width+"px"};
                     background:${shape1.color};
                     height:${shape1.height+"px"}; 
                     `  //note there is ` here 


const shape2Style2=`width:${shape2.width+"px"};
                     background:${shape2.color};
                     height:${shape2.height+"px"}; 
                     `//note there is ` here 


                     document.getElementById('shape1').style.cssText=shape1Style;
                     document.getElementById('shape2').style.cssText=shape2Style2;
    },1000);
}

//start game, click handler
document.getElementById('play').onclick=()=>{
playing=true;
//diable the play button when playing
    document.getElementById('play').disabled=true;

    repeatShape();
}
//compare
document.getElementById('match').onclick=() =>{
if(playing){
    matchBtn.disabled=true; //we disable the button after click , and enabled after new shapre generated
if(Object.is(shape1,shape2)){//new feature in java scrip to compare objects
currentValue++;
document.getElementById('score').innerHTML=currentValue;
}
else{
    currentValue--;
    document.getElementById('score').innerHTML=currentValue;
}
}

}



