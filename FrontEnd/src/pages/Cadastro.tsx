import Header from '../components/Header'
import imagemIlustracao from '/assets/IlustracaoCadastro.svg'
import './Cadastro.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

function Cadastro() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [senhaVisivel, setSenhaVisivel] = useState(false) 
    
    // Novos estados
    const [erroSenha, setErroSenha] = useState(false)
    const [sucesso, setSucesso] = useState(false)
    
    const navigate = useNavigate()

    async function handleRegister(e) {
        e.preventDefault()
        setErroSenha(false)

        if (password !== confirmPassword) {
            setErroSenha(true)
            return;
        }

        try {
            await api.post('/register', { name, email, password })
            
            // Ativa o modal de sucesso
            setSucesso(true)
            
            // Espera 3 segundos e manda para o login
            setTimeout(() => {
                navigate('/')
            }, 3000)

        } catch (err) {
            alert('Erro ao cadastrar. Tente outro e-mail.') // Aqui mantive alert caso seja erro de servidor/email já existente
        }
    }

    return(
        <>
        <Header variant="compact" />
        
        {/* Modal de Sucesso aparece por cima de tudo se 'sucesso' for true */}
        {sucesso && (
    <div className="ModalOverlay">
        <div className="ModalContent">
            <h3>
                <img src="./assets/Vector.svg" className="IconeSucesso" alt="Sucesso" />
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
                            src={senhaVisivel ? './assets/Visibility.svg' : './assets/VisibilityOff.svg'}
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
                            src={senhaVisivel ? './assets/Visibility.svg' : './assets/VisibilityOff.svg'}
                            className='OlhoIcon'
                            onClick={() => setSenhaVisivel(!senhaVisivel)} 
                        />
                    </div>
                    {/* Mensagem de erro de senhas diferentes */}
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