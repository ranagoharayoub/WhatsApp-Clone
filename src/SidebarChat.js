import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import db from './Firebase'
import './SidebarChat.css'



function SidebarChat({ AddNewChat,id,name, message}) {

    const createChat = () =>{
       const chat_name = prompt('enter chat name')

       if(chat_name!== ''){
        db.collection('chat_room').add({
            chat: chat_name
        })
    }

    }
    const [lastmsg, setlastmsg] = useState([])

    useEffect(() => {
        if(id)
            db.collection('chat_room')
            .doc(id)
            .collection('chat_data')
            .onSnapshot(snapshot =>
                setlastmsg(snapshot.docs.map(doc => doc.data()))
                )
    }, [id])

    return !AddNewChat ? (
        <Link to={id} className='link'>
            <div className='sidebar-chat'>
                <div>
                    <Avatar></Avatar>
                </div>
                <div className='sidebar-chatInfo'>
                    <h3> {name} </h3>
                    {/* <p> {lastmsg[0].message? lastmsg[0].message:''} </p> */}
                    <p>{lastmsg[lastmsg.length-1]?.message}</p>
                </div>
            </div>
        </Link>
        
    ) : (
        <div className='sidebar-chat'>
            <div onClick={createChat}>
                <h2>Add New Chat</h2>
            </div>
        </div>
    )
}

export default SidebarChat
