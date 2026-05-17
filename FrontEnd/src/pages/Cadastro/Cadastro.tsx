import Header from '../../components/Header/Header'
import imagemIlustracao from '../../assets/IlustracaoCadastro.svg'
import VisibilityOn from '../../assets/visibility.svg'
import VisibilityOff from '../../assets/VisibilityOff.svg'
import SuccessIcon from '../../assets/Vector.svg'
import toast, { Toaster } from 'react-hot-toast'
import './Cadastro.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

function Cadastro() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [senhaVisivel, setSenhaVisivel] = useState(false) 
    
    const [erroSenha, setErroSenha] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    
    const navigate = useNavigate()

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        setErroSenha(false)

        if (password !== confirmPassword) {
            setErroSenha(true)
            toast.error('As senhas não combinam.')
            return;
        }

        try {
            await api.post('/register', { name, email, password })
            
            setSucesso(true)
            
            setTimeout(() => {
                navigate('/')
            }, 3000)

        } catch (err) {
            toast.error('Erro ao cadastrar. Tente outro e-mail.')
        }
    }

    return(
        <>
        <Toaster position="top-right" />
        <Header variant="compact" />
        
        {sucesso && (
    <div className="CadastroModalOverlay">
        <div className="CadastroModalContent">
            <h3>
                <img src={SuccessIcon} className="IconeSucesso" alt="Sucesso" />
                <span>Conta criada com sucesso</span>
            </h3>
            <p className="TextoSubtitulo">Um instante, iremos te redirecionar ao login !</p>
        </div>
    </div>
)}

        <div className='TelaCadastro'>
            <div className='ParteCadastro'>
                <form onSubmit={handleRegister}>
                    <h1>uTask 3.0</h1>
                    <p className='DivisorTitulo'></p>
                    <h2>Crie uma conta</h2>

                    <p>Nome de usuário</p>
                    <input 
                        type="text" 
                        placeholder="Seu nome de usuário"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                            className={erroSenha ? 'InputErro' : ''}
                            type={senhaVisivel ? 'text' : 'password'}
                            placeholder="Senha secreta"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <img
                            src={senhaVisivel ? VisibilityOn : VisibilityOff}
                            className='OlhoIcon'
                            onClick={() => setSenhaVisivel(!senhaVisivel)} 
                        />
                    </div>

                    <p>Confirme a Senha</p>
                    <div className='VerSenha'>
                        <input
                            className={erroSenha ? 'InputErro' : ''}
                            type={senhaVisivel ? 'text' : 'password'}
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <img
                            src={senhaVisivel ? VisibilityOn : VisibilityOff}
                            className='OlhoIcon'
                            onClick={() => setSenhaVisivel(!senhaVisivel)} 
                        />
                    </div>
                    {erroSenha && <span className='MensagemErro'>Senhas não combinam, tente novamente.</span>}

                    <input type="submit" value="Criar Cadastro" />
                </form>
            </div>

            <div className='DivisorLateral'></div>
            <img src={imagemIlustracao} className="ImagemLateral" alt="Ilustração Cadastro" />
        </div>
        </>
    )
}

export default Cadastro;