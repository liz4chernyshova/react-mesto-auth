import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function PopupWithConfirm(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onCardDeleteConfirm(props.cardId);
    };

    return(
        <PopupWithForm title="Вы уверены?" name="popupDelete" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Да">
        </PopupWithForm>
    )
}