import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getTranslation } from "@/helper/utilities";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { HayyaWithMe } from "@/helper/enums/hayya-with-me";
import InsuranceCard from "@/components/InsuranceCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type Props = {};

const FILE_NAME = "hayya-with-me";

const Payment = () => {
  const { t } = useTranslation([FILE_NAME]);
  const [isLoading, setIsLoading] = useState(true);
  const [insuranceData, setInsuranceData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState();
  const [selectedCard, setSelectedCard]: any = useState({});
  const [otherCard, setOtherCard]: any = useState({});
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [combineData, setCombineData]: any = useState([]);
  const [amount, setAmount]: any = useState(0);
  const [sort, setSort]: any = useState(0);
  const [activeTab, setActiveTab] = useState("account");
  const apiUrl = "/api/services";
  const payUrl = "/api/paynow";
  const Router = useRouter();
  const searchParams = useSearchParams();
  const hayyaId: any = searchParams.get("HayaApplicationId")

  useEffect(() => {
    console.log(searchParams.get("external"), "searchParams1");
    setIsLoading(false); 
    const fetchInsuranceData = async () => {
      try {
        
        const serviceTypeParam = searchParams.get("serviceType");
        const externalParam: any = searchParams.get("ExternalUserId");
        if (serviceTypeParam) {
          localStorage.setItem("ExternalUserId", externalParam);
          localStorage.setItem("hayyaId", hayyaId);
          let GetUserId = localStorage.getItem("ExternalUserId");
          const response = await fetch(
            apiUrl + `?type=${serviceTypeParam}&external=${GetUserId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setInsuranceData(data);
          setIsLoading(true); // Set isLoading to false when data is available
        }
      } catch (error) {
        setInsuranceData([]);
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false on error as well
      }
    };

    fetchInsuranceData();
  }, [searchParams]);

  const handleCardClick = (index: any) => {
    setSelectedCardIndex(index);
    setIsButtonActive(true);
    const selectedInsurance = insuranceData[index];
    setSelectedCard(selectedInsurance);
    setCombineData([selectedInsurance]);
  };

  const PayNow = async () => {
    try {
      setIsLoading(false);
      const serviceTypeParam = searchParams.get("serviceType");

      let request = {
        amount: amount,
        clientSubServiceId: [
          { ClientSubServiceId: selectedCard.id, Price: selectedCard.price },
          {
            ClientSubServiceId: "e92c0078-34da-4ca1-a1c5-a5b579e90955",
            price: 150,
          },
        ],
        quote: selectedCard,
      };

      let GetUserId = localStorage.getItem("ExternalUserId");
      const response = await fetch(
        payUrl + `?type=${serviceTypeParam}&external=${GetUserId}&hayyaId=${hayyaId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      const data = await response.json();
      if (data.statusCode == 409) {
        alert(data.message);
      } else {
        Router.push(data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSort = (e: any) => {
    let value = e.target.value;
    setSort(value);
    if (value > 1) {
      value == 2
        ? insuranceData.sort((a: any, b: any) => a.price - b.price)
        : insuranceData.sort((a: any, b: any) => b.price - a.price);
    } else {
      insuranceData.reverse();
    }
  };

  const getFees = async () => {
    
    setIsLoading(false);
    setActiveTab("payment");
    console.log(selectedCard);
    let request = {
      external: localStorage.getItem("ExternalUserId"),
      quoteNo: selectedCard.quoteNo,
    };
    const response: any = await fetch("/api/getFee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data = await response.json();
    let margeData = [...combineData, ...data];
    console.log(margeData, "margeData");
    setCombineData([...combineData, ...data]);
    setTimeout(() => {
      setAmount(
        margeData.reduce(
          (accumulator: any, currentValue: any) =>
            accumulator + currentValue.price,
          0
        )
      );
      
      setIsLoading(true);
    }, 200);
  };

  return (
    <div className="custom-bg container-fluid pb-10 px-4 sm:px-20    mx-auto  h-full w-full ">
      <>
        <div className="px-0 py-0 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-0 lg:px-8 lg:py-6">
          <div className="grid gap-2 items-baseline grid-cols-1">
            <div className="ease-in duration-300">
              <div className="Payment-heading">
                {/* <Image
                      src="/img/p-star.svg"
                      width={32}
                      height={32}
                      alt="Picture of the author"
                      className=""
                    /> */}
                <span>Hayya Payment</span>
              </div>
              <div className="tabs-back">
                <Tabs value={activeTab} defaultValue="account" className="">
                  <TabsList className="TabsList-but bg-transparent">
                    <TabsTrigger
                      className={``}
                      value="account"
                      onClick={() => setActiveTab("account")}
                    >
                      {" "}
                      Service provider
                    </TabsTrigger>
                    <TabsTrigger className={``} value="payment">
                      Payment Information
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="account">
                    <div className="travel-insurance">
                      <h1>Travel Insurance</h1>
                      <p>
                        Select one or more travel insurances based on your
                        chosen mode of travel. Please note that requirements may
                        vary
                      </p>
                    </div>
                    <div className="filter">
                      <div className="sort">
                        <p>Sort By:</p>{" "}
                        <select
                          className=" text-xs cursor-pointer focus:outline-none"
                          name="Accessibility"
                          id="Accessibility"
                          onChange={(e) => handleSort(e)}
                        >
                          <option value="0">Name (A-Z)</option>
                          <option value="1">Name (Z-A)</option>
                          <option value="2">Price Low to High </option>
                          <option value="3">Price High to Low </option>
                        </select>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.78233 2.21713C3.70732 2.14212 3.60557 2.09998 3.49949 2.09998C3.3934 2.09998 3.29166 2.14212 3.21664 2.21713L1.21664 4.21713C1.06044 4.37334 1.06044 4.62661 1.21664 4.78282C1.37285 4.93903 1.62612 4.93903 1.78233 4.78282L3.09949 3.46566L3.09949 11.5343L1.78233 10.2171C1.62612 10.0609 1.37285 10.0609 1.21664 10.2171C1.06043 10.3733 1.06043 10.6266 1.21664 10.7828L3.21664 12.7828C3.29166 12.8578 3.3934 12.9 3.49949 12.9C3.60557 12.9 3.70731 12.8578 3.78233 12.7828L5.78233 10.7828C5.93854 10.6266 5.93854 10.3733 5.78233 10.2171C5.62612 10.0609 5.37285 10.0609 5.21664 10.2171L3.89949 11.5343L3.89949 3.46566L5.21664 4.78282C5.37285 4.93903 5.62612 4.93903 5.78233 4.78282C5.93854 4.62661 5.93854 4.37334 5.78233 4.21713L3.78233 2.21713ZM8.49998 3.99997C8.22383 3.99997 7.99998 4.22382 7.99998 4.49997C7.99998 4.77611 8.22383 4.99997 8.49998 4.99997H14.5C14.7761 4.99997 15 4.77611 15 4.49997C15 4.22382 14.7761 3.99997 14.5 3.99997H8.49998ZM7.99998 7.49997C7.99998 7.22382 8.22383 6.99997 8.49998 6.99997H14.5C14.7761 6.99997 15 7.22382 15 7.49997C15 7.77611 14.7761 7.99997 14.5 7.99997H8.49998C8.22383 7.99997 7.99998 7.77611 7.99998 7.49997ZM8.49998 9.99997C8.22383 9.99997 7.99998 10.2238 7.99998 10.5C7.99998 10.7761 8.22383 11 8.49998 11H14.5C14.7761 11 15 10.7761 15 10.5C15 10.2238 14.7761 9.99997 14.5 9.99997H8.49998Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {isLoading ? ( 
                    <div className="providers-main">
                     
                       { insuranceData
                          .filter((x: any) => x.subService !== "Visa")
                          .map((data, index) => (
                            <InsuranceCard
                              key={index}
                              insuranceData={data}
                              onClick={() => handleCardClick(index)}
                              isSelected={index === selectedCardIndex}
                              openSummary={false}
                            />
                          ))
                      } 
                    </div>): (
                        <Image
                          src="/img/loading.gif"
                          width={60}
                          height={50}
                          alt="Picture of the author"
                          className="text-center mt-20 mx-auto mb-3"
                        />
                      )}
                    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
                    <br></br>
                    <hr className="mb-20"></hr>
                    <div className="buttonexistcont">
                      {isButtonActive && (
                        <button onClick={() => Router.push("/")}>Exit</button>
                      )}
                      {isButtonActive && (
                        <button
                          className="activetab-buton"
                          onClick={() => getFees()}
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="payment">
                    <div className="travel-insurance">
                      <h1>Payment Details</h1>
                      <p>
                        Finalize your transaction based on the selected Visa
                        type and application details
                      </p>
                    </div>
                    {isLoading ? (
                    <div className="payment-info">
                      <div className="payment-item">
                        <div className="lft">Item</div>
                        <div className="rgt">Total</div>
                      </div>
                       {combineData.map((t: any, ind: any) => (
                        <>
                          <div className="payment-itemboxes" key={ind}>
                            <div className="lft">{t.clientName} </div>
                            <div className="rgt">
                              {t?.price?.toFixed(2)} .QAR
                            </div>
                          </div>
                        </>
                      ))}
                      <button className="Total">
                        <div>Total</div> <div>{amount}.QAR</div>
                      </button>
                      <div className=" clear-both"></div>
                      <div className="Conditions-sec">
                        <Checkbox />
                        <div>I have read and agree to the</div>
                        <a href="" className=" underline  font-[500]">
                          Terms and Conditions.
                        </a>
                      </div>
                      <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
                      <br></br> <br></br>
                      <hr className="mb-20"></hr>
                      <div className="buttonexistcont">
                        {isButtonActive && (
                          <button onClick={() => setActiveTab("account")}>
                            Exit
                          </button>
                        )}
                        {isButtonActive && (
                          <Dialog>
                            <DialogTrigger> Pay {amount}.QAR</DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  <Image
                                    src="/img/Union.svg"
                                    width={19}
                                    height={19}
                                    alt="Picture of the author"
                                    className=""
                                  />
                                </DialogTitle>
                                <DialogDescription className="DialogContent">
                                  <p>
                                    {" "}
                                    You’ll be redirected to a payment gateway to
                                    continue your payment process.
                                  </p>
                                  <div className="DialogContent-buttons">
                                    <button
                                      onClick={() => setActiveTab("account")}
                                      className="Back"
                                    >
                                      Back
                                    </button>
                                    <button
                                      onClick={() => PayNow()}
                                      className="Continue"
                                    >
                                      Continue
                                    </button>
                                  </div>
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>) : (
                        <Image
                          src="/img/loading.gif"
                          width={60}
                          height={50}
                          alt="Picture of the author"
                          className="text-center mt-20 mx-auto mb-3"
                        />
                      )}
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
