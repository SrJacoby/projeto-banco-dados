import { useEffect } from 'react'
import './style.css'
import TrashCan from '../../assets/trashcan.svg'
import api from '../../services/api'

function Home() {

  let users = []

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    users = usersFromApi.data
  }

  useEffect(() => {
    getUsers()
  }, [])
  
  return (
    
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Nome' name='name' type='text' />
        <input placeholder='Idade' name='age' type='number' />
        <input placeholder='E-mail' name='email' type='email' />
        <button type='button'>Cadastrar</button>
      </form>

      {users.map(user =>  (
        <div key={user.id} className='card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>E-mail: <span>{user.email}</span></p>
        </div>
        <button><img src={TrashCan}/></button>
      </div>
      ))}
      
    </div>

  )
}

export default Home
