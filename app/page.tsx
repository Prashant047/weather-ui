import {
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from "@/components/ui/Card";
import { Thermometer, CloudSunRain, Sunset, Droplet, Eye } from 'lucide-react';
import React from "react";

export default function Home() {
  return (
    <main className="p-2">
      <section className="md:hidden mx-auto grid max-w-sm gap-2 grid-cols-2">
        <div className="aspect-square col-span-2">
          <CurrentWeatherCard/>
        </div>
        <div className="border bg-blue-500 h-[500px] col-span-2"></div>
        <div className="aspect-square">
          <FeelsLikeCard/>
        </div>
        <div className="aspect-square">
          <HumidityCard/>
        </div>
        <div className="border bg-green-500 col-span-2 h-[200px]"></div>
        <div className="border bg-green-500 col-span-2 h-[200px]"></div>
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
          <div className="border bg-blue-500 h-[500px]"></div>
          <div className="border bg-red-500 h-[300px]"></div>
        </div>
        <div className="grid grid-cols-2 content-start gap-2">
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="border bg-green-500 col-span-2 h-[150px]"></div>
          <div className="border bg-green-500 col-span-2 h-[150px]"></div>
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
          <div className="aspect-square">
            <FeelsLikeCard/>
          </div>
        </div>
      </section>
    </main>
  );
}

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
  <div className="flex gap-2 items-center w-52 text-xs font-bold ">
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