# Quantum Chess

A web-app that implements a game of chess augmented with quantum rules dictated by underlying quantum circuits.
The backend is written in Golang and its directory can be found [here](https://github.com/alexandreLamarre/Quantum-Chess-Backend)

For those unfamiliar with Quantum mechanics, a brief overview is given in [Quantum Mechanics Overview](#Quantum-Mechanics-Overview) Section

## Table of contents
- [Rules](#Rules)
- [Quantum Mechanics Overview](#Quantum-Mechanics-Overview)
- [References](#References)

### Rules

We wall call the game pieces in Quantum Chess Q-pieces for convenience.
For those unfamiliar with Quantum mechanics, a brief overview is given in Quantum Mechanics.

#### Rules pertaining to the nature & movement of Q-pieces

- **Rule 1.1** Each Q-piece is initially in its own quantum system, which means it is not entangled with any other pieces.

- **Rule 1.2** Each Q-piece has a **state space**, **initial state** and **quantum gate(or action)** associated with it:



|Q-piece| State Space | Initial State | Quantum gate/action | Gate/action description | Symbol |
| :---: | :---------: | :-----------: | :-----------------: | :-----------------------------: | :---: |
| Q-pawn |\{Pawn, The piece starting behind it\}| 1.0 Pawn 0.0 Other piece | **Pauli Z**| Quantum phase shift: Essentially does nothing to affect the measurement probability outcomes | a |
| Q-queen | \{Queen, Pawn\} | 1/sqrt(2) Queen 1/sqrt(2) Pawn | **CNOT + Hadamard** | The control bit in the CNOT is the color of the piece, so that Q-queens only exert their quantum action of pieces of the same color. The Hadamard action "Normalizes" quantum states, in particular takes determined states to evenly probable quantum states | a|
| Q-king | \{King\} | 1.0 King | None, just a regular chess king | None | a|
| Q-rook | \{Rook, Pawn\} | 1/sqrt(2) Rook /sqrt(2) Pawn | **Measurement**| Performs the measurement action on a quantum system | a |
| Q-bishop | \{Bishop, Pawn\} | 1/sqrt(2) Bishop 1/sqrt(2) Pawn | ** SqrtNOT ** | The SqrtNOT performs the NOT operation after two applications: SqrtNOT^2 = NOT |  a|
| Q- knight | \{Kinght, pawn} | 1/sqrt(2) Kinght 1/sqrt(2) Pawn | **Pauli X** | controlled NOT gate, "swaps" the probability of quantum states|a |



- **Rule 1.3** Q-pieces in a mixed state can move in terms of either piece in their state space
  - Example: A Q-rook in a mixed state can move as a rook or pawn

- **Rule 1.4** Q-pieces in a determined state, i.e. where one of the states = 1.0 and the other 0.0, can only move as the piece whose state they are in.
  - Example: A Q-queen with state (0.0 Queen, 1.0 Pawn) can **ONLY** move as a **PAWN**.

 #### Rules pertaining to Quantum entanglement & action of Q-pieces

- **Rule 2.1** A quantum piece exerts its quantum action/circuit on other pieces if and only if it is in a mixed state. (It still exerts its quantum action on itself even if it is determined: A Q-queen is "sel- normalizing" in that respect.)

 - **Rule 2.1** A quantum piece exerts its quantum action/circuit on the tile it has moved to if it is not performing a capture, and exerts its quantum action/circuit on all tiles it could legally reach from its new position. These tiles are called the piece's **'Area of Influence**. A quantum piece will performs its quantum action/circuit on all pieces within its **Area of Influence**, including itself:
 
   - It will perform its action on all determined state pieces within its area of influence. 
   
   - Before performing its action on mixed state pieces it will entangle it with the current piece's system, as long as the mixed state piece would not enter a determined state.
   
   - If the moved piece started in an entangled system, it will apply its action to the new entangled system., with the added mixed state pieces from its area of influence.
   
   - Otherwise, if there are no new mixed state pieces to be added to the entangled system, it will perform its action on its entangled system. Its entangled system can also be itself. In this respect, a mixed state piece exerts its action on itself if its area of influence contains no mixed state pieces and it was not entangled to any other pieces. 


- **Rule 2.2** Here is the flowchart for moving a quantum piece:

    - TODO ADD FLOW CHART

- **Rule 2.3** The area of influence, entaglement and quantum circuit/action only apply on the turn the piece is moved. 

#### Rules pertaining to quantum measurement of Q-pieces

- **Rule 3.1** A Q-piece's state is determined when it performs a capture or is captured itself. (Following the rules of quantum mechanics, entangled Q-pieces with the Q-piece that perform the capture or the Q-piece that is captured are also measured). A Q-piece's state can also be measured within a Q-rook's **area of influence** on the turn it is moved.

- **Rule 3.2** An entangled state of 8 or more pieces collapses, as if due to instability, and becomes measured. It collapses before any quantum circuit can be applied. (The reason this rule is implemented is due to **hardware limitations** and **information transfer speed limitations**)

#### Miscelanious Rules

- **Rule 4.1** Castling is not a legal move.

- **Rule 4.2** Any Q-pawn piece that reaches the end of the board that has a non-zero state of "Pawn" becomes a Q-queen in its initial state. 
Chronologically, this event happens after a capture if it occured, so the piece only becomes a Q-queen if it is measured as a pawn. If the piece is in an entangled state when it arrives at the end of the board, the entangled state collapses and all pieces within it are measured, except the piece that was moved if it had a possibility of being a pawn -- instead it becomes a Q-queen. 

#### Rules pertaining to winning

**There is no checkmate in Quantum Chess**, since there are too many probabilistic ways to end up in check or checkmate. A player could also put himself non-deterministically into check before the end of his turn.

- **Rule 5.1** Instead, winning and losing is determined after pieces have moved, circuits evaluated, measured, etc..., but before the next player's turn. If **one** (of two possible) of the player's
**determined state King** (A Q-piece that has current state King: 1.0) is in check when his or turn is about to end, they lose the game.

- **Rule 5.2** Alternatively, the game can also end when a player has only one remaining determined state king that is flipped back to a mixed state. The player whose remaining determined state king was flipped to a mixed state loses, while the other wins.

### Refereces
- Nielsen, Michael A., and Isaac Chuang. "Quantum computation and quantum information." (2002): 558-559.

- Chess models, <a href="https://www.freepik.com/vectors/business">Business vector created by macrovector - www.freepik.com</a>
