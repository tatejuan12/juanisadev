"use client";
import Typewriter from "typewriter-effect";
import ampm from "./CurrentHour";

export const TypewriterGreeting = () => {
  var phrases;
  if (ampm() === "am") {
    phrases = [
      "Good morning",
      "Bom dia",
      "Bonjour",
      "Buenos días",
      "Guten Morgen",
      "Buongiorno",
      "Доброе утро",
      "早安",
      "おはようございます",
    ];
  } else {
    phrases = [
      "Good afternoon",
      "Boa tarde",
      "Bon après-midi",
      "Buenas tardes",
      "Guten Nachmittag",
      "Buon pomeriggio",
      "Добрый день",
      "下午好",
      "こんにちは",
    ];
  }

  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter.pauseFor(500);
        phrases.forEach((phrase, index) => {
          if (index === 0) {
            typewriter.deleteAll().typeString(phrase);
          } else {
            const prevPhrase = phrases[index - 1];
            const commonLength = [...prevPhrase].findIndex(
              (char, i) => char !== phrase[i]
            );
            const charsToDelete = prevPhrase.length - commonLength;
            const remainingPhrase = phrase.slice(commonLength);
            typewriter.deleteChars(charsToDelete).typeString(remainingPhrase);
          }
          if (index < phrases.length - 1) {
            typewriter.pauseFor(5500);
          }
        });
        typewriter.start();
      }}
    />
  );
};
