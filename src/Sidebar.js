import { Avatar, Button } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useState } from 'react'
import db from './Firebase'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import { useStateValue } from './StateProvider'



function Sidebar() {

    const [chat_room, setroom] = useState([])

    const [lastmsg, setlastmsg] = useState([])

    const [{user}, dispatch] = useStateValue()

    useEffect(() => {
       const unsubscribe = db.collection('chat_room').onSnapshot((snapshot) =>
            setroom(snapshot.docs.map(doc =>({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return () => {
            unsubscribe();
        }

    }, [])

    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <div className='displayname'>
                    <Avatar src= "https://lh3.googleusercontent.com/a-/AOh14Gj-rX2IQOQK7BIJokhvultSMdb33_3_O6-WqzwZTw=s96-c" ></Avatar>
                    {/* <h2>Rana Gahar</h2> */}
                </div>
                <div className='sidebar-headerRight'>
                    <Button>
                    <DonutLarge></DonutLarge>
                    </Button>
                    <Button>
                    <Chat></Chat>
                    </Button>
                    <Button>
                    <MoreVert></MoreVert>
                    </Button>
                </div>
            </div>
            <div className='sidebar-search'>
                <div className='sidebar-searchContainer'>
                    <SearchOutlined></SearchOutlined>
                    <input className='input' type='text' placeholder='type here'></input>
                </div>
            </div>
            <div className='sidebar-chats'>
                <SidebarChat AddNewChat></SidebarChat>
                {chat_room.map(chatbox =>(
                    <SidebarChat id = {chatbox.id} key = {chatbox.id} name={chatbox.data.chat} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
