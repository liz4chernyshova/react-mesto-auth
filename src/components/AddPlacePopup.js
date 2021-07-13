import PopupWithForm from './PopupWithForm';
import React from 'react';

export default function AddPlacePopup(props) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleTitleChange(evt) {
        setTitle(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: title,
            link: link,
        });
        setTitle('');
        setLink('');
    }
    return (
        <PopupWithForm title="Новое место" name="popupAdd" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input id="name-input" type="text" placeholder="Название" name="name" value={title} onChange={handleTitleChange} className="form__input" minLength="2" maxLength="30" required />
            <span className="name-input-error form__input-error"></span>
            <input id="link-input" type="url" placeholder="Ссылка на картинку" name="link" value={link} onChange={handleLinkChange} className="form__input" required />
            <span className="link-input-error form__input-error"></span>
        </PopupWithForm>
    );
}