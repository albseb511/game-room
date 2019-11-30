import React,{useState,useEffect} from 'react'
import useSocket from 'use-socket.io-client';

const ChatRoom = ({name}) => {
    const [users, setUsers] = useState([])
    const [userGameRoom, setUserGameRoom] = useState(false)
    const [gameRooms, setGameRooms] = useState([])
    const [messageVal, setMessageVal]  = useState('')
    const [message, setMessage] = useState('')
    const [allMessages,setAllMessages] = useState([])
    

    console.log(allMessages)
    const url = 'localhost:8000'
    const [socket] = useSocket(url);
    console.log(users)
    socket.connect();
    useEffect(() => {
        socket.emit('add user',name)
      }, [socket]);
    
      useEffect(()=>{
          console.log('adding new message',message,name)
          socket.emit('add message',{message,name})
          setMessageVal('')
      },[message])
         
    socket.on('broadcast', data=>{
        console.log(data)
        switch(data.type){
            case 'newUser':
                    console.log('new user added')
                    setUsers(data.users)
                    break
            case 'newMessage':
                    console.log('new message from server')
                    setAllMessages([...allMessages,data])
                    break
            case 'gameRoomUpdate':
                    console.log('new game room added')
                    setGameRooms(data.game)
        }
        
    })

    socket.on('kickout',data=>{
        if(data===name)
            name=null
    })
    console.log(socket);
    
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
                    <div>
                        GAME ROOM
                    </div>
                    <div>
                         {gameRooms.length!==0?
                            gameRooms.map(a=><div class='g-room' key={a}>
                                {a} <button onClick={()=>{}}>JOIN</button>
                                </div>):
                            <div>No users online</div>}
                    </div>
                </div>
            </div>
    )
}

export {ChatRoom}