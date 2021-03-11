import { Avatar,Icon } from '@material-ui/core'
import { AttachFile, AttachFileOutlined,InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import './Chat.css'
import db from './Firebase'
import firebase from 'firebase'
// import { useStateValue } from './StateProvider'

function Chat() {


    const [input, setinput] = useState('')
    const [chat, setchat] = useState([])
    const [inbox, setinbox] = useState([])
    const {chat_id} = useParams()
    // cosnt [{user}, dispatch] = useStateValue()
     

    useEffect(() => {
        if(chat_id){
            db.collection('chat_room')
            .doc(chat_id)
            .onSnapshot(snapshot =>(
                setchat(snapshot.data().chat)
                ))
                db.collection('chat_room')
                .doc(chat_id)
                .collection('chat_data')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => setinbox(snapshot.docs.map(doc => doc.data()))
                )
        }

    }, [chat_id])

    const send_msg = (e) =>{
        e.preventDefault();
        console.log(`You typed ${input}`)
        db.collection('chat_room')
        .doc(chat_id)
        .collection('chat_data')
        .add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // user: user.displayName,

        })
        setinput('')
    }

    return (
        <div className='chat'>
            <div className='chat-header'> 
                <div className='avatar'>
                    <Avatar></Avatar>
                </div>
                <div className='info'>
                    <h3> {chat} </h3>
                    {/* <p>Last seen at:{inbox.map(lastseen => !lastseen.user ?
                        <p>{new Date(lastseen.timestamp?.toDate()).toUTCString()}</p>
                         :
                        <p></p>)} </p> */}
                        <p>Last seen at: {new Date(inbox[inbox.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className='chat-headerRight'>
                    <Icon>
                        <SearchOutlined></SearchOutlined>
                    </Icon>
                    <Icon>
                        <AttachFile></AttachFile>
                    </Icon>
                    <Icon>
                        <MoreVert></MoreVert>
                    </Icon>
                </div>
            </div>
            <div className='chat-body'>
                {inbox.map(text =>
                                    <p className={!text.user ? 'chat-msg' : 'chat-receiver'}>
                                        {/* {text.user}
                                        <br></br> */}
                                        {text.message}
                                        <span className='chat-time'>{new Date(text.timestamp?.toDate()).toUTCString()}</span>
                                    </p> )}
            
            </div>
            <div className='chat-footer'> 
                <InsertEmoticon></InsertEmoticon>
                <AttachFileOutlined></AttachFileOutlined>
                <form>
                    <input value={input} onChange={e => setinput(e.target.value)} type='text' placeholder='Type a message'></input>
                    <button onClick={send_msg} type='submit'>'Send'</button>
                </form>
                <Mic></Mic>
            </div>
        </div>
    )
}

export default Chat
