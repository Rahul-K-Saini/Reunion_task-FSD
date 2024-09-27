import Table from "@/components/Table";
import { Inter } from 'next/font/google'
 
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="pt-2 flex flex-col gap-2 antialiased bg-gray-50">
      <header className=" text-center underline underline-offset-4 font-semibold px-4">
       <h1 className={` ${inter.className} text-4xl tracking-wide text-gray-900`}>Shopping Table</h1> 
      </header>
      <section>
        <Table />
      </section>
    </main>
  );
}
