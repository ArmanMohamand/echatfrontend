// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar.jsx";
// import ChatContainer from "../components/ChatContainer.jsx";
// import RightSidebar from "../components/RightSidebar.jsx";

// const HomePage = () => {
//   const [selected, setSelected] = useState(false);

//   return (
//     <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
//       <div
//         className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl
//         overflow-hidden h-full grid grid-cols-3 relative
//         ${
//           selected
//             ? "md:grid-cols-[1fr-1.5fr-1fr] xl:grid-cols-[1fr-2fr-1fr]"
//             : "md:grid-cols-2"
//         } `}
//       >
//         <Sidebar selected={selected} setSelected={setSelected} />
//         <ChatContainer selected={selected} setSelected={setSelected} />
//         <RightSidebar selected={selected} setSelected={setSelected} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

import React, { useContext } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import RightSidebar from "../components/RightSidebar.jsx";

import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="border w-full h-screen sm:px-[15%] sm:py-[5%]">
      <div
        className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl
        overflow-hidden h-full grid relative
        ${
          selectedUser
            ? "md:[grid-template-columns:1fr_1.5fr_1fr] xl:[grid-template-columns:1fr_2fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
