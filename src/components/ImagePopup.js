import closeIcon from '../images/close.svg';
import React from 'react';

export default function ImagePopup(props) {
    return (
      <section className={`popup popup-photo ${props.card ? 'popup_opened' : '' }`}>
        <div className="popup-photo__container">
          <button type="button" className="popup__close-btn" value=""><img className="popup__icon" alt="Крестик." src={closeIcon} onClick={props.onClose}/></button>
          <img alt={props.card.name} src={props.card.link} className="popup-photo__image" />
          <h3 className="popup-photo__title">{props.card.name}</h3>
        </div>
      </section>
    );
}