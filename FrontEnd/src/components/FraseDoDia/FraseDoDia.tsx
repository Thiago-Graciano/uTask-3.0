import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useTheme } from '../../contexts/ThemeContext';
import LampadaBranca from '../../assets/LampadaBranca.svg'
import LampadaAmarela from '../../assets/LampadaAmarela.svg'
import './FraseDoDia.css';

function FraseDoDia() {
    const [frase, setFrase] = useState<string>('Carregando...');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { theme } = useTheme();

    const lampadaIcon = theme === 'dark' ?  LampadaBranca : LampadaAmarela;

   useEffect(() => {
  const fetchFrase = async () => {
    try {
      const response = await api.get('/quote');

      setFrase(response.data.translated || response.data.original || 'Frase indisponível.');
    } catch {
      setFrase('Não foi possível carregar a frase do dia.');
    }
  };

  fetchFrase();
}, []);



    return (
        <div className={`FraseDoDiaContainer ${theme}`}>

            {/* DESKTOP */}
            <div className="FraseBanner">
                <div className="FraseHeader">
                    <div className="FraseIconBox">
                        <img src={lampadaIcon} alt="Lâmpada" className="LampadaIcon" />
                    </div>
                    <h3>Frase do dia</h3>
                </div>
                <p className="TextoDaFrase">"{frase}"</p>
            </div>

            <button className="FraseBotaoMobile" onClick={() => setIsModalOpen(true)}>
                <div className="FraseIconBox">
                    <img src={lampadaIcon} alt="Lâmpada" className="LampadaIcon" />
                </div>
                <span>Frase do dia</span>
            </button>

            {isModalOpen && (
                <div className="FraseModalOverlay" onClick={() => setIsModalOpen(false)}>
                    <div className={`FraseModalContent ${theme}`} onClick={e => e.stopPropagation()}>
                        <div className="FraseHeaderModal">
                            <div className="FraseIconBox">
                                <img src={lampadaIcon} alt="Lâmpada" className="LampadaIcon" />
                            </div>
                            <h3>Frase do dia</h3>
                            <button className="BtnFecharFrase" onClick={() => setIsModalOpen(false)}>
                                ✕
                            </button>
                        </div>
                        <p className="TextoDaFrase">{frase}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FraseDoDia;