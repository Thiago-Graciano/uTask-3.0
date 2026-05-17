import './Header.css'
import LogoBranca from '../../assets/Logo_Branca.svg'
import LogoAzul from '../../assets/LogoAzul.svg'
import LightMode from '../../assets/light_mode.svg'
import DarkMode from '../../assets/dark_mode.svg'
import { useTheme } from '../../contexts/ThemeContext'
import { Link } from 'react-router-dom'; 

interface HeaderProps {
    variant?: 'full' | 'compact';
}

function Header({ variant = 'full' }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();

    const logoImg = theme === 'light' ? LogoBranca : LogoAzul;

    return (
        <header className={`header ${variant} ${theme}`}>
            <div className="HeaderLeft">
                <img src={logoImg} alt="uTask Logo" className="HeaderLogo" />
            </div>

            {variant === 'full' && (
                <h1 className="HeaderTitle">uTask 3.0</h1>
            )}

            <div className="HeaderRight">
                <div className={`ThemeSwitcher ${theme}`} onClick={toggleTheme}>
                    <div className="SwitchCircle">
                        <img 
                            src={theme === 'light' ? LightMode : DarkMode} 
                            alt="Icone Tema" 
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header