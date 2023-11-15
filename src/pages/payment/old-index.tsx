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
                </div >
                <div className="tabs-back">
                  <Tabs defaultValue="account" className=" ">
                    <TabsList className="TabsList-but bg-transparent">
                      <TabsTrigger value="account">Service Provider</TabsTrigger>
                      <TabsTrigger value="password">Payment Information</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                      <div className="providers-main">
                            <div className="providers-boxes">
                                <div className="providers-boxes-header">
                                   <div className="img-box">
                                    <Image src="/img/Providers01.svg"  width={65} height={65}  alt="Picture of the author"/>
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
                                        <AccordionContent className="AccordionContent">
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
                                   <div className="img-box">
                                    <Image src="/img/Providers01.svg"  width={65} height={65}  alt="Picture of the author"/>
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
                                        <AccordionContent className="AccordionContent">
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
                                   <div className="img-box">
                                    <Image src="/img/Providers01.svg"  width={65} height={65}  alt="Picture of the author"/>
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
                                        <AccordionContent className="AccordionContent">
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
                                   <div className="img-box">
                                    <Image src="/img/Providers01.svg"  width={65} height={65}  alt="Picture of the author"/>
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
                                        <AccordionContent className="AccordionContent">
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
                                   <div className="img-box">
                                    <Image src="/img/Providers01.svg"  width={65} height={65}  alt="Picture of the author"/>
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
                                        <AccordionContent className="AccordionContent">
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
                                   <div className="img-box">
                                    <Image src="/img/Providers01.svg"  width={65} height={65}  alt="Picture of the author"/>
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
                                        <AccordionContent className="AccordionContent">
                                        <span className=" text-xs text-[#3C7783] uppercase font-[600] ">Information</span>
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
                      <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                      <hr className="mb-20"></hr>
                      <div className="buttonexistcont">
                       
                        <button>Exist</button>
                        <button>Continue</button>
                      </div>
                    </TabsContent>
                    <TabsContent value="password">
                       <div className="payment-info">
                          <div className="payment-item">
                            <div className="lft">Item</div>
                            <div className="rgt">Total</div>
                          </div>
                          <div className="payment-itemboxes">
                            <div className="lft">VISA Fees</div>
                            <div className="rgt">150.QAR</div>
                          </div>
                          <div className="payment-itemboxes">
                            <div className="lft">Medical Insurance Fee</div>
                            <div className="rgt">150.QAR</div>
                          </div>
                          <div className="payment-itemboxes">
                            <div className="lft">Security Deposit</div>
                            <div className="rgt">150.QAR</div>
                          </div>
                           <button className="Total"><div>Total</div> <div>600.QAR</div></button>
                           <div className="payment-option">
                            <p>Payment Options</p>
                           </div>
                           <div className="Conditions-sec">
                            
                              <Checkbox />
                               <div>I’ve read and agree to the </div>
                               <a href=""className=" underline  font-[500]">Terms & Conditions.</a>
                           </div>
                           <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                           <hr className="mb-20"></hr>
                           <Dialog>
                             
                           <div className="buttonexistcont">
                              <button>Exist</button>
                              <DialogTrigger> Pay 600.QAR</DialogTrigger>
                            
                            </div>
                          
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
                                      <button className="Back">Back</button>
                                      <button className="Continue">Continue</button>
                                    
                                    </div>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>
                                 
                             
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
