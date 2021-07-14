import React from 'react';

export default function Login(props) {

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
        if (!email || !password) { 
            return; 
        } 
        props.onLogin(email, password); 
    } 
 

    return (
        <main className="content">
            <section className="login">
              <div className="login__container">
              <h2 className="login__title">Вход</h2>
                <form name="login__form" onSubmit={handleSubmit} className="login__form">
                    <input id="email" type="email" placeholder="Email" value={email} onChange={handleChange} name="email" className="login__input" required />
                    <span className="email-input-error login__input-error"></span>
                    <input id="password" type="password" placeholder="Пароль" value={password} onChange={handleChange} name="password" className="login__input" required />
                    <span className="password-input-error login__input-error"></span>
                    <button type="submit" className="login__save-btn">Войти</button>
                </form>
              </div>
            </section>
        </main>
    );
}