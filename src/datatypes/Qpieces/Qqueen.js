import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";

class Qqueen extends Qpiece{
  constructor(color){
    const s = new Set(["Queen", "Pawn"]);
    super(s, Normal_state, "Hadamard", color);
  }
}

export default Qqueen;
