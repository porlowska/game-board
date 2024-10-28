import Row from "./Row";

export default function Grid({ guess, word, tries}) {
   console.log(guess)
  return (
    <>
      {new Array(6).fill(0).map((x , i) => (
        <Row key={i} word={word} guess={guess[i]} isGuessed={i<tries}  />
      ))}
    </>
  );
}
