import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    } 

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="popup" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} >
            <input id="heading-input" type="text" name="name" value={name || ''} placeholder="Имя" className="form__input" onChange={handleNameChange} minLength="2" maxLength="40" required />
            <span className="heading-input-error form__input-error"></span>
            <input id="subheading-input" type="text" name="about" value={description || ''} placeholder="Вид деятельности" className="form__input" onChange={handleDescriptionChange} minLength="2" maxLength="200" required />
            <span className="subheading-input-error form__input-error"></span>
        </PopupWithForm>
    );
}