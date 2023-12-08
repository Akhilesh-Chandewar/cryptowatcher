import Header from "@/components/Header";
import CryptoTable from "@/components/cryptotable/CryptoTable";

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Header/>
      <div className='mt-10' />
      <CryptoTable/>
    </div>
  )
}
