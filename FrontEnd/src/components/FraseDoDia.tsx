import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './FraseDoDia.css';

function FraseDoDia() {
    const [frase, setFrase] = useState<string>('Carregando a frase do dia...');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { theme } = useTheme();

    const lampadaIcon = theme === 'dark' ? "/assets/LampadaBranca.svg" : "/assets/LampadaAmarela.svg";

    useEffect(() => {
        const fetchFrase = async () => {
            try {
                const adviceResponse = await fetch('https://api.adviceslip.com/advice');
                const adviceData = await adviceResponse.json();
                const textoIngles = adviceData.slip.advice;

                const translateResponse = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textoIngles)}&langpair=en|pt-br`
                );
                const translateData = await translateResponse.json();
                const textoTraduzido = translateData.responseData.translatedText;
                
                setFrase(textoTraduzido || textoIngles);
            } catch (error) {
                console.error("Erro ao buscar a frase:", error);
                setFrase("Não foi possível carregar a frase do dia.");
            }
        };
        fetchFrase();
    }, []);

    return (
        <div className={`FraseDoDiaContainer ${theme}`}>
            {/* BANNER DESKTOP */}
            <div className="FraseBanner">
                <div className="FraseHeader">
                    <div className="FraseIconBox">
                        <img src={lampadaIcon} alt="Lâmpada" className="LampadaIcon" />
                    </div>
                    <h3>Frase do dia</h3>
                </div>
                <p className="TextoDaFrase">"{frase}"</p>
            </div>

            {/* BOTÃO MOBILE */}
            <button className="FraseBotaoMobile" onClick={() => setIsModalOpen(true)}>
                Ver Frase do Dia
            </button>

            {/* MODAL MOBILE */}
            {isModalOpen && (
                <div className="ModalOverlay" onClick={() => setIsModalOpen(false)}>
                    <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
                        <div className="FraseHeaderModal">
                             <div className="FraseIconBox">
                                <img src={lampadaIcon} alt="Lâmpada" className="LampadaIcon" />
                            </div>
                            <h3>Frase do dia</h3>
                        </div>
                        <p className="TextoDaFrase">"{frase}"</p>
                        <button className="FecharModal" onClick={() => setIsModalOpen(false)}>
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FraseDoDia;