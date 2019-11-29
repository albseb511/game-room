import React,{useState} from 'react'

const ChatRoom = () => {
    const [users, setUsers] = useState(['albert','nrupul','soumya'])
    const [gameRooms, setGameRooms] = useState(['game#123','game#123','game#123'])
    return(
            <div id='room'>
                <div>
                    <div>
                        CHAT ROOM
                    </div>
                    <div>
                        {users.length!==0?
                            users.map(a=><div class='user-list' key={a}>{a}</div>):
                            <div>No users online</div>}
                    </div>
                </div>
                <div>
                    MESSAGES
                </div>
                <div>
                    <div>
                        GAME ROOM
                    </div>
                    <div>
                         {gameRooms.length!==0?
                            gameRooms.map(a=><div class='g-room' key={a}>
                                {a} <button>JOIN</button>
                                </div>):
                            <div>No users online</div>}
                    </div>
                </div>
            </div>
    )
}

export {ChatRoom}