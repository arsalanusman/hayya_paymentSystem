// components/ApplicationInformation.js
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getTranslation } from "@/helper/utilities";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HayyaWithMe } from "@/helper/enums/hayya-with-me";
import InsuranceCard from "@/components/InsuranceCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
type Props = {};

const FILE_NAME = "hayya-with-me";
const x = HayyaWithMe;

const PayNow = () => {
  const Router = useRouter()
  const { t } = useTranslation([FILE_NAME]);
  const tr = (key: string) => getTranslation(t, FILE_NAME, key);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [insuranceData, setInsuranceData] = useState([]);
  const [storedInsuranceS, setStoredInsuranceS] = useState();
  const [cost, setCost] = useState(0)
  const searchParams = useSearchParams();
  const apiUrl = '/api/paynow';
  let storedInsurance: any;
  let visaInsurance: any;

  useEffect(() => {
    
    if (typeof localStorage !== "undefined") {
      storedInsurance = localStorage.getItem("selectedInsurance");
      storedInsurance = JSON.parse(storedInsurance);
      setStoredInsuranceS(storedInsurance)
      visaInsurance = localStorage.getItem("visa"); 
     if(visaInsurance != '' && visaInsurance !== "undefined")
      {
          visaInsurance = JSON.parse(visaInsurance);
      } 
      setInsuranceData((): any => [storedInsurance]);
      if (visaInsurance) {
        // Use functional updates for state variables
        setTimeout(() => {
          setCost((prevCost) => 0);
          setCost((prevCost) => prevCost + visaInsurance.price);
          
        }, 100);
        setInsuranceData((): any => [storedInsurance, visaInsurance]);
      }
      setTimeout(() => {
        setCost((prevCost) => prevCost + storedInsurance.price);
        setCost((prevCost) => prevCost + 50);
        
      }, 100);
      setIsLoading(true);
    }
  }, []);

  const PayNow = async () => {
    try { 
      setIsLoading(false);
      const serviceTypeParam = searchParams.get('serviceType')
      let request = {
        "amount": cost,
        "clientSubServiceId": insuranceData.map((x:any)=>x.id),
        "quote":storedInsuranceS,
      }
      const response = await fetch(apiUrl + `?type=${serviceTypeParam}`, {
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

  return (
    <div className="container-fluid pb-10 px-4 sm:px-20 bg-gradient-to-t from-[#EEEEE5] to-[#EEEEE5] to-100%  mx-auto  h-full w-full ">
      
        <>
          <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 lg:px-8 lg:py-6">
            <div className="grid gap-2 items-baseline grid-cols-1">
              <div className="ease-in duration-300">
                <div className="text-center mx-auto mt-10 mb-6">
                    {/* <Image
                      src="/img/logo_old.png"
                      width={180}
                      height={120}
                      alt="Picture of the author"
                      className="text-center mx-auto mb-3"
                    /> */}
                  </div>
                <div className="bg-white border-solid border-2  border-gray-100 rounded-2xl p-5 sm:p-10 md:p-10 lg:p-10 xl:p-10 2xl:p-10">
                  {/* <h3 className=" text-[22px] font-[500] w-full mb-10">
                    Summary
                  </h3> */}
                
                  <div className="mb-6 pt-10 Providers-headings">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">1</span>
                       <div className="Poppins"> Payment Summary</div>
                      </h3>
                     <p className="text-[18px] Satoshi">Here’re your payment details</p>
                  </div>
                  <div className="bg-[#F8F8F8] border border-[#e1e1e1]  mb-10 pb-10 ">
                        <div className=" p-6">
                          <div className="flex justify-between mb-6">
                            <div className="font-semibold text-[18px]">Items</div>
                            <div className=" text-[#60737D] text-[18px]">Total</div>
                          </div>
                          <div className="Summary-boxes">
                            <div className="one">VISA Fees</div>
                            <div className="two"> <hr></hr></div>
                            <div className="three">150.00</div>
                          </div>
                          <div className="Summary-boxes">
                            <div className="one">Medical Insurance Fee</div>
                            <div className="two"> <hr></hr></div>
                            <div className="three">150.00</div>
                          </div>
                          <div className="Summary-boxes">
                            <div className="one">Travel Insurance Fee</div>
                            <div className="two"> <hr></hr></div>
                            <div className="three">150.00</div>
                          </div>
                          <div className="Summary-boxes">
                            <div className="one">Security Deposit</div>
                            <div className="two"> <hr></hr></div>
                            <div className="three">150.00</div>
                          </div>
                          
                        </div>                      
                      <div className=" flex justify-end"><button className="bg-[#D5CC65] px-8 p-4 flex justify-between gap-10 "><div>Total (QAR)</div>  <div><b>1,000.00</b></div></button>
                      </div>
                    </div>

                  <div className="mb-6 Providers-headings">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">1</span>
                      Payment
                      </h3>
                     
                  </div>
                  <div className="bg-[#F8F8F8] border border-[#e1e1e1] p-6 mb-10">
                  <div className="flex justify-between mb-6">
                      <div className="font-semibold">TOTAL</div>
                      <div className="font-semibold Satoshi">1,000 .QAR</div>
                     </div>
                     <div className=" text-center py-32 Satoshi font-[500]">Payment Gateway Widget</div>
                    </div>
                    <div className="mb-6 Providers-headings">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                      <span className=" bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">1</span>
                       <div className="Poppins">Terms & Conditions</div>
                      </h3>
                      <div className="Conditions-sec"><div className="flex gap-[4px] items-center"><Checkbox /> <div>I have read and understood the </div></div><a href=""className=" underline text-[#03A290] font-[500]">Terms & Conditions.</a></div>
                  </div>
                  <br></br><br></br>  <br></br><br></br>  <br></br><br></br>
                  <div className="block">
                    <ul className="bg-gray-100 p-4">
                    {isLoading ? (
                     insuranceData.length>0 && insuranceData.map((data:any, index:any) => (
                        <InsuranceCard
                          key={index}
                          insuranceData={data}
                          isSelected={index === selectedCardIndex}
                        />
                      ))
                    ) : <Image
                    src="/img/loading.gif"
                    width={180}
                    height={120}
                    alt="Picture of the author"
                    className="text-center mx-auto mb-3"
                  />}
                    </ul>
                    <div className="flex flex-col space-y-2 border-t-[3px] pt-10">
                    <div className="p-4 rounded-lg">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <p>Security deposit</p>
                          <p className="font-bold">50.00 QAR</p>
                        </div>
                       
                      </div>
                       
                       </div>
                      <div className="bg-gray-100 p-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <p className="font-bold">Total Amount:</p>
                          <p className="font-bold">{cost.toFixed(2)} QAR</p>
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="space-y-2 border-t-[3px] pt-10 flex justify-between">
                      <button className="text-white p-3 pl-8 pr-8 bg-[#d5cc65] rounded-md"
                      
                      
                      onClick={() => Router.push(`/${searchParams.get('serviceType') ? `?serviceType=${searchParams.get('serviceType')}`:''}`)}>
                        Back
                      </button>
                      <button className="text-white p-3 pl-8 pr-8 bg-[#d5cc65] rounded-md" onClick={() => PayNow()}>
                        Pay Now
                      </button>
                    </div>
                  </div>
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

export default PayNow;
