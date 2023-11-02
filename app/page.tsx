import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from "@/components/ui/Card";
import { 
  Thermometer, 
  CloudSunRain, 
  Sunset, 
  Droplet, 
  Eye,
  CalendarDays,
  Fan,
  CloudDrizzle,
  CloudRain,
  CloudSun
} from'lucide-react';
import {tenDayData, sixDayData} from "./data";
import React from "react";

const weatherTypeIconMap = {
  cloudSunRain: <CloudSunRain size={20}/>,
  cloudDrizzle: <CloudDrizzle size={20}/>,
  cloudRain: <CloudRain size={20}/>,
  cloudSun: <CloudSun size={20}/>,
}

export default function Home() {
  return (
    <main className="p-2">
      <section className="md:hidden mx-auto grid max-w-sm gap-2 grid-cols-2">
        <div className="aspect-square col-span-2">
          <CurrentWeatherCard/>
        </div>
        <div className="col-span-2">
          <TenDayTempForecast/>
        </div>
        <div className="aspect-square">
          <FeelsLikeCard/>
        </div>
        <div className="aspect-square">
          <HumidityCard/>
        </div>
        <div className="col-span-2">
          <AirQualityCard value={15}/>
        </div>
        <div className="col-span-2">
          <SixDayAvgCard/>
        </div>
        <div className="aspect-square">
          <SunsetCard/>
        </div>
        <div className="aspect-square">
          <VisibilityCard/>
        </div>
      </section>
      <section className="hidden mx-auto md:grid gap-2 grid-cols-[1fr_1.5fr] max-w-3xl">
        <div className="flex flex-col gap-2">
          <div className="aspect-square">
            <CurrentWeatherCard/>
          </div>
          <div className="">
            <TenDayTempForecast/>
          </div>
        </div>
        <div className="grid grid-cols-2 content-start gap-2">
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="aspect-square">
            <HumidityCard/>
          </div>
          <div className="col-span-2">
            <AirQualityCard value={15}/>
          </div>
          <div className="col-span-2">
            <SixDayAvgCard/>
          </div>
          <div className="aspect-square">
            <SunsetCard/>
          </div>
          <div className="aspect-square">
            <HumidityCard/>
          </div>
        </div>
      </section>
    </main>
  );
}

function SixDayAvgCard(){
  return (
    <Card>
      <CardContent className="grid grid-cols-6 pt-6">
        {sixDayData.map(({date, weatherType, temperature}) => (
          <div className="flex flex-col items-center gap-6">
            <span className="text-xs text-neutral-400">{date}</span>
            {/* @ts-ignore */}
            <span>{weatherTypeIconMap[weatherType]}</span>
            <span className="text-xs">{temperature}<sup>&#176;</sup></span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function AirQualityCard({value}: {value: number}){
  return (
    <Card>
      <CardHeader>
        <p className="text-xs text-neutral-400 flex gap-2">
          <span><Fan size={15}/></span>Air pollution
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative h-2 rounded-full"
          style={{
            background: `linear-gradient(90deg, rgb(61, 116, 169) 0%, rgb(128, 212, 84) 20%, rgb(231, 211, 75) 38%, rgb(228, 77, 99) 59%, rgb(179, 92, 218) 80%, rgb(173, 38, 44) 100%)`
          }}
        >
          <div 
            className="absolute h-3 w-3 -translate-y-1/2 border-2 border-neutral-900 top-1/2 left-0 bg-neutral-200 rounded-full"
            style={{left: `${value}%`}}
          />
        </div>
      </CardContent>
      <CardFooter className="text-[clamp(0.5rem,3vw,0.75rem)]">
        <p>Air quality is good.</p>
      </CardFooter>
    </Card>
  )
}

function TenDayTempForecast(){
  return (
    <Card>
      <CardHeader>
        <p className="text-xs text-neutral-400 flex gap-2">
          <span><CalendarDays size={15}/></span>10-Day Forecast
        </p>
      </CardHeader>
      <CardContent className="flex flex-col">
        {tenDayData.map((data: TenDayTempForecastItemProps) => (
          <TenDayTempForecast.Item {...data}/>
        ))}
      </CardContent>
    </Card>
  )
}

interface TenDayTempForecastItemProps extends TempRangeBarProps {
  day: string,
  weatherType: string
}
TenDayTempForecast.Item = ({day, weatherType, ...rest}: TenDayTempForecastItemProps) => {
  return (
    <div className="grid grid-cols-[3fr_2fr_6fr] items-center text-sm py-3 border-b border-neutral-700 last:border-b-0">
      <span>{day}</span>
      {/* @ts-ignore */}
      <span>{weatherTypeIconMap[weatherType]}</span>
      <span>
        <TempRangeBar {...rest} />
      </span>
    </div>
  )
};

const FeelsLikeCard = () => (
  <AtomicInfoCard
    icon={<Thermometer size={15}/>}
    title="Feels Like"
    value={<span>7<sup>&#176;</sup></span>}
    description="Feels colder than the actual temperature."
  />
);

const HumidityCard = () => (
  <AtomicInfoCard
    icon={<Droplet size={15}/>}
    title="Humidity"
    value={<span>74<sup>&#176;</sup></span>}
    description="High humidity. It might feel humid and uncomfortable."
  />
);

const SunsetCard = () => (
  <AtomicInfoCard
    icon={<Sunset size={15}/>}
    title="Sunset"
    value={<span>4:38 PM</span>}
    description="Sunrise: 7:08 AM"
  />
);

const VisibilityCard = () => (
  <AtomicInfoCard
    icon={<Eye size={15}/>}
    title="Visibility"
    value={<span>10 km</span>}
    description="It's perfectly clear right now."
  />
);

interface AtomicInfoCardProps {
  icon: React.ReactNode,
  title: string,
  value: React.ReactNode,
  description: string
}
function AtomicInfoCard({
  icon,
  title,
  value,
  description
}:AtomicInfoCardProps){
  return (
    <Card className="flex flex-col h-full border-neutral-700">
      <CardHeader className="p-4">
        <h4 className="flex items-center gap-2 text-xs text-neutral-300">
          <span>{icon}</span>
          <span>{title}</span>
        </h4>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-xl font-bold">
          {value}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 text-[clamp(0.5rem,3vw,0.75rem)]">
        <p>{description}</p>
      </CardFooter>
    </Card>
  )
}

function CurrentWeatherCard(){
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="text-[clamp(0.5rem,4vw,1rem)]">
        <div className="flex justify-between items-base">
          <span>Sunday</span>
          <span>12:39:22 PM</span>
        </div>
        <p>Copenhagen</p>
      </CardHeader>
      <CardContent className=" flex-1 text-[clamp(2rem,20vw,6rem)]">
        <p className="h-full flex items-center justify-center font-bold leading-none">
          10<sup>&#176;</sup>
        </p> 
      </CardContent>
      <CardFooter>
        <div className="inline-flex flex-col items-center text-[clamp(0.6rem,4vw,1rem)]">
          <p><CloudSunRain/></p>
          <p>Rain</p>
        </div>
        <p className="text-[clamp(0.6rem,2.5vw,0.87rem)] text-neutral-500">
          H: 11<sup>&#176;</sup> L: 10<sup>&#176;</sup>
        </p>
      </CardFooter>
    </Card>
  )
}

interface TempRangeBarProps {
  tenDayMin: number,
  tenDayMax: number,
  dayMin: number,
  dayMax: number,
}
function TempRangeBar({
  tenDayMax,
  tenDayMin,
  dayMax,
  dayMin
}: TempRangeBarProps){
  
  const range = tenDayMax - tenDayMin;
  const left = ((dayMin-tenDayMin)/(range))*100;
  const right = ((dayMax-tenDayMin)/(range))*100;
  const width = right - left;

  return (
  <div className="flex gap-2 items-center w-full text-xs font-bold ">
    <span className="text-neutral-500">{dayMin} <sup>&#176;</sup></span>
    <div className="flex-1 bg-neutral-800 h-1.5 relative rounded-full">
      <div 
        className=" h-full absolute top-0 rounded-full"
        style={{
          width: `${width}%`, 
          left: `${left}%`,
          background: `linear-gradient(90deg, rgba(100,172,243,1) 0%, rgba(132,234,175,1) 100%)`

        }}
      />
    </div>
    <span className="text-neutral-400">{dayMax} <sup>&#176;</sup></span>
  </div>
  )
}