import {useState, type FormEvent, useEffect } from 'react'
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { db } from '../../services/firebaseConnection';
import { doc, getDoc, setDoc} from 'firebase/firestore';
//criar item manual(id unico), criar id aleatorio, buscar um documento
export function Networks(){
  const [facebook,setFacebook] = useState('')
  const [instagram,setInstagram] = useState('')
  const [youtube,setYoutube] = useState('')

  useEffect(()=>{
    function loadLinks(){
      const docRef = doc(db, 'social', 'link')
      getDoc(docRef)
      .then((snapshot)=>{
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data()?.facebook)
          setInstagram(snapshot.data()?.instagram)
          setYoutube(snapshot.data()?.youtube)
        }
      })
    }
    loadLinks()
  },[])


  function handleRegister(e:FormEvent){
    e.preventDefault();

    setDoc(doc(db, 'social', 'link'), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
    .then(()=>{
      console.log('Cadastrado com sucesso');
    })
    .catch((error)=>{
      console.log('Algo deu errado' + error);
    })
  }

  return(
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
    
    <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
      <label className="text-white font-medium mb-2 mt-2">Link do Facebook</label>
      <Input type="url" placeholder="Digite a url do Facebook" 
      value={facebook}  
      onChange={(e)=> setFacebook(e.target.value)}
      />
      <label className="text-white font-medium mb-2 mt-2">Link do Instagram</label>
      <Input type="url" placeholder="Digite a url do Facebook" 
      value={instagram}  
      onChange={(e)=> setInstagram(e.target.value)}
      />
      <label className="text-white font-medium mb-2 mt-2">Link do Youtube</label>
      <Input type="url" placeholder="Digite a url do Facebook" 
      value={youtube}  
      onChange={(e)=> setYoutube(e.target.value)}
      />

        <button  
      onSubmit={handleRegister}
      type='submit'
      className='text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium' 
      >
        Salvar links
        </button>
      </form>

    </div>
  )
}