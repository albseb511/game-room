import React,{useState,useEffect} from 'react'
import useSocket from 'use-socket.io-client';

const ChatRoom = ({name}) => {
    const [users, setUsers] = useState([])
    const [gameRoom, setGameRoom] = useState(['game#123'])
    const [joinStatus, setJoinStatus] = useState(false)
    const [messageVal, setMessageVal]  = useState('')
    const [message, setMessage] = useState('')
    const [allMessages,setAllMessages] = useState([])
    const [timer, setTimer] = useState('')
    const [gameStart,setGameStart] = useState(false)
    

    console.log(allMessages)
    const url = 'localhost:8000'
    const [socket] = useSocket(url);
    console.log(users)
    socket.connect();
    useEffect(() => {
        console.log('adding user')
        socket.emit('add user',name)
      }, name);
    useEffect(()=>{
        if(timer==='GAME STARTING')
            setGameStart(true)

    },[timer])
      useEffect(()=>{
          console.log('adding new message',message,name)
          socket.emit('add message',{message,name})
          setMessageVal('')
      },[message])
         
      const toggleStatus = () =>{
          console.log('updating join status')
        if(joinStatus==false){
            setJoinStatus(true)
            socket.emit('addPlayer',name)
        }
        else{
            setJoinStatus(false)
            socket.emit('removePlayer',name)
        }
      }
      

    socket.on('broadcast', data=>{
        console.log(data)
        switch(data.type){
            case 'newUser':
                    console.log('new user added')
                    setUsers(data.users)
                    setGameRoom(data.game)
                    break
            case 'newMessage':
                    console.log('new message from server')
                    setAllMessages([...allMessages,data])
                    break
            case 'gameRoomUpdate':
                    console.log('new game room added')
                    setGameRoom(data.game)
                    break
            case 'timer':
                    console.log('timer updating',data)
                    setTimer(data.timer)
                    break
        }
        
    })


    socket.on('kickout',data=>{
        if(data===name)
            name=null
    })
    console.log(socket);
    console.log('timer is',timer)
    if(gameStart)
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
                        {users.length!==0?
                            users.map(a=><div class='user-list' key={a}>{a}</div>):
                            <div>No users online</div>}
                    </div>
                </div>
                {/* CHAT ROOM */}
                <div class='messageBox' >
                    <div>
                        CHAT ROOM
                    </div>
                    <div style={{
                                overflow:'scroll',
                                height:150
                                }}>
                        {allMessages.map((a,i)=>{
                            return(<div key={i}>{`${a.name}: ${a.message}`}</div>)
                        })}
                    </div>
                    <div>
                        <input onChange={(e)=>setMessageVal(e.target.value.trim())} 
                                id='message' 
                                placeholder='say something'
                                value={messageVal}/>
                        <button onClick={()=>setMessage(messageVal)} >Send</button>
                    </div>
                </div>
                {/* GAME ROOM */}
                <div>
                    <div style={{display:'flex',justifyContent:'space-around'}}></div>
                        <div>GAME ROOM</div>
                        <br/>
                        {joinStatus?"..."+timer:null}
                        
                    <div>
                        
                         {joinStatus?gameRoom.users.map(a=><div key={a}>{a}</div>):null}
                         {!joinStatus?<button onClick={()=>toggleStatus()}>'JOIN GAME'</button>:
                         <button onClick={()=>toggleStatus()}>'EXIT GAME'</button>}
                         
                    </div>
                </div>
            </div>
    )
}

export {ChatRoom}