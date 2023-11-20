// components/ApplicationInformation.js
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getTranslation } from "@/helper/utilities";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HayyaWithMe } from "@/helper/enums/hayya-with-me";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};

const FILE_NAME = "hayya-with-me";
const x = HayyaWithMe;

const Transaction = () => {
  const Router = useRouter()
  const searchParams =  useSearchParams()
  const id = searchParams.get('id')
  const [isLoading, setIsLoading] = useState(true);
  const vendorCode = searchParams.get('vendorCode')
  const status = searchParams.get('status')
  const transId = searchParams.get('transId')
  const { t } = useTranslation([FILE_NAME]);
  const tr = (key: string) => getTranslation(t, FILE_NAME, key);
  const apiUrl = '/api/transaction';

  useEffect(() => {
    
  }, []);

  const sendTransaction = async () => {
    setIsLoading(false)
    let request = {
      "transactionId": transId,
      "externalPartyId": id,
      "vendorCode": vendorCode
    }
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the request content type
      },
      body: JSON.stringify(request), // Convert the request object to JSON
    });
    const data = await response.json();
    setTimeout(()=>{
      setIsLoading(true)
      Router.push(`/download_transaction/?hshUserid=${data.transactionId}&quoteNo=${data.QuoteNo}`)
    },100)
   
  }

 
  return (
    <div className="container-fluid pb-10 px-4 sm:px-20 bg-gradient-to-t from-[#0C4532] to-[#327886] to-100%  mx-auto  h-full w-full ">
      <>
          <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
            <div className="grid gap-2 items-baseline grid-cols-1">
              <div className="ease-in duration-300">
          
                {/* <div className="text-center mx-auto mt-10 mb-6">
                    <Image
                      src="/img/logo_old.png"
                      width={180}
                      height={120}
                      alt="Picture of the author"
                      className="text-center mx-auto mb-3"
                    />
                  </div> */}
                <div className="success-main border-solid  rounded-2xl ">
                {isLoading ? (
                <>
                {status == 'Paid' ?   <Image src="/img/account-created-bg2.svg"  width={400}
                      height={400}
                      alt="Picture of the author"
                      className="text-center mx-auto mt-10" /> : 
                      <Image src="/img/cross.png"  width={180}
                      height={120}
                      alt="Picture of the author"
                      className="text-center mx-auto mt-10" /> }
                      
                     

                  <h3 className=" Satoshi text-[40px] text-center font-[700] w-full  text-[#fff] mb-4">

                    
                    {status == 'Paid' ? `Success!` : `Payment Failed!`}
                  </h3>
                  <p className=" text-[24px] text-center font-[400]  mb-10 text-[#fff] m-auto">{status == 'Paid' ? `Your payment has been received successfully.` : `Please review your billing information and make changes if necessary.`}</p>
                  {/* <div className="block">
                    <div className="space-y-2 pt-2 flex justify-center">
                    {status == 'Paid' ?  <button className="success-continue" onClick={() => sendTransaction()}>
                    Continue
                      </button> :
                      <button className="text-white p-3 pl-8 pr-8 bg-[#d5cc65] rounded-md"  onClick={() => Router.push('/?serviceType=moi')}>
                        Back
                      </button>}
                    </div>
                  </div> */}
                  </>): <Image
                    src="/img/loading.gif"
                    width={180}
                    height={120}
                    alt="Picture of the author"
                    className="text-center mx-auto mb-3"
                  />}
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

export default Transaction;
