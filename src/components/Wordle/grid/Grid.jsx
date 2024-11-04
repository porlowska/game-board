import Row from "./Row";

const Grid=({ guess, word, tries})=> {
  return (
    <>
      {new Array(6).fill(0).map((_ , i) => (
        <Row key={i} word={word} guess={guess[i]} isGuessed={i<tries} />
      ))}
    </>
  );
}
export default Grid;
