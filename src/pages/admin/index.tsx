import { useState, type FormEvent, useEffect } from "react"
import { Header } from "../../components/header"
import { Input } from "../../components/input"

import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore"
// autoID, 

interface LinkProps{
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string,
}

export function Admin(){
  const [nameInput,setNameInput] = useState('')
  const [urlInput,setUrlInput] = useState('')
  const [textColorInput,setTextColorInput] = useState('#f1f1f1f1')
  const [bgColorInput, setBgColorInput] = useState('#121212')
  const [links,setLinks] = useState<LinkProps[]>([])

  useEffect(()=>{
    const linkRef = collection(db, 'links')
    const queryRef = query(linkRef, orderBy('created', 'asc'))

    const unsub = onSnapshot(queryRef, (snapshot)=>{
      let lista = [] as LinkProps[]

      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        })
      })
      setLinks(lista) 
    })
    return()=>{
      unsub()
    }
  }, [])

  async function handleRegister(e: FormEvent){
    e.preventDefault();
      if(nameInput=== '' || urlInput === ''){
        alert('vazio')
        return;
      }
      addDoc(collection(db, 'links'),{
        name: nameInput,
        url: urlInput,
        bg: bgColorInput,
        color: textColorInput,
        created: new Date()
      })
      .then(()=>{
        console.log('Cadastrado com sucesso');
        setUrlInput('')
        setNameInput('')
      })
      .catch((error)=>{
        console.log('Erro ao cadastrar' + error);
        
      })
  }

  async function handleDelete(id: string){
    const docRef = doc(db, 'links', id)
    await deleteDoc(docRef)
  }

  return(
    <div className="flex items-center flex-col min--screen pb-7 px-2">
      <Header/>

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
        <label className="text-white font-medium mt-2 ">Nome do link</label>
        <Input 
        value={nameInput}
        onChange={(e)=> setNameInput(e.target.value)}
        placeholder="Digite o nome do link..."/>

        <label className="text-white font-medium mt-2 ">Url do link</label>
        <Input 
        type='url'
        value={urlInput}
        onChange={(e)=> setUrlInput(e.target.value)}
        placeholder="Digite a url..."/>

        <section className="flex my-4 pag-5">
          <div className="flex gap-2">
          <label className="text-white font-medium mt-2 ">Cor do link</label>
          <input 
          onChange={(e)=>setTextColorInput(e.target.value)}
          type="color" 
          value={textColorInput}/>            
          </div>

          <div className="flex gap-2 ml-2">
          <label className="text-white font-medium mt-2 ">Fundo do link</label>
          <input 
          onChange={(e)=>setBgColorInput(e.target.value)}
          type="color" 
          value={bgColorInput}/>            
          </div>
        </section>  

        {nameInput !== '' && (
        <div className="flex items-center justify-center flex-col mb-7 p-1 border-1 border-gray-100/25 rounded-md">
          <label className="text-white font-medium mt-2 ">Veja como está ficando</label>
          <article 
          className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
          style={{marginBottom: 8, marginTop:8, backgroundColor: bgColorInput}}>

          <p className="font-medium" style={{color:textColorInput}}>{nameInput}</p>
          </article>
        </div>
        )}

      <button className="bg-blue-600 h-9 rounded-md text-white text-medium gap-4 flex justify-center items-center mb-7" type="submit">
        Cadastrar
      </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">
        Meus links
      </h2>

        {links.map((link)=>(
      <article key={link.id} style={{backgroundColor: link.bg, color: link.color}}
      className="w-11/12 max-w-xl flex items-center justify-between rounded py-3 px-2 mb-2 select-none">
        <p>{link.name}</p>
        <div>
          <button onClick={()=> handleDelete(link.id)} 
          className="border border-dashed p-1 rounded bg-neutral-900">
            <FiTrash size={18} color="#FFF"/>
          </button>
        </div>
      </article>
    ))}
    </div>
  )
}
