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
    setTimeout(()=> sendTransaction(),2000)
  }, [status == 'paid']);

  const sendTransaction = async () => {
    // setIsLoading(false)
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
    console.log(data,'data')
    setTimeout(()=>{
      //setIsLoading(true)
      data.QuoteNo && Router.push(`/download_transaction/?hshUserid=${id}&quoteNo=${data.QuoteNo}`)
    },1000)
   
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
                <div className="success-main border-solid text-center rounded-2xl ">
                {isLoading ? (
                <>
                {status == 'Paid' ?  <svg className="center  md:w-[666px] sm:w-screen" height="400" viewBox="0 0 666 666" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect opacity="0.3" x="116.5" y="114.5" width="435" height="435" rx="217.5" stroke="#01A63E"/>
<rect opacity="0.15" x="0.5" y="0.5" width="665" height="665" rx="332.5" stroke="#01A63E"/>
<rect opacity="0.7" x="232.5" y="230.5" width="203" height="203" rx="101.5" stroke="#01A63E"/>
<path d="M333 302L341.482 309.696L352.926 309.253L354.477 320.6L363.529 327.617L357.423 337.306L359.847 348.5L348.941 351.998L343.603 362.13L333 357.8L322.397 362.13L317.059 351.998L306.153 348.5L308.577 337.306L302.471 327.617L311.523 320.6L313.074 309.253L324.518 309.696L333 302Z" fill="#01A63E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M323 333C323 327.429 327.429 323 333 323C338.571 323 343 327.429 343 333C343 338.571 338.571 343 333 343C327.429 343 323 338.571 323 333ZM337.489 328.15C337.987 328.449 338.149 329.096 337.85 329.594L333.113 337.489C332.946 337.767 332.661 337.953 332.339 337.992C332.017 338.032 331.695 337.921 331.466 337.692L328.308 334.534C327.897 334.123 327.897 333.456 328.308 333.045C328.719 332.634 329.386 332.634 329.797 333.045L332.001 335.25L336.045 328.511C336.344 328.013 336.99 327.851 337.489 328.15Z" fill="#FAF3DD"/>
</svg>
: <svg className="center md:w-[666px] sm:w-screen"  width="666" height="400" viewBox="0 0 666 666" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect opacity="0.3" x="116.5" y="114.5" width="435" height="435" rx="217.5" stroke="#d53a3a"/>


<rect opacity="0.15" x="0.5" y="0.5" width="665" height="665" rx="332.5" stroke="#d53a3a"/>
<rect opacity="0.7" x="232.5" y="230.5" width="203" height="203" rx="101.5" stroke="#d53a3a"/>

<path d="M333 302L341.482 309.696L352.926 309.253L354.477 320.6L363.529 327.617L357.423 337.306L359.847 348.5L348.941 351.998L343.603 362.13L333 357.8L322.397 362.13L317.059 351.998L306.153 348.5L308.577 337.306L302.471 327.617L311.523 320.6L313.074 309.253L324.518 309.696L333 302Z" fill="#fff"/>

<path d="M333 302L341.482 309.696L352.926 309.253L354.477 320.6L363.529 327.617L357.423 337.306L359.847 348.5L348.941 351.998L343.603 362.13L333 357.8L322.397 362.13L317.059 351.998L306.153 348.5L308.577 337.306L302.471 327.617L311.523 320.6L313.074 309.253L324.518 309.696L333 302Z" fill="#d53a3a"/>

<line x1="322" y1="322" x2="344" y2="344" stroke="#fff" stroke-width="2" />
<line x1="344" y1="322" x2="322" y2="344" stroke="#fff" stroke-width="2" />
</svg>

 }
                      
                     

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
