import React from "react";

export default function Header() {
  return (
    <>
      <div className="bg-sky-500 flex flex-row justify-between items-center rounded-b-2xl shadow-sm  p-5 text-black ">
        <div>logo</div>
        <div className="bg-white/20  backdrop-blur-md  shadow-md  rounded-full ">
          <ul className="flex flex-row gap-5 ">
            <button  className="text-2xl hover:bg-white/40 rounded-full transition-all ease-in-out p-3">
              <li>Dashboard</li>
            </button>
            <button className="text-2xl hover:bg-white/40 rounded-full transition-all ease-in-out p-3">
              <li>Equipments</li>
            </button>
            <button className="text-2xl hover:bg-white/40 rounded-full transition-all ease-in-out p-3">
              <li>Profile</li>
            </button>
            
            
          </ul>
        </div>
        <div>sign in</div>
      </div>
    </>
  );
}
