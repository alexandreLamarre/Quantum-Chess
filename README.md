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

- **Rule 1.1** Each Q-piece has a **state space**, **initial state** and **quantum gate(or action)** associated with it:



|Q-piece| State Space | Initial State | Quantum gate/action | Gate/action description | Symbol |
| :---: | :---------: | :-----------: | :-----------------: | :-----------------------------: | :---: |
| Q-pawn |\{Pawn, The piece starting behind it\}| 1.0 Pawn 0.0 Other piece | **Pauli Z**| Quantum phase shift: | a |
| Q-queen | \{Queen, Pawn\} | 1/sqrt(2) Queen 1/sqrt(2) Pawn | **Hadamard gate** | a | a|
| Q-king | \{King\} | 1.0 King | None, just a regular chess king | None | a|
| Q-rook | \{Rook, Pawn\} | 1/sqrt(2) Rook /sqrt(2) Pawn | **Measurement**| Performs the measurement action on a quantum system| a |
| Q-bishop | \{Bishop, Pawn\} | 1/sqrt(2) Bishop 1/sqrt(2) Pawn | **Pauli Y** | a |  a|
| Q- knight | \{Kinght, pawn} | 1/sqrt(2) Kinght 1/sqrt(2) Pawn | **Pauli X** | controlled NOT gate, "swaps" the probability of quantum states|a |



- **Rule 1.2 ** Q-pieces in a mixed state can move in terms of either piece in their state space
  - Example: A Q-rook in a mixed state can move as a rook or pawn

- **Rule 1.3** Q-pieces in a determined state, i.e. where one of the states = 1.0 and the other 0.0, can only move as the piece whose state they are in.
  - Example: A Q-queen with state (0.0 Queen, 1.0 Pawn) can **ONLY** move as a **PAWN**.

 #### Rules pertaining to Quantum entanglement & action of Q-pieces

 - **Rule 2.1** Once a piece has moved it exerts an **area of influence** if it is in a **mixed state**. The area of influence corresponds to the squares where the piece could move. Should any q-pieces be found in that area of influence they will become entagled with the moved piece. The moved piece then applies its quantum gate/ action.

  TODO: ADD EXAMPLE PICTURES

- **Rule 2.2** The order of events every turn are move ---(if captures)----> capture --- (else if in a mixed state) ---> influence -> entanglement -> quantum circuit/action.

- **Rule 2.3** The area of influence, entaglement and quantum circuit/action only apply on the turn the piece is moved.
  - E.g. if a Q-piece moves within a Q-queen's diagonal on a subsequent turn, it does not become entagled with the Q-queen due to Q-queen's area of influence. It only becomes entangled with the Q-queen if Q-queen is within the moved piece's own area of influence.

- **Rule 2.4** A Q-queen cannot become entangled with an opponent's pieces, nor does it exert its quantum circuit/action upon them.

#### Rules pertaining to quantum measurement of Q-pieces

- **Rule 3.1** A Q-piece's state is determined when it performs a capture or is captured itself. (Following the rules of quantum mechanics, entangled Q-pieces with the Q-piece that perform the capture or the Q-piece that is captured are also measured). A Q-piece's state can also be measured within a Q-rook's **area of influence** on the turn it is moved.

- **Rule 3.2** An entangled state of 8 or more pieces collapses, as if due to instability, and becomes measured. (The real reason this rule is implemented is due to **hardware limitations**)

#### Rules pertaining to castling

- **Rule 4.1 **Castling is a legal move in quantum chess and the rules of area of influence, entaglement and quantum circuits apply to the Q-rook the king castles with.

#### Rules pertaining to winning

- **Rule 5.1** The game ends when a player has only one remaining determined state king, that is checkmated. The player whose remaining king is checkmated loses while the other wins.

- **Rule 5.2** The game ends when a player has only one remaining determined state king that is flipped back to a mixed state. The player whose remaining determined state king was flipped to a mixed state loses, while the other wins.

### Refereces
- Nielsen, Michael A., and Isaac Chuang. "Quantum computation and quantum information." (2002): 558-559.

- Chess models, <a href="https://www.freepik.com/vectors/business">Business vector created by macrovector - www.freepik.com</a>
