import React from 'react';
import pictureWithSucces from '../images/Union.svg';
import pictureWithReject from '../images/Reject.png';
import closeIcon from '../images/close.svg';

export default function InfoTooltip(props) {
    return (
        <section className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : '' }`}>
          <div className="popup__container">
            <button type="button" className="popup__close-btn"><img className="popup__icon" alt="Крестик." src={closeIcon}  onClick={props.onClose} /></button>
            <div className="popup__tooltip">
                    <img className="popup__tooltip-picture" src={props.success ? pictureWithSucces : pictureWithReject} alt="Статус регистрации." />
                    <p className="popup__tooltip-text">{props.success ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
          </div>
        </section>
    );
}