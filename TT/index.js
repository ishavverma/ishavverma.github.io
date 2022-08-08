const btn=document.querySelector('.talk');
const content= document.querySelector('.content');



try{//If browser supports the speech recognition feature.
	const SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition=new SpeechRecognition(); //The recognition variable will give us access to all the API's methods and properties. 
}
catch(e){
	console.error(e);
	alert("No browser support. Try Opening This Demo In Google Chrome !");
};


recognition.onstart = function() {//voice recognition activated.
  console.log('Voice recognition activated. Try speaking into the microphone.');
};

recognition.onspeechend = function() {//You were quiet for a while so voice recognition turned itself off.
  instructions.text('You were quiet for a while so voice recognition turned itself off.');
};

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {//If the speech was not detected.
    instructions.text('No speech was detected. Try again.');  
  }
};

recognition.onresult=function(event){
	const current=event.resultIndex;
	const transcript=event.results[currnet][0].transcript;
	const.textContent=transcript;
	readOutLoud(transcript);
};

btn.addEventListener('click', ()=>{
	recognition.start();
});
  

function readOutLoud(message){//passing the transcript into this funtion.
	const speech= new SpeechSyntesisUtterance();
	speech.text=message;
	speech.volume=1;
	speech.rate=1;
	speech.pitch=0.222;

	window.SpeechSyntesis.speak(speech);
}