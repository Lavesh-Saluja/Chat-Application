import Image from "next/image";
import React from 'react';

interface ContactProps {
    name: string;
    img: any;
    number: string;
    onClick: Function;
}

const Contact: React.FC<ContactProps> = ({ name, img ,number,onClick}) => {
    return (
        <div className="h-16 border-b-2 border-slate-700 p-2 flex justify-start items-center" onClick={()=>{onClick(number)}}>
            <div className="flex justify-center items-center">
                <Image className="w-10 rounded-3xl" alt="Profile Pic" src={img} width={100} height={100} />
            </div>
            <div className="w-[100%] flex justify-start items-center ml-10">
                <div>{name==""?number:name}</div>
            </div>
        </div>
    );
}

export default Contact;


