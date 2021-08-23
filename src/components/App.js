import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import PopupWithConfirm from './PopupWithConfirm';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCard] = React.useState([]);
  const [cardIdToDelete, setCardIdToDelete] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isSuccess, setSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);


  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt)
          .then((res) => {
              if (res) {
                  setEmail(res.data.email);
              }
              setLoggedIn(true);
              history.push("/");
          })
          .catch((err) => {
              console.error(err);
          });
  }
  }, []);

  React.useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCard(cardData);
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoading(true);
        closeAllPopups();
      })
      .catch((err) => {
          console.log(err);
      })
      .finally(() => setIsLoading(true));
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
    .then(userAvatar => {
      setCurrentUser(userAvatar);
      setIsLoading(true);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
    .then((cardData) => {
      setCard([cardData, ...cards]);
      setIsLoading(true);
      closeAllPopups();
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => setIsLoading(false));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleCardDeleteConfirm(card) {
    api.deleteCard(card._id)
        .then(() => {
          setCard((cards) => cards.filter((c) => c._id !== card._id));
          closeAllPopups()
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
          setCard((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCard((cards) => cards.filter((c) => c._id !== card._id));
        setIsConfirmPopupOpen(true);
        setCardIdToDelete(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
          history.push("/sign-in");
          setSuccess(true);
          setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
          console.error(err);
          setSuccess(false);
          setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    return auth
        .authorize(email, password)
        .then((data) => {
            localStorage.setItem("jwt", data.token);
            setEmail(email);
            setLoggedIn(true);
            history.push("/");
        })
        .catch((err) => {
            console.error(err);
            setSuccess(false);
            setIsInfoTooltipOpen(true);
        });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignout={handleLogout} />
        <Switch>
          <ProtectedRoute exact
            path="/"
            component={Main}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn}
          />
          <Route path='/sign-in'>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path='/sign-up'>
            <Register onRegister={handleRegister} />
          </Route>
          <Route> {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>
        <Footer />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} success={isSuccess} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} isLoading={isLoading} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>
        <ImagePopup card={selectedCard !== null && selectedCard} onClose={closeAllPopups}/>
        <PopupWithConfirm isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onCardDeleteConfirm={handleCardDeleteConfirm} cardId={cardIdToDelete} isLoading={isLoading}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
