const btn = document.querySelector('.talk');
const content = document.querySelector('.content');



function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}



function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour >= 0 && hour < 12){
        speak("Good Morning");
    }
    else if(hour >= 12 && hour < 18){
        speak("Good Afternoon");
    }
    else{
        speak("Good Evening");
    }
}


window.addEventListener('load', () => {
   speak("Initialing the AI, Hello I am MACRO");
   wishMe();

});


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();


recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}




btn.addEventListener('click', () => {
    recognition.start();
    content.textContent = "Listening...";

});



function takeCommand(message){
    if(message.includes('hello' || 'hi' || 'hey')){
        speak("Hello, How can I help you?");
    }
    else if(message.includes('how are you')){
        speak("I am fine, Thank you for asking");
    }
    else if(message.includes('what is your name')){
        speak("I am AI, Your personal assistant");
    }
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open NRI")) {
        window.open("https://www.nrigroupindia.com/", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }

}