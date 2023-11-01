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
        "quoteNo":storedInsuranceS?.quoteNo,
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
    <div className="container-fluid pb-10 px-4 sm:px-20 bg-gradient-to-t from-[#0C4532] to-[#327886] to-100%  mx-auto  h-full w-full ">
      
        <>
          <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
            <div className="grid gap-2 items-baseline grid-cols-1">
              <div className="ease-in duration-300">
                <div className="text-center mx-auto mt-10 mb-6">
                    <Image
                      src="/img/logo_old.png"
                      width={180}
                      height={120}
                      alt="Picture of the author"
                      className="text-center mx-auto mb-3"
                    />
                  </div>
                <div className="bg-white border-solid border-2  border-gray-100 rounded-2xl p-5 sm:p-10 md:p-10 lg:p-10 xl:p-10 2xl:p-10">
                  <h3 className=" text-[22px] font-[500] w-full mb-10">
                    Summary
                  </h3>
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
