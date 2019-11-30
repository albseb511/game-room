import React from "react";
import GameRoom from "./GameRoom";
import io from "socket.io-client";
const socket = io("http://localhost:8000");
socket.connect();

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      gameRoom: ["crap weasel"],
      joinStatus: false,
      messageVal: "",
      message: "",
      allMessages: [],
      timer: "",
      gameStart: false,
      url: "http://localhost:8000"
    };
  }
  sendMessage = () => {
    socket.emit("add message", {
      message: this.state.messageVal,
      name: this.props.name
    });
    this.setState({ messageVal: "" });
  };

  toggleStatus = () => {
    if (this.state.joinStatus === false) {
      socket.emit("addPlayer", this.state.name);
    } else {
      socket.emit("removePlayer", this.state.name);
    }
    this.setState({ joinStatus: !this.state.joinStatus });
  };

  componentDidMount() {
    socket.emit("add user", this.props.name);

    socket.on("broadcast", data => {
      switch (data.type) {
        case "newUser":
          this.setState({ users: data.users });
          break;
        case "newMessage":
          this.setState({ allMessages: [...this.state.allMessages, data] });
          break;
        case "gameRoomUpdate":
          this.setState({ gameRoom: data.game });
          break;
        case "timer":
          this.setState({ timer: data.timer });
          break;
      }
    });
  }
  render() {
    if (this.state.timer === "GAME STARTING")
      return <GameRoom userId={this.props.name} />;
    else
      return (
        <div id="room">
          {/* USERS */}
          <div>
            <div>USERS</div>
            <div>
              {this.state.users.length !== 0 ? (
                this.state.users.map(a => (
                  <div class="user-list" key={a}>
                    <div class="round"></div>
                    {a}
                  </div>
                ))
              ) : (
                <div>No users online</div>
              )}
            </div>
          </div>
          {/* CHAT ROOM */}
          <div class="messageBox">
            <div>CHAT ROOM</div>
            <div class="msgbox">
              {this.state.allMessages.map((a, i) => {
                return <div key={i}>{`${a.name}: ${a.message}`}</div>;
              })}
            </div>
            <div id="msg-input">
              <input
                onChange={e =>
                  this.setState({ messageVal: e.target.value.trim() })
                }
                id="message"
                placeholder="say something"
                value={this.state.messageVal}
              />
              <button class="osxbutton" onClick={() => this.sendMessage()}>
                Send
              </button>
            </div>
          </div>
          {/* GAME ROOM */}
          <div>
            <div
              style={{ display: "flex", justifyContent: "space-around" }}
            ></div>
            <div>GAME ROOM</div>
            <br />
            {this.state.joinStatus ? "..." + this.state.timer : null}

            <div>
              {/* {this.state.joinStatus
                ? this.state.gameRoom.map(a => <div key={a}>{a}</div>)
                : null} */}
              {!this.state.joinStatus ? (
                <button class="osxbutton" onClick={() => this.toggleStatus()}>
                  'JOIN GAME'
                </button>
              ) : (
                <button class="osxbutton" onClick={() => this.toggleStatus()}>
                  'EXIT GAME'
                </button>
              )}
            </div>
          </div>
        </div>
      );
  }
}

export { ChatRoom };
