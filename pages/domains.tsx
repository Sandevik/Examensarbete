import Head from 'next/head'
import DomainTable from '../components/DomainTable';
import Loading from '../components/Loading';
import { useAllDomains } from '../hooks/useAllDomains';
import { useDomainSort } from '../hooks/useDomainSort';


export default function domains() {
    const {filteredList, loading, updateSort} = useDomainSort()
    
    

    return (
        <div>
          <Head>
            <title>Domains</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {loading ? <Loading /> : filteredList ? <DomainTable domains={filteredList} /> : "Inga domäner kunde hittas"}

          <button onClick={()=> updateSort("availabilityDate")}>sort</button>
         
        </div>
      )
}