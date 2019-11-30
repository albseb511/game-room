import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
const socket = io("http://localhost:8000");
socket.connect();

class ChatRoom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            users:[],
            gameRoom:[],
            joinStatus:false,
            messageVal:'',
            message:'',
            allMessages:[],
            timer:'',
            gameStart:false,
            url:'http://localhost:8000'
        }
    }
    sendMessage =()=>{
        console.log('adding new message',this.state.messageVal,this.props.name)
        socket.emit('add message',{message:this.state.messageVal,name:this.props.name})
        this.setState({messageVal:''})
    }

    toggleStatus = () =>{
        console.log('updating join status')
      if(this.state.joinStatus==false){
          socket.emit('addPlayer',this.state.name)
      }
      else{
          socket.emit('removePlayer',this.state.name)
      }
      this.setState({joinStatus:!this.state.joinStatus})
    }

    componentDidMount(){
        socket.emit('add user',this.props.name)

        socket.on('broadcast', data=>{
            console.log(data)
            switch(data.type){
                case 'newUser':
                        console.log('new user added')
                        this.setState({users:data.users})
                        break
                case 'newMessage':
                        console.log('new message from server')
                        this.setState({allMessages:[...this.state.allMessages,data]})
                        break
                case 'gameRoomUpdate':
                        console.log('new game room added')
                        this.setState({gameRoom:data.game})
                        break
                case 'timer':
                        console.log('timer updating',data)
                        this.setState({timer:data.timer})
                        break
            }
            
        })
    }
    render(){
            if(this.state.gameStart)
            return(<div>GAME IS STARTING</div>)
        else
        return(
                <div id='room'>
                    {/* USERS */}
                    <div>
                        <div>
                            USERS
                        </div>
                        <div>
                            {this.state.users.length!==0?
                                this.state.users.map(a=><div class='user-list' key={a}><div class='round'></div>{a}</div>):
                                <div>No users online</div>}
                        </div>
                    </div>
                    {/* CHAT ROOM */}
                    <div class='messageBox' >
                        <div>
                            CHAT ROOM
                        </div>
                        <div class='msgbox'>
                            {this.state.allMessages.map((a,i)=>{
                                return(<div key={i}>{`${a.name}: ${a.message}`}</div>)
                            })}
                        </div>
                        <div id='msg-input'>
                            <input onChange={(e)=>this.setState({messageVal:e.target.value.trim()})} 
                                    id='message' 
                                    placeholder='say something'
                                    value={this.state.messageVal}/>
                            <button class='osxbutton' onClick={()=>this.sendMessage()} >Send</button>
                        </div>
                    </div>
                    {/* GAME ROOM */}
                    <div>
                        <div style={{display:'flex',justifyContent:'space-around'}}></div>
                            <div>GAME ROOM</div>
                            <br/>
                            {this.state.joinStatus?"..."+this.state.timer:null}
                            
                        <div>
                            
                             {this.state.joinStatus?this.state.gameRoom.users.map(a=><div key={a}>{a}</div>):null}
                             {!this.state.joinStatus?<button class='osxbutton' onClick={()=>this.toggleStatus()}>'JOIN GAME'</button>:
                             <button class='osxbutton' onClick={()=>this.toggleStatus()}>'EXIT GAME'</button>}
                             
                        </div>
                    </div>
                </div>
        )
    }
}

export {ChatRoom}