import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
              <div className="profile__avatar-container" onClick={props.onEditAvatar}>
                  <img className="profile__avatar" alt="Аватарка." src={currentUser.avatar} />
              </div>
                <div className="profile__info">
                    <div className="profile__redactor">
                        <h1 className="profile__info-name">{currentUser.name}</h1>
                        <button type="button" className="profile__redactor-btn" value="" onClick={props.onEditProfile} ></button>
                    </div>
                    <p className="profile__info-description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__submit-btn" value="" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-elements">
                {props.cards.map((card) => (
                    <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                ))}
            </section>
        </main>  
    );
}