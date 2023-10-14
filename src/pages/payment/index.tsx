import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getTranslation } from "@/helper/utilities";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HayyaWithMe } from "@/helper/enums/hayya-with-me";
import InsuranceCard from "@/components/InsuranceCard";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setInsuranceData(data.filter((x:any)=>x.subService == 'Insurance'));
        localStorage.setItem("visa", JSON.stringify(data.filter((x:any)=>x.subService != 'Insurance')));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleCardClick = (index:any) => {
    setSelectedCardIndex(index);
    setIsButtonActive(true);
    // You can also save the selected insurance data in localStorage here
    const selectedInsurance = insuranceData[index];
    localStorage.setItem("selectedInsurance", JSON.stringify(selectedInsurance));
  };

  return (
    <div className="container-fluid pb-10 px-4 sm:px-20 bg-gradient-to-t from-[#0C4532] to-[#327886] to-100%  mx-auto  h-full w-full ">
      {isLoading ? (
        // Loading content
        <>
          {/* Your loading content here */}
        </>
      ) : (
        // Render content after data is fetched
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
                <div className="clear-both bg-white border-solid border-2  border-gray-100 rounded-2xl p-5 sm:p-10 md:p-10 lg:p-10 xl:p-10 2xl:p-10">
                  <h3 className=" text-[22px] font-[500] w-full mb-10">
                    Choose health & travel Insurance service
                  </h3>
                  <div className="block clear-both">
                    <ul className="bg-gray-100 p-4">
                      {insuranceData.map((data, index) => (
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
                          onClick={() => Router.push('/paynow')}
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
      )}
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
