import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getTranslation } from "@/helper/utilities";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HayyaWithMe } from "@/helper/enums/hayya-with-me";
import { useRouter, useSearchParams } from "next/navigation";
import { Document, Page, pdfjs } from 'react-pdf';

type Props = {};

const FILE_NAME = "hayya-with-me";
const x = HayyaWithMe;

const Transaction = () => {
  const Router = useRouter();
  const searchParams = useSearchParams();
  const transId = searchParams.get('transactionId');
  const { t } = useTranslation([FILE_NAME]);
  const tr = (key: string) => getTranslation(t, FILE_NAME, key);
  const apiUrl = '/api/downloadpolicyreport';
  const [pdfData, setPdfData] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    sendTransaction();
  }, []);

  const sendTransaction = async () => {
    try {
      let request = {
        "transactionId": transId
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await response.json();
      setPdfData(data);
      setFailed(true);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <div className="container-fluid pb-10 px-4 sm:px-20 bg-gradient-to-t from-[#0C4532] to-[#327886] to-100% mx-auto h-full w-full">
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
              {pdfData ? (
                  <div>
                    <iframe src={`data:application/pdf;base64,${pdfData}`} title="PDF" width='100%' height="600px" />
                  </div>
                ) : !failed ? <Image
                src="/img/loading.gif"
                width={180}
                height={120}
                alt="Picture of the author"
                className="text-center mx-auto mb-3"
              /> :  <Image src="/img/cross.png"  width={180}
              height={120}
              alt="Picture of the author"
              className="text-center mx-auto mt-10" /> }
              <div className="block">
                <div className="space-y-2 pt-2 flex justify-center">
                  <button className="text-white p-3 pl-8 pr-8 bg-[#d5cc65] rounded-md" onClick={() => Router.push('/?serviceType=moi')}>
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", [FILE_NAME])),
  },
});

export default Transaction;
