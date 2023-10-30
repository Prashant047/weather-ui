export default function Home() {
  return (
    <div className="p-8">
      <TempRangeBar
        tenDayMin={7}
        tenDayMax={11}
        dayMax={11}
        dayMin={8}
      />
    </div>
  );
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
        className="bg-[#65a5f4] h-full absolute top-0 rounded-full"
        style={{width: `${width}%`, left: `${left}%`}}
      />
    </div>
    <span className="text-neutral-400">{dayMax} <sup>&#176;</sup></span>
  </div>
  )
}