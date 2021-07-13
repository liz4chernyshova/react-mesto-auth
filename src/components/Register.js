import React from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChange(evt) {
        evt.preventDefault();
        if (evt.target.name === "email") {
            setEmail(evt.target.value);
        } else if (evt.target.name === "password") {
            setPassword(evt.target.value);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onRegister(email, password);
    }

    return (
        <main className="content">
            <section className="login">
              <div className="login__container">
              <h2 className="login__title">Регистраиция</h2>
                <form name="login__form" onSubmit={handleSubmit} className="login__form">
                    <input id="email" type="email" placeholder="Email" value={email} onChange={handleChange} name="email" className="login__input" minLength="2" maxLength="40" required />
                    <span className="email-input-error login__input-error"></span>
                    <input id="password" type="password" placeholder="Пароль" value={password} onChange={handleChange} name="password" className="login__input" minLength="2" maxLength="40" required />
                    <span className="password-input-error login__input-error"></span>
                    <button type="submit" className="login__save-btn">Зарегистрироваться</button>
                </form>
                <div className="login__signup">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="login__link">Войти</Link>
                </div>
              </div>
            </section>
        </main>
    );
}