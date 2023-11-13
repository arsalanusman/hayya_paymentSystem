// components/InsuranceCard.js
import Image from 'next/image';
import React, { useState } from 'react';

const InsuranceCard = ({ insuranceData, isSelected, onClick }:any) => {
    console.log(isSelected,'isSelected')
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [index, setIndex] = useState(0);

  let popups = [{
    heading:'Terms and Conditions',
    content:'<p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply. </p><p> The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>'
  },  
  {
    heading:'Breakdown',
    content:'<div><ol><li>Health Insurance: 200 QAR</li><li>Travel Insurance: 200 QAR</li></ol></div>'
  }
]

  const openModal = (va:any) => {
    
    setIndex(va)
    setIsModalOpen(isModalOpen ? false: true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
   <>
   
   </>
    
    // <li
      
    //   className={`bg-white pt-8 px-6 pb-4 border-[3px] border-[#3C7783] mb-2 cursor-pointer ${
    //     isSelected ? 'border-[#d5cc65]' : ''
    //   }`}
    // >
    //   <div className="relative">
    //     <div className="mb-5 grid grid-cols-2 sm:w-full ">
    //       <div className="logo border-[3px] border-[#3C7783] sm:text-center">
    //         <img src={insuranceData?.logo} className="md:w-20 mx-auto" alt={insuranceData.name} />
    //       </div>
    //       <div className="text-right relative">
    //     {isSelected ?    <Image
    //           src="/img/selected.png"
    //           width={99}
    //           height={43}
    //           alt="Picture of the author"
    //           className="absolute right-[-10px] top-[-10px]"
    //           onClick={onClick}
    //         />:  <Image
    //         src="/img/select.png"
    //         width={99}
    //         height={43}
    //         alt="Picture of the author"
    //         className="absolute right-[-10px] top-[-10px]"
    //         onClick={onClick}
    //       />} 
    //         </div>
    //     </div>
    //     <div className='sm:hidden border-gray-100 mb-2 mt-2 border-b-[3px]'></div>
    //     <div className="md:w-1/2 sm:w-full">
    //       <div className="heading">
    //         <p className="text-xl font-bold mb-1">{insuranceData.name}</p>
    //         <span className="text-xs text-[#3C7783] uppercase font-[600]" onClick={()=>openModal(0)}>{insuranceData.clientName}</span>
    //       </div>
    //     </div>
    //     <div className='sm:hidden border-gray-100 mt-2 border-b-[3px]'></div>
    //     <div className="">
    //       <div className="price relative w-full flex clear">
    //         <div className="text-xl justify-start font-[600]">{insuranceData.price}<span className='text-[60%]'>.QAR</span></div>
    //         <div className='justify-end w-full'><Image
    //                   src="/img/arrow-toggle.png"
    //                   width={39}
    //                   height={39}
    //                   alt="Picture of the author"
    //                   className="absolute right-0 top-[-5px]"
    //                   onClick={()=>openModal(0)}
    //                 /></div >
    //         {/* <span className="text-xs block mt-1" onClick={()=>openModal(1)}>{insuranceData.subService}</span> */}
    //       </div>
    //     </div>
    //     {isModalOpen && (
    //       <div className={`information-overlay ${
    //         isSelected ? 'border-[#d5cc65]' : ''
    //       }`}>
    //         <span className="text-xs text-[#3C7783] uppercase font-[600]">Information</span>
    //         <ol className='list-disc pl-5'>
    //           <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
    //           <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
    //           <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
    //         </ol>
    //       </div>
    //     )}
    //   </div>
    // </li>
  
  );
};

export default InsuranceCard;
