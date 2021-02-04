import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";

class Qrook extends Qpiece{
  constructor(color){
    const s = new Set(["Rook", "Pawn"]);
    super(s, Normal_state, "Measurement", color);
  }
}

export default Qrook;
