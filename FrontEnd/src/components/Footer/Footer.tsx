import { useTheme } from '../../contexts/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'

function Footer() {
    const { theme } = useTheme();

    return (
        <footer className={`FooterContainer ${theme}`}>
            <p className="FooterLeft">
                © Processo de Trainee <strong>Unect Jr.</strong>
            </p>
            <p className="FooterRight">
                Feito com 🤍 por <strong>Thiago Graciano</strong>
            </p>
        </footer>
    )
}

export default Footer;