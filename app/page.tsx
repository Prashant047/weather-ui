export default function Home() {
  return (
    <main className="p-2">
      <section className="md:hidden mx-auto grid max-w-sm gap-2 grid-cols-2">
        <div className="border bg-red-500 h-[300px] col-span-2"></div>
        <div className="border bg-blue-500 h-[500px] col-span-2"></div>
        <div className="border bg-orange-500 h-[200px]"></div>
        <div className="border bg-stone-500 h-[200px]"></div>
        <div className="border bg-green-500 col-span-2 h-[200px]"></div>
        <div className="border bg-green-500 col-span-2 h-[200px]"></div>
        <div className="border bg-yellow-500 h-[200px]"></div>
        <div className="border bg-orange-500 h-[200px]"></div>
      </section>
      <section className="hidden mx-auto md:grid gap-2 grid-cols-[1fr_1.5fr] max-w-3xl">
        <div className="flex flex-col gap-2">
          <div className="border bg-red-500 h-[300px]"></div>
          <div className="border bg-blue-500 h-[500px]"></div>
          <div className="border bg-red-500 h-[300px]"></div>
        </div>
        <div className="grid grid-cols-2 content-start gap-2">
          <div className="border bg-orange-500 h-[190px]"></div>
          <div className="border bg-stone-500 h-[190px]"></div>
          <div className="border bg-green-500 col-span-2 h-[150px]"></div>
          <div className="border bg-green-500 col-span-2 h-[150px]"></div>
          <div className="border bg-yellow-500 h-[190px]"></div>
          <div className="border bg-orange-500 h-[190px]"></div>
          <div className="border bg-yellow-500 h-[190px]"></div>
          <div className="border bg-yellow-500 h-[190px]"></div>
          <div className="border bg-orange-500 h-[190px]"></div>
          <div className="border bg-orange-500 h-[190px]"></div>
        </div>
      </section>
    </main>
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