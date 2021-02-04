import Qpiece from "./Qpiece.js";
import QWKING from "../../models/wking.png";

const WHITE = 0;
const BLACK = 1;

class Qking extends Qpiece{
  constructor(color){
    const s = new Set(["King"])
    const model = new Image();
    if(color === WHITE) model.src = QWKING;
    super(s, [1.0], "None", color, model);
  }
}

export default Qking;
