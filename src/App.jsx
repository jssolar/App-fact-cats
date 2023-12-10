import { useEffect, useState } from "react"
import './App.css'
// let threeFirstWords

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=black&json=true`
// const CAT_PREFIX_IMAGE_URL = `https://cataas.com/says/`

function App() {

  const [fact, setFact ] = useState()
  const [imageUrl, setImageUrl ] = useState()

  //hacer un fectching de datos
  useEffect(()=> {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(resp => resp.json())
      .then(data => {
        const {fact} = data
        setFact(fact)
      })
        
  },[])
  
  //-----< para recuperar la imagen cada vez que tengo una cita nueva >------>
    useEffect(() => {
      if(!fact) return
      const threeFirstWords = fact.split(' ', 3).join(' ')
          console.log('firstThreeWords', threeFirstWords)
          setFact(fact)
          
          fetch(`https://cataas.com/cat/says/${threeFirstWords}`)
          .then(res => res)
          .then(response => {
              console.log('response', response)
               const { url } = response
                  setImageUrl(url)}).catch(error => {
                  console.log('error', error)})
    }, [fact])
    

    
  return (
    <>
    <main>
      <h1>App de gatitos</h1>
    
      { fact && <p>{fact}</p>}
      { imageUrl && <img src={imageUrl}  alt={`image extracted using the first three words from ${fact}` } /> }

    
    </main>
    </>
  )
}

export default App
