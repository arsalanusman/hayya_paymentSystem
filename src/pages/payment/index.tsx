import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getTranslation } from "@/helper/utilities";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HayyaWithMe } from "@/helper/enums/hayya-with-me";
import InsuranceCard from "@/components/InsuranceCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from "@/components/ui/accordion-provider"
type Props = {};

const FILE_NAME = "hayya-with-me";

const Payment = () => {
  const { t } = useTranslation([FILE_NAME]);
  const [isLoading, setIsLoading] = useState(true);
  const [insuranceData, setInsuranceData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState();
  const [selectedCard, setSelectedCard]:any = useState({});
  const [otherCard, setOtherCard]:any = useState({});
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [combineData, setCombineData] = useState([]);
  const [amount, setAmount]:any = useState(0);
  const [activeTab, setActiveTab] = useState('account');
  const apiUrl = '/api/services';
  const payUrl = '/api/paynow';
  const Router = useRouter();
  const searchParams = useSearchParams();
  

  useEffect(() => {
    console.log(searchParams.get('serviceType'),'searchParams1')
    const fetchInsuranceData = async () => {
      try {
       
        const serviceTypeParam = searchParams.get('serviceType')
        if(serviceTypeParam){
            const response = await fetch(apiUrl + `?type=${serviceTypeParam}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setInsuranceData(data);
            setIsLoading(true); // Set isLoading to false when data is available
          }
      } catch (error) {
        setInsuranceData([]);
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set isLoading to false on error as well
      }
    };
  
    fetchInsuranceData();
  }, [searchParams]);

  const handleCardClick = (index:any) => {
    setSelectedCardIndex(index);
    setIsButtonActive(true);
    // You can also save the selected insurance data in localStorage here
     const selectedInsurance = insuranceData[index];
    let findVisa = insuranceData.filter((x:any)=>x.subService == 'Visa')[0]
    setOtherCard(findVisa)
    setSelectedCard(selectedInsurance);
    setCombineData([selectedInsurance, findVisa])
    setAmount(combineData.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.price, 0))
    // if(findVisa){
      
    //   localStorage.setItem("visa", JSON.stringify(findVisa));
    // }else{
    //   localStorage.setItem("visa", '');
    // }
    // localStorage.setItem("selectedInsurance", JSON.stringify(selectedInsurance));
  };

  const PayNow = async () => {
    try { 
      setIsLoading(false);
      const serviceTypeParam = searchParams.get('serviceType')
      let request = {
        "amount": (amount + 150),
        "clientSubServiceId": combineData.map((x:any)=>x.id),
        "quote":selectedCard,
      }
      const response = await fetch(payUrl + `?type=${serviceTypeParam}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the request content type
        },
        body: JSON.stringify(request), // Convert the request object to JSON
      });
      const data = await response.json();
      Router.push(data.data)  
    } catch (error) {
      console.error('Error fetching data:', error);
  };
    
  }
  console.log(selectedCard)
  
  return (
    <div className="container-fluid pb-10 px-4 sm:px-20  bg-[#EEEEE5]  mx-auto  h-full w-full ">
        
        <>
          <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 lg:px-8 lg:py-6">
            <div className="grid gap-2 items-baseline grid-cols-1">
              <div className="ease-in duration-300">
                <div className="Payment-heading">
                   <Image
                      src="/img/arrow-left.png"
                      width={28}
                      height={28}
                      alt="Picture of the author"
                      className=""
                    /> <span>Hayya Payment</span>
                </div>
                  <Tabs value={activeTab} defaultValue="account" className="">
                    <TabsList className="rounded-none table mx-auto bg-transparent p-0 relative z-20">
                      <TabsTrigger className={`bg-white p-3 px-10 mr-4 rounded-none rounded-t-[10px] bg-[#3C7783] text-[#fff] border-2 border-b-0 border-[#3C7783] font-semibold w-full sm:w-auto` } value="account" onClick={()=>setActiveTab('account')}>1. Service Provides</TabsTrigger>
                      <TabsTrigger className={`bg-white p-3 px-10 rounded-none rounded-t-[10px] bg-[#3C7783] border-2 text-[#fff] border-2 border-b-0 border-[#3C7783] font-semibold w-full sm:w-auto` }  value="payment" >2. Payment Summary</TabsTrigger>
                    </TabsList>
                    <TabsContent className="mt-[-2px]" value="account">
                      <div className="clear-both  bg-white border-solid border-t-2  border-[#3C7783] p-5 sm:p-10 md:p-10 lg:p-10 xl:p-10 2xl:p-10 dotted">
                        <div className=" mb-10 pt-10 Providers-headings">
                    <h3 className=" text-[26px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">1</span>
                      <div className="Poppins">Service Providers</div>
                      </h3>
                      <p className="text-[18px] Satoshi">Kindly select your desired service provider</p>
                      
                        </div>
                        <div className="block   min-h-[450px] clear-both ">

                        <div className="providers-main">
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                           <div className="providers-boxes">
                              <div className="providers-boxes-header">
                                 <div>
                                   <img src="/img/Providers01.png" />
                                  </div>
                                  <div>
                                    <button>Select</button>
                                  </div>
                               </div>
                               <h1>Qatar Insurance Company (QIC)</h1>
                               <div className="providers-boxes-premium">
                                 
                                  <div className="box">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem className=" border-0" value="item-1">
                                      <AccordionTrigger>
                                      <div className=" block">
                                      <h4>iNSURANCE premium</h4> 
                                      <h5>150.<span>QAR</span></h5>
                                      </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                      <span className="text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
                                          <ol className='list-disc pl-5 pt-2'>
                                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</li>
                                            <li>eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                            <li>Ut enim ad minim veniam, eiusmod tempor incididunt ut labore</li>
                                      </ol>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                  </div>
                               </div>

                           </div>
                        </div>


                      <ul className=" gap-4  grid grid-cols-4">
                      {isLoading ? insuranceData.filter((x:any) => x.subService !== 'Visa').map((data, index) => (
                          <InsuranceCard
                            key={index}
                            insuranceData={data}
                            onClick={() => handleCardClick(index)}
                            isSelected={index === selectedCardIndex}
                            openSummary={false}
                          />
                        )): 
                        <Image
                        src="/img/loading.gif"
                        width={60}
                        height={50}
                        alt="Picture of the author"
                        className="text-center mx-auto mb-3"
                      />}
                      </ul>
                      </div>
                      <div className="flex justify-center">
                        {isButtonActive && (
                          <button
                          className="text-black  bg-no-repeat p-3 pl-8 pr-8 mr-3 mt-5 bg-[url('/img/button-white.png')] w-[355px] h-[60px]"
                            onClick={()=>Router.push('/')}
                          >
                            Exit
                          </button>
                        )}
                        {isButtonActive && (
                          <button
                            className="text-white  bg-no-repeat p-3 pl-8 pr-8 mt-5 bg-[url('/img/button-yellow.png')] w-[360px] h-[60px]"
                            onClick={()=>setActiveTab('payment')}
                            
                          >
                            Continue
                          </button>
                        )}
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent className="mt-0"  value="payment">
                    <div className="clear-both   min-h-[450px] bg-white border-solid border-t-2  border-[#3C7783] p-5 sm:p-10 md:p-10 lg:p-10 xl:p-10 2xl:p-10">
                        <div className=" mb-10">
                        <div className="mb-6">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">2.1</span>
                        Payment Summary
                      </h3>
                      <p>Here’re your payment details</p>
                  </div>

                  <div className="bg-[#F8F8F8] border border-[#e1e1e1] p-6 mb-10">
                     <div className="flex justify-between mb-6">
                      <div className="font-semibold">Items</div>
                      <div className=" text-[#60737D]">Total</div>
                     </div>
                     {combineData.map((t:any,ind)=>
                     
                     <div className="flex justify-end items-center  mb-10 gap-10" key={ind}>
                      <div className="l">{t.clientName} Fees</div>
                      <div className="w-[73%] "> <hr className="border-b-2 border-b-[#ccc] w-full"></hr></div>
                      <div className="">{t?.price?.toFixed(2)}</div>
                     </div>
                     )}
                     <div className="flex justify-end items-center  mb-10 gap-10">
                      <div className="l">Security Deposit</div>
                      <div className="w-[73%] "> <hr className="border-b-2 border-b-[#ccc] w-full"></hr></div>
                      <div className="">150.00</div>
                     </div>
                      <div className=" flex justify-end"><button className="bg-[#D5CC65] px-8 p-4 flex justify-between gap-10 "><div>Total (QAR)</div>  <div>1,000.00</div></button>
                      </div>
                  </div>
                  <div className="mb-6">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">2.2</span>
                      Payment
                      </h3>
                     
                  </div>
                  <div className="bg-[#F8F8F8] border border-[#e1e1e1] p-6 mb-10">
                  <div className="flex justify-between mb-6">
                      <div className="font-semibold">TOTAL</div>
                      <div className="font-semibold ">{} .QAR</div>
                     </div>
                     <div className=" text-center py-32">Payment Gateway Widget</div>
                    </div>
                    <div className="mb-6">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">2.3</span>
                      Terms & Conditions
                      </h3>
                      <div className="flex gap-2 items-center"><Checkbox />I have read and understood the <a href=""className=" underline text-[#03A290]">Terms & Conditions.</a></div>
                  </div>
                          </div></div>
                          <div className="flex justify-center">
                        {isButtonActive && (
                          <button
                            className="text-black  bg-no-repeat p-3 pl-8 pr-8 mr-3 mt-5 bg-[url('/img/button-white.png')] w-[355px] h-[60px]"
                             onClick={()=>setActiveTab('account')}
                          >
                            Exit
                          </button>
                        )}
                        {isButtonActive && (
                          <button
                            className="text-white  bg-no-repeat p-3 pl-8 pr-8 mt-5 bg-[url('/img/button-yellow.png')] w-[360px] h-[60px]"
                            onClick={()=>PayNow()}
                            
                          >
                            Continue
                          </button>
                        )}
                        </div>
                         
                    </TabsContent>
                  </Tabs>
                
               

              </div>
            </div>
          </div>
        </>
     
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [FILE_NAME])),
  },
});

export default Payment;
