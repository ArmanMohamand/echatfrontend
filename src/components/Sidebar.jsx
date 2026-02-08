// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import assets from "../assets/assets";
// import { AuthContext } from "../../context/Authcontext";
// import { ChatContext } from "../../context/ChatContext";

// const Sidebar = () => {
//   const {
//     messages,
//     users,
//     selectedUser,
//     setSelectedUser,
//     unseenMessages,
//     setUnseenMessages,
//     getUsers,
//     setMessages,
//     getMessages,
//     sendMessage,
//   } = useContext(ChatContext);
//   const navigate = useNavigate();
//   const [input, setinput] = useState(false);
//   const filteredUsers = input
//     ? users.filter((user) =>
//         user.fullName.toLowerCase().includes(input.toLowerCase()),
//       )
//     : users;
//   const { logout, onlineUser } = useContext(AuthContext);
//   useEffect(() => {
//     getUsers();
//   }, [onlineUser]);

//   return (
//     <div
//       className={` bg-[#8185B2]/10 h-full p-5 border-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""}`}
//     >
//       <div className="pb-5">
//         <div className=" flex justify-between items-center">
//           <div className="flex gap-3">
//             <img src={assets.logo} alt="logo" className="w-10" />
//             <h1 className=" pt-1 text-xl font-bold">Echat</h1>
//           </div>
//           <div className="relative py-2 group">
//             <img
//               src={assets.menu_icon}
//               alt="Menu"
//               className="max-h-5 cursor-pointer"
//             />
//             <div
//               className=" absolute  top-full right-0 z-20 w-32 p-5 rounded-md
//             bg-[#282142] border border-gray-600  text-gray-100 hidden group-hover:block"
//             >
//               <p
//                 className="cursor-pointer text-sm"
//                 onClick={() => navigate("/profile")}
//               >
//                 Edit Profile
//               </p>
//               <hr className="my-2 border-t border-gray-500" />
//               <p onClick={() => logout()} className="cursor-pointer text-sm">
//                 Logout
//               </p>
//             </div>
//           </div>
//         </div>
//         <div
//           className="bg-[#403665] rounded-full flex items-center gap-2
//           mt-5 px-4 py-3"
//         >
//           <img src={assets.search_icon} alt="search" className="w-3" />
//           <input
//             onChange={(e) => setinput(e.target.value)}
//             type="text"
//             className="bg-transparent border-none outline-none
//           text-white text-xs placeholder-[#c8c8c8] flex-1"
//             placeholder="search User..."
//           />
//         </div>
//       </div>

//       <div className="flex flex-col">
//         {filteredUsers.map((user, index) => (
//           <div
//             key={index}
//             onClick={() => {
//               if (selectedUser?._id === user._id) {
//                 setSelectedUser(null);
//                 setUnseenMessages((prev) => ({
//                   ...prev,
//                   [user._id]: 0,
//                 }));
//               } else {
//                 setSelectedUser(user);
//                 setUnseenMessages((prev) => ({
//                   ...prev,
//                   [user._id]: 0,
//                 }));
//               }
//             }}
//             className={` relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && "bg-[#282142]/50"}`}
//           >
//             <img
//               src={user?.profilePic || assets.avatar_icon}
//               alt=""
//               className="w-[35px] aspect-[1/1] rounded-full"
//             />
//             <div className=" flex flex-col leading-5">
//               <p className="text-sm font-semibold">{user.fullName}</p>
//               {onlineUser.includes(user._id) ? (
//                 <span className="text-green-400 text-xs"> Online</span>
//               ) : (
//                 <span className="text-neutral-400 text-xs"> Offline</span>
//               )}
//             </div>
//             {unseenMessages[user._id] > 0 && (
//               <p className=" absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center  rounded-full bg-violet-500/50">
//                 {unseenMessages[user._id]}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/Authcontext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
    getUsers,
  } = useContext(ChatContext);

  const { logout, onlineUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [input, setInput] = useState("");

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUser]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 border-r-xl overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      {/* Header */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <img src={assets.logo} alt="logo" className="w-10" />
            <h1 className="pt-1 text-xl font-bold">Echat</h1>
          </div>
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />
            <div
              className="absolute top-full right-0 z-20 w-32 p-5 rounded-md
              bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block"
            >
              <p
                className="cursor-pointer text-sm"
                onClick={() => navigate("/profile")}
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={logout} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="bg-[#403665] rounded-full flex items-center gap-2 mt-5 px-4 py-3"
        >
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none
            text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search user..."
          />
        </div>
      </div>

      {/* User list */}
      <div className="flex flex-col">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              if (selectedUser?._id === user._id) {
                // Toggle off if same user clicked
                setSelectedUser(null);
              } else {
                // Open chat for new user
                setSelectedUser(user);
              }
              // Always reset unseen messages for that user
              setUnseenMessages((prev) => ({
                ...prev,
                [user._id]: 0,
              }));
            }}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
              transition-colors duration-200 
              ${
                selectedUser?._id === user._id
                  ? "bg-[#282142]/70 border-l-4 border-violet-400"
                  : "hover:bg-[#282142]/30"
              }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p className="text-sm font-semibold">{user.fullName}</p>
              {onlineUser.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
