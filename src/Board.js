import React, { Component } from "react";
import { Card } from "./Card";

const cards = [
  { id: "coffee", backFace: "😂", faceUp: false },
  { id: "cake", backFace: "😱", faceUp: false },
  { id: "coke", backFace: "🤖", faceUp: false },
  { id: "apple", backFace: "👽", faceUp: false },
  { id: "owl", backFace: "👻", faceUp: false }
];

const NewGameButton = props => {
  return (
    <button className="new-game" onClick={props.onClick}>
      {props.text}
    </button>
  );
};
class Board extends Component {
  state = {
    board: [],
    matchesToMake: 0,
    cardToMatch: null,
    disableClicks: false,
    isGameOngoing: false
  };

  componentDidMount() {
    this.newGame();
  }

  checkIsMatch = picked => {
    console.log("checking for match");
    let cardToMatch = { ...this.state.cardToMatch };
    let matchesToMake = this.state.matchesToMake;
    let board = [...this.state.board];

    if (cardToMatch.id === picked.id) {
      console.log("it's a match!");
      matchesToMake -= 1;
      cardToMatch = null;
    } else {
      console.log("no match, flip the cards face down");
      board[cardToMatch.index].faceUp = false; //turn card1 over
      board[picked.index].faceUp = false; //turn card2 over
      cardToMatch = null;
    }
    this.setState({ cardToMatch, board, matchesToMake, disableClicks: false });
  };

  flipFaceUp = picked => () => {
    let isGameOngoing = true;

    console.log("picked card", picked);
    let board = [...this.state.board];
    picked.faceUp = true;
    board[picked.index] = picked;
    this.setState({ board, isGameOngoing, disableClicks: true }, () => {
      this.setCardToMatch(picked);
    });
  };

  setCardToMatch = picked => {
    let cardToMatch = this.state.cardToMatch;
    if (!cardToMatch) {
      console.log("first card picked");
      // only one card is picked, so go pick another card
      cardToMatch = picked;
      this.setState({ cardToMatch, disableClicks: false });
    } else {
      this.delayCheckIsMatch(picked);
    }
  };

  delayCheckIsMatch = picked => {
    setTimeout(() => {
      this.checkIsMatch(picked);
    }, 500);
  };

  showLastPair = () => {
    let board = [...this.state.board];
    let matchesToMake = this.state.matchesToMake;
    matchesToMake -= 1;
    let lastFaceDownPair = board.filter(c => !c.faceUp);
    lastFaceDownPair.forEach(c => {
      c.faceUp = true;
      board[c.index] = c;
    });
    this.setState({ board, matchesToMake });
  };

  isOneMatchLeft = () => {
    if (this.state.matchesToMake === 1) {
      this.showLastPair();
    } else {
      return;
    }
  };

  newGame = () => {
    let isGameOngoing = false;
    let deck = [...cards, ...cards].map(o => ({ ...o }));
    // Fisher-Yates-shuffle in place
    let i = 0;
    let j = 0;
    let temp = null;

    for (i = deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    let matchesToMake = deck.length / 2;
    this.setState({ board: deck, isGameOngoing, matchesToMake });
  };

  render() {
    const { isGameOngoing, matchesToMake, disableClicks } = this.state;
    this.isOneMatchLeft();
    const gameResult =
      this.state.matchesToMake === 0 ? (
        <h1 className="win-msg">nice job!</h1>
      ) : null;

    const cards = this.state.board.map((c, i) => (
      <Card
        value={c.id}
        disableClicks={disableClicks}
        flipFaceUp={this.flipFaceUp}
        card={{ ...c, index: `${i}` }}
        key={i}
      />
    ));
    return (
      <div className="Board">
        <header className="App-header">
          {isGameOngoing && (
            <NewGameButton
              onClick={this.newGame}
              text={matchesToMake > 0 ? "restart game" : "play again!"}
            />
          )}
          <h2 className="App-title">matchmaker</h2>
          <h3 className="App-intro">click on a card to begin</h3>
          {gameResult}
        </header>
        <div className="wrapper">
          <section className="memory-game">{cards}</section>
          <div id="container" />
        </div>
      </div>
    );
  }
}
export default Board;
