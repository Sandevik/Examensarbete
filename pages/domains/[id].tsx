import { useRouter } from 'next/router'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import useCheckLike from '../../hooks/useCheckLike'
import { useSingleDomain } from '../../hooks/useSingleDomain'
import LikeButton from '../../components/LikeComponents/LikeButton'
import useAuth from '../../Auth/hooks/useAuth'
import { IDomainValues } from '../../types'
import { useState , useEffect } from 'react'
import { removeDomain } from '../../controllers/removeDomain'
import { changeDomainObject } from '../../controllers/changeDomainObject'



export default function id() {
    const router = useRouter()
    const {id} = router.query
    const {domains: domain, loading} = useSingleDomain(id?.toString())
    const {isLiked} = useCheckLike(domain, loading)
    const {user, loading: userLoading} = useAuth()
    const [domainProps, setDomainProps] = useState<IDomainValues>()

    useEffect(()=>{
      setDomainProps(domain)
    },[domain])

    const handlePreviewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDomainProps({...domainProps, onPreview: e.target.value == "1" ? true : false} as IDomainValues)
    }
    const handleHiddenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDomainProps({...domainProps, hidden: e.target.value == "1" ? true : false} as IDomainValues)
    }
    const pushChangesToFirebase = () => {
      changeDomainObject(domain?.id, domainProps)
      alert("sparat")

      setDomainProps(domain)
    }
    
  return (
    <div>
        {loading && userLoading ? <Loading /> : 
        <Wrapper>
          <h1>{domainProps?.id}</h1>
          <h2>Tillgänglig: {domainProps?.availableBy}</h2>
          <div>Domän Auktoritet: {domainProps?.domainAuthority}</div>
          <div>Domännamnsklassning: {domainProps?.domainNameRating}</div>
          <div>Kodat Domännamn: {domainProps?.encodedDomainUrl}</div>
          <div>Externa Länkar: {domainProps?.externalLinks}</div>
          <div>Senast krypt: {domainProps?.lastCrawled}</div>
          <div>Antagligen ledig: {domainProps?.likelyFree?.toString()}</div>
          <div>Sid Auktoritet: {domainProps?.pageAuthority}</div>
          <div>Sid Titel: {domainProps?.pageTitle}</div>
          <div>Sidor Krypta Från Rotdomän: {domainProps?.pagesCrawledFromRoot}</div>
          <div>Sidlänkar till Sidan: {domainProps?.pagesToPage}</div>
          <div>Spam Poäng: {domainProps?.spamScore}</div>
          
          {domain && <LikeButton isLiked={isLiked} domain={domain}/>}

          {user?.userType === "admin" ? 
          <AdminControls>
            <div>Förhandsvisning: 
              <select name="preview" onChange={(e)=>handlePreviewChange(e)}>
                {domainProps?.onPreview ? 
                  <>
                  <option value="1">Aktiv</option>
                  <option value="0">Inaktiv</option>
                  </>
                  :
                  <>
                    <option value="0">Inaktiv</option>
                    <option value="1">Aktiv</option>
                  </>
                }
              </select>
            </div>
            
            <div>
              Dold:  
              <select name="hidden" onChange={(e)=> handleHiddenChange(e)}>
                {domainProps?.hidden ? 
                  <>
                  <option value="1">Ja</option>
                  <option value="0">Nej</option>
                  </>
                  :
                  <>
                    <option value="0">Nej</option>
                    <option value="1">Ja</option>
                  </>
                }
              </select></div>
              {domain !== domainProps && <button onClick={()=>pushChangesToFirebase()}>Spara ändring</button>}
            <button onClick={()=>removeDomain(domain)}>Ta bort domän</button>
          </AdminControls>
          :
          ""
          }
          
        </Wrapper>
        
        }
    </div>
  )
}

const Wrapper = styled.div`
  background-color: #d15252;
  max-width: 1440px;
  margin-inline:auto;
  height: calc(100vh - 8em);
  padding-inline: 1em;
`;

const AdminControls = styled.div`

`;