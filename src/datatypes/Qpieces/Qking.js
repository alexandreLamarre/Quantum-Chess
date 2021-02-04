import Qpiece from "./Qpiece.js";

class Qking extends Qpiece{
  constructor(color){
    const s = new Set(["King"])
    super(s, [1.0], "None", color);
  }
}

export default Qking;
