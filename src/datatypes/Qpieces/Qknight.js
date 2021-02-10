import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";
import QWKNIGHT from "../../models/qwknight.png";

const WHITE = 0;
const BLACK = 1;

class Qknight extends Qpiece{
  constructor(color){
    const s = ["Knight", "Pawn"];
    // const model = new Image();
    // if(color === WHITE) model.src = QWKNIGHT;
    const model = "\u{265E}";
    const secondary_model = "\u{265F}";
    super(s, Normal_state, "PauliX", color, model, secondary_model);
  }
}

export default Qknight;
