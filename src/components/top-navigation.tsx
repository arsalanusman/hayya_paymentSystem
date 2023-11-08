"use client"
import Image from "next/image";
import { useRouter } from 'next/router'

export default function TopNavigation({params}:any) {
  const router = useRouter();

  const language = ['en','ar']
  const languageShow = ['eng','ar']

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router
    router.push({ pathname, query }, asPath, { locale: newLocale })
  }

  return (
    <div className="bg-gradient-to-t from-[#0C4532] to-[#327886] to-100% mx-auto px-4 sm:px-20 p-2">
      <div className="flex justify-end gap-6">
        <div className="flex justify-center align-middle">
          <Image
            src="/img/Accessibilty-IMG.png"
            width={25}
            height={20}
            alt="Picture of the author"
          />
          <select
            className="bg-transparent text-white text-xs cursor-pointer focus:outline-none"
            name="Accessibility"
            id="Accessibility"
          >
            <option value="Accessibility">Accessibility</option>
            <option value="Accessibility">Accessibility</option>
          </select>
        </div>
        <div className="">
          <select
            className="bg-transparent text-white text-xs cursor-pointer focus:outline-none"
            name="language"
            id="language"
            onChange={(x)=>onToggleLanguageClick(x.target.value)}
          >
            {language && language.map((item:any,index:number)=>
              <option value={item} key={index} selected={router.locale == item}>{languageShow[index].toUpperCase()}</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}
