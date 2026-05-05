import Header from '../components/Header'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { api } from '../services/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [senhaVisivel, setSenhaVisivel] = useState(false) 
  const [erroLogin, setErroLogin] = useState(false) 

  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setErroLogin(false)
    
    try {
      const response = await api.post('/login', { email, password })
      localStorage.setItem('@uTask:token', response.data.token)
      navigate('/kanban') 
    } catch (err) {
      setErroLogin(true)
    }
  }

  return (
    <div>
      <Header variant="compact" />
      <div className='TelaLogin'> 
        <img className='Ilustracao' src="./assets/TaskManagement.svg" alt="Ilustração" />
        
        <div className='Divisor'></div>

        <div className='Login'>
          <h1>uTask 3.0</h1>

          <form onSubmit={handleLogin}>
            <p>E-mail</p>
            <input 
              type="email" 
              placeholder="Endereço de e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />

            <p>Senha</p>
            <div className='VerSenha'>
              <input
                className={erroLogin ? 'InputErro' : ''}
                type={senhaVisivel ? 'text' : 'password'}
                placeholder="Senha secreta"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={senhaVisivel ? './assets/Visibility.svg' : './assets/VisibilityOff.svg'}
                className='OlhoIcon'
                onClick={() => setSenhaVisivel(!senhaVisivel)} 
              />
            </div>
            {/* Mensagem de erro */}
            {erroLogin && <span className='MensagemErro'>Senha incorreta, tente novamente.</span>}
            
            <a href="" className='EsqueceuSenha'>Esqueceu a senha?</a>
            <br />

            <input className='btn-gradient' type="submit" value="Entrar" />

            <p className='SeparadorVertical'></p>

            <Link to="/cadastro" className='NaoTemCadastro'>Não tem cadastro? Crie uma conta</Link>
          </form> 
        </div> 
      </div>
    </div> 
  )
}

export default Login;