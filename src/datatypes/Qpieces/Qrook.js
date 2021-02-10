import Qpiece from "./Qpiece.js";
import Normal_state from "./NormalState.js";
import QWROOK from "../../models/qwrook.png";


const WHITE = 0;
const BLACK = 1;

class Qrook extends Qpiece{
  constructor(color){
    const s = ["Rook", "Pawn"];
    // const model = new Image();
    // if(color === WHITE) model.src = QWROOK;
    const model = "\u{265C}";
    const secondary_model = "\u{265F}";
    super(s, Normal_state, "Measurement", color, model, secondary_model);
  }
}

export default Qrook;
