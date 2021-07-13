import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `photo-element__delete-btn ${isOwn ? 'photo-element__delete-btn_active' : 'photo-element__delete-btn'}`
      );
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `photo-element__like ${isLiked ? 'photo-element__like_active' : 'photo-element__like'}`
      );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
          <div className="photo-element">
              <img className="photo-element__picture" src={props.card.link} alt={props.card.name} onClick={handleClick} />
              <div className="photo-element__content">
                  <h2 className="photo-element__title">{props.card.name}</h2>
                  <div className="photo-element__likes-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="photo-element__quantity">{props.card.likes.length}</p>
                  </div>
              </div>
              <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
          </div>
    )
}