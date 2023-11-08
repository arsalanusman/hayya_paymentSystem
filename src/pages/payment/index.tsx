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

const Payment = () => {
  const { t } = useTranslation([FILE_NAME]);
  const [isLoading, setIsLoading] = useState(true);
  const [insuranceData, setInsuranceData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const apiUrl = '/api/services';
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
    if(findVisa){
      localStorage.setItem("visa", JSON.stringify(findVisa));
    }else{
      localStorage.setItem("visa", '');
    }
    localStorage.setItem("selectedInsurance", JSON.stringify(selectedInsurance));
  };

  return (
    <div className="container-fluid pb-10 px-4 sm:px-20  bg-[#EEEEE5]  mx-auto  h-full w-full ">
        
        <>
          <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
            <div className="grid gap-2 items-baseline grid-cols-1">
              <div className="ease-in duration-300">
                <div className="text-center mx-auto mt-10 mb-6">
                    <h1 className="text-[40px] text-[#1D4E59] mb-20 font-[700]"><span><Image
                      src="/img/arrow-left.png"
                      width={38}
                      height={33}
                      alt="Picture of the author"
                      className="absolute pt-5"
                    /></span>Hayya Payment</h1> 
                </div>
                <div className="clear-both bg-white border-solid border-2  border-gray-100 p-5 sm:p-10 md:p-10 lg:p-10 xl:p-10 2xl:p-10">
                 <div className=" mb-10">
                  <h3 className=" text-[22px] text-[#004F62] mb-3 font-[600] w-full">
                    <span className="bg-[url('/img/countBg.png')] bg-no-repeat bg-center p-6 absolute ml-[-72px] mt-[-25px] text-[#fff]">1</span>
                    Service Providers
                    </h3>
                    <p className="text-[18px]">Kindly select your desired service provider</p>
                    
                 </div>
                  <div className="block clear-both">
                    <ul className=" gap-4  grid grid-cols-4">
                    {isLoading && insuranceData.filter((x:any) => x.subService !== 'Visa').map((data, index) => (
                        <InsuranceCard
                          key={index}
                          insuranceData={data}
                          onClick={() => handleCardClick(index)}
                          isSelected={index === selectedCardIndex}
                          openSummary={false}
                        />
                      ))}
                    </ul>
                    <div className="flex justify-end">
                      {isButtonActive && (
                        <button
                          className="text-white p-3 pl-8 pr-8 mt-5 bg-[#d5cc65]   rounded-md"
                          onClick={() => Router.push(`/paynow${searchParams.get('serviceType') ? `?serviceType=${searchParams.get('serviceType')}`:''}`)}
                        >
                          Next
                        </button>
                      )}
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

export default Payment;
