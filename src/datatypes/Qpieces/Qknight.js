import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";

class Qknight extends Qpiece{
  constructor(color){
    const s = new Set(["Knight", "Pawn"], color);
    super(s, Normal_state, "PauliX", color);
  }
}

export default Qknight;
