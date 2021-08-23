import closeIcon from '../images/close.svg';
import React from 'react';


export default function PopupWithForm(props) {
    return (
        <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : '' }`}>
          <div className="popup__container">
            <button type="button" className="popup__close-btn"><img className="popup__icon" alt="Крестик." src={closeIcon}  onClick={props.onClose} /></button>
            <form name={props.name} onSubmit={props.onSubmit} className="form">
              <h2 className="form__title">{props.title}</h2>
              {props.children}
              <button type="submit" className="form__save-btn" >{props.isLoading ? "Сохранение...": "Сохранить"}</button>
            </form>
          </div>
        </section>
    );
}