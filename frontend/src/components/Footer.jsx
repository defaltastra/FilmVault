import React from "react";

function YearCopyright() {
  return  <p id="copyright-year">Copyright@{new Date().getFullYear()} Developed By:Defaltastra And Megane </p>;
}

const Footer = () => {
  return (
    <div className=" itmes-center justify-center text-gray-400 my-6 hidden md:flex">
      <YearCopyright/>
    </div>
  );
};

export default Footer;
