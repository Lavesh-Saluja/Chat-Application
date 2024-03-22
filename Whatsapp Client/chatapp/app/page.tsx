"use client"
import Image from "next/image";
import Contact from "../components/Contact";
import img from "../public/laveshPP.jpg"
import { useState, useEffect, SetStateAction } from "react";
import addChat,{ fetchChatsByNumber } from "@/db/db.function";
import { Message,chatTable } from "@/db/db.model"
import {useLiveQuery} from "dexie-react-hooks";
export default function Home() {
  const [vari,setVari]=useState("");
  const chats = useLiveQuery(
    () => 
      chatTable.where('sender')
      .equals(activeNumber)
      .or('receiver')
        .equals(activeNumber).toArray()
  );
   const numbers = useLiveQuery(
    () => 
      chatTable.where('sender')
      .equals(activeNumber)
      .or('receiver')
        .equals(activeNumber).toArray()
    );
  async function handleAddChat() {
    const res = await addChat("ID20", "Hello", "Alice", "Bob", Date.now());
    console.log(res);
  }
   async function getChat() {
    const res = await addChat("ID", "Hello", "Alice", "Bob", Date.now());
    console.log(res);
}

  const [activeNumber, setActiveNumber] = useState("");
    const handleContactClick = (number: string) => {
    setActiveNumber(number);
  };


  useEffect(() => {
    console.log("Fetch data for " + activeNumber);
    console.log(chats);
       
  },[activeNumber]);
  return (
    <div className="bg-slate-300 h-[100vh]">
      <div className="grid grid-cols-3 p-16 h-[100%] border-1 ">
        <div className="col-span-1 bg-white  border-r-1 overflow-scroll scrollbar-container">
          <Contact name="Lavesh Saluja" img={img} number="9284685426" onClick={ handleContactClick} />
          <Contact name="Lavesh Saluja" img={img} number="9284685420" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685428" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685427" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685425" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685424" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685423" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685422" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685421" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685406" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685416" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685436" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685446" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685456" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685466" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685476" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685486" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685496" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685026" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685126" onClick={ handleContactClick}  />
          <Contact name="Lavesh Saluja" img={img} number="9284685226" onClick={ handleContactClick}  />
        </div>
        {/* <button onClick={ handleAddChat}>Add</button> */}
        <div className="col-span-2 bg-neutral-300 h-[100%]" >
          <div className="flex flex-col justify-between  h-[90vh]  ">
            <div className=" h-[100%] flex flex-col  p-3 text-xl  " id="ChatContainer">
              
              <div className=" h-[100%] overflow-scroll w-[100%] scrollbar-container  px-9">
               
                
                
                  {chats!==undefined?
                chats.map((obj) => {
                  return (<>
                    
                    <h3>{ obj.message}</h3>
                    <h3>{obj.sender }</h3>
                    <h3>{obj.receiver}</h3>
                    <h3>{obj.timestamp}</h3>
                    <h1>---------------</h1>
                  </>)
                }
                )
                 :
                ""
              }
                </div>
            
              
             
          </div>
          <div id="Textbox" className="flex justify-center items-center h-16  bg-green-500">
            <input type="text" className="w-[80%] h-10 border-black border-2 rounded-md"></input>
          </div>
          </div>
         
      </div>
    </div>
    </div>
  );
}
