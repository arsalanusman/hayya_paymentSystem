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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
    <div className="container-fluid pb-10 px-4 sm:px-20  bg-[#327886]  mx-auto  h-full w-full ">
        
        <>
          <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 lg:px-8 lg:py-6">
            <div className="grid gap-2 items-baseline grid-cols-1">
              <div className="ease-in duration-300">
                <div className="Payment-heading">
                <Image
                      src="/img/p-star.svg"
                      width={32}
                      height={32}
                      alt="Picture of the author"
                      className=""
                    /> <span>Hayya Payment</span>
                </div>
                <div className="tabs-back">
                  <Tabs value={activeTab} defaultValue="account" className="">
                    <TabsList className="TabsList-but bg-transparent">
                      <TabsTrigger className={`` } value="account" onClick={()=>setActiveTab('account')}> Service Provides</TabsTrigger>
                      <TabsTrigger className={`` }  value="payment" >Payment Information</TabsTrigger>
                    </TabsList>
                    <TabsContent  value="account">
                    <div className="providers-main">
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
                    </div>
                      <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                      <hr className="mb-20"></hr>

                      <div className="buttonexistcont">
                        {isButtonActive && (
                          <button
                            onClick={()=>Router.push('/')}
                          >
                            Exit
                          </button>
                        )}
                        {isButtonActive && (
                          <button
                          className="activetab-buton"
                            onClick={()=>setActiveTab('payment')}
                          >
                            Continue
                          </button>
                        )}
                        </div>
                    </TabsContent>
                    <TabsContent   value="payment">
                      <div className="payment-info">
                        <div className="payment-item">
                          <div className="lft">Item</div>
                          <div className="rgt">Total</div>
                        </div>
                        {combineData.map((t:any,ind)=>
                        <>
                          <div className="payment-itemboxes" key={ind}>
                              <div className="lft">{t.clientName} Fees</div>
                              <div className="rgt">{t?.price?.toFixed(2)} .QAR</div>
                          </div>
                          {/* <div className="flex justify-end items-center  mb-10 gap-10" key={ind}>
                            <div className="l">{t.clientName} Fees</div>
                            <div className="w-[73%] "> <hr className="border-b-2 border-b-[#ccc] w-full"></hr></div>
                            <div className="">{t?.price?.toFixed(2)}</div>
                          </div> */}
                        </>
                        )}
                        {/* <div className="flex justify-end items-center  mb-10 gap-10">
                          <div className="l">Security Deposit</div>
                          <div className="w-[73%] "> <hr className="border-b-2 border-b-[#ccc] w-full"></hr></div>
                          <div className="">150.00</div>
                        </div> */}
                         <div className="payment-itemboxes">
                            <div className="lft">Security Deposit</div>
                            <div className="rgt">150.QAR</div>
                          </div>
                           <button className="Total"><div>Total</div> <div>600.QAR</div></button>
                           <div className=" clear-both"></div>
                          {/* <div className=" flex justify-end"><button className="bg-[#D5CC65] px-8 p-4 flex justify-between gap-10 "><div>Total (QAR)</div>  <div>1,000.00</div></button>
                          </div> */}
                          {/* <div className="mb-6">
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
                          </div> */}      
                           <div className="Conditions-sec">
                            <Checkbox />
                             <div>I’ve read and agree to the </div>
                             <a href=""className=" underline  font-[500]">Terms & Conditions.</a>
                           </div>
                            <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                            <hr className="mb-20"></hr>
                            <div className="buttonexistcont">
                           
                            {isButtonActive && (
                              <button
                                onClick={()=>setActiveTab('account')}
                              >
                                Exit
                              </button>
                            )}
                            {isButtonActive && (
                              // <button
                              //   className="activetab-buton"
                              //   onClick={()=>PayNow()}
                              // >
                              //   Continue
                              // </button>
                              <Dialog>
                              <DialogTrigger> Pay 600.QAR</DialogTrigger>
                              <DialogContent>
                                 <DialogHeader>
                                   <DialogTitle><Image
                                     src="/img/Union.svg"
                                     width={19}
                                     height={19}
                                     alt="Picture of the author"
                                     className=""
                                   /></DialogTitle>
                                   <DialogDescription className="DialogContent">
                                     <p> You’ll be redirected to a payment gateway to continue your payment process.</p>
                                     <div className="DialogContent-buttons">
                                       <button  onClick={()=>setActiveTab('account')} className="Back">Back</button>
                                       <button  onClick={()=>PayNow()} className="Continue">Continue</button>
                                     
                                     </div>
                                   </DialogDescription>
                                 </DialogHeader>
                              </DialogContent>
                             </Dialog>
                            )}
                            </div>
                          
                           
                      </div>  
                    </TabsContent>
                  </Tabs>
                </div>
               

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