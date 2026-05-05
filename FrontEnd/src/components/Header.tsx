import './Header.css'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
    variant?: 'full' | 'compact';
}

function Header({ variant = 'full' }: HeaderProps) {
    const { theme, toggleTheme } = useTheme();

    // Se o tema for light, usa a logo branca. Se for dark, usa a azul
    const logoImg = theme === 'light' ? "/assets/Logo_Branca.svg" : "/assets/LogoAzul.svg";
    
    const sunIcon = "/assets/light_mode.svg";
    const moonIcon = "/assets/dark_mode.svg";

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
                            src={theme === 'light' ? sunIcon : moonIcon} 
                            alt="Icone Tema" 
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header