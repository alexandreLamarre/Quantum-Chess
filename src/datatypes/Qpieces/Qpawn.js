import Qpiece from "./Qpiece.js";

class Qpawn extends Qpiece{
  /**
  @param piece the string representing the piece that starts behind it
  **/
  constructor(piece, color){
    const s = new Set(["Pawn", piece]);
    super(s, [1.0, 0.0], "PauliZ", color);
  }
}

export default Qpawn;
