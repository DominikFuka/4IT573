function genRandomAnswer(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

{
  const answer = genRandomAnswer(1, 10);
  const maxGuesses = 3;
  let numGuesses = 0;

  while (numGuesses <= 2) {
    let guess = prompt(
      "Uhodni cele cislo od 1 do 10. Mas 3 pokusy. Tvuj pokus je:"
    );
    if (guess != null) {
      numGuesses++;
      if (answer == guess) {
        console.log("Gratulace, uhodl jsi nahodne cislo!");
        break;
      } else {
        console.log(
          "To neni spravne. Zbyva " + (maxGuesses - numGuesses) + " pokusu."
        );
      }
    }
  }
}
