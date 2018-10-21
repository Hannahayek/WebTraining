var textElement = document.querySelector('p');

var changeFontSize = (e) => {      
  console.log(e);
  
  document.getElementById('text').innerHTML = e.clientX + '<br>' + e.clientY;
}

textElement.addEventListener('mousemove', changeFontSize);