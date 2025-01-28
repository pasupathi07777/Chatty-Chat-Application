
// import { useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { chatState, getMessages, subScribeToMessages, unSubScribeToMessages } from "../slices/chatSlice";
// import { authState } from "../slices/authSlice";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./MessageSkeleton";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = () => {
// const dispatch=useDispatch()
//   const {
//     messages,
//     isMessagesLoading,
//     selectedUser,
//     // subscribeToMessages,
//     // unsubscribeFromMessages,
//   } = useSelector(chatState);

//   const { authUser } = useSelector(authState);

//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     dispatch(getMessages(selectedUser))
//      dispatch(subScribeToMessages())


//     return () =>  dispatch(unSubScribeToMessages())
//   }, [selectedUser, getMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
// export default ChatContainer;\



import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatState, getMessages, subScribeToMessages, unSubScribeToMessages } from "../slices/chatSlice";
import { authState } from "../slices/authSlice";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, selectedUser } = useSelector(chatState);
  const { authUser } = useSelector(authState);
  console.log(authUser,selectedUser);
  
  const messageEndRef = useRef(null);

  // Fetch messages and subscribe to socket when a user is selected
  useEffect(() => {
    dispatch(getMessages(selectedUser._id));
    dispatch(subScribeToMessages());

    // Cleanup: Unsubscribe from socket when component unmounts
    return () => dispatch(unSubScribeToMessages());
  }, [selectedUser, dispatch]);

  // Scroll to the bottom when a new message is received
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ?  selectedUser.profilePic || "/avatar.png"
                      : authUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
