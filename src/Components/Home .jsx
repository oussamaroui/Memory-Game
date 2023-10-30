import { useRef, useState } from 'react';
import './Home.css'; 
import cards from './cardsData.json';

const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

const Home = () => {

    const [chosen, setChosen] = useState({
        first: null,  second: null
    });
    const [current, setCurrent] = useState({
        first: null,  second: null
    });
    const cardRefs = cards.map(() => useRef());
    const cardContent = cards.map(() => useRef());

    const play = (card, index) => {
        cardRefs[index].current.style.transform = 'rotateY(180deg)';
        setTimeout(() => {
            cardContent[index].current.style.display = 'block';
        }, 200)

        if(current.first == null){
            current.first = cardContent[index].current
            current.first.parentElement.style.pointerEvents= 'none';
        }else if(current.second == null && cardContent[index].current != current.first){
            current.second = cardContent[index].current
        }

        if(chosen.first == null){
            chosen.first = card.id
        }else if(chosen.second == null){
            chosen.second = card.id
        }

        if (chosen.first != null && chosen.second != null) {
            if(chosen.first != chosen.second){
                current.second.style.transform = 'rotateY(180deg)';
                current.first.parentElement.style.pointerEvents= 'auto';
                setTimeout(() => {
                    [current.first.parentElement.style.transform, 
                        current.second.parentElement.style.transform] = ['rotateY(0deg)', 'rotateY(0deg)'];
                    [current.first.style.display, current.second.style.display] = ['none', 'none'];
                    [current.first, current.second, chosen.first, chosen.second] = [null, null, null, null];
                }, 600);
            }else{
                [current.first.parentElement.style.backgroundColor, 
                    current.second.parentElement.style.backgroundColor] = ['white', 'white'];
                [current.first.parentElement.style.pointerEvents, 
                    current.second.parentElement.style.pointerEvents]= ['none', 'none'];
                [current.first, current.second, chosen.first, chosen.second] = [null, null, null, null];
            }
        }
    }

    return (
        <section className="section">
            <div className="sm">
                <a href="https://github.com/oussamaroui" target={'_blank'}><img width="25" height="25" src="https://img.icons8.com/ios-filled/ffffff/500/github.png" alt="github"/></a>
                <a href="https://www.linkedin.com/in/oussama-roui" target={'_blank'}><img width="25" height="25" src="https://img.icons8.com/ios-filled/ffffff/500/linkedin.png" alt="linkedin"/></a>
                <a href="https://twitter.com/oussama_roui" target={'_blank'}><img width="25" height="25" src="https://img.icons8.com/ios-filled/ffffff/500/twitterx--v2.png" alt="twitterx--v2"/></a>
            </div>

            <header>
                <h1>Memory Game</h1>
            </header>

            <div className="cards">
                {shuffledCards.map((card, index) => 
                    (<div key={index} className="card" ref={cardRefs[index]} onClick={() => play(card, index)}>
                        <span id={index} ref={cardContent[index]} className='cardContent'>{card.emoji}</span>
                    </div>))
                }
            </div><br />
            <u className='owner'>Oussama Roui</u>
        </section>
    );
}

export default Home;


{/* <div className="grid">
{Array.from({ length: 30 }).map((_, index) => (
    <div key={index} className="grid-item"></div>
))}
</div> */}
