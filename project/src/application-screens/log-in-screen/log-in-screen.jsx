import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {login} from '../../store/api-actions.js';
import Logo from '../../components/logo/logo.jsx';
import NavNotAuthorizedUser from '../../components/nav-not-authorized-user/nav-not-authorized-user.jsx';
import ErrorNotification from '../../components/error-notification/error-notification.jsx';

function LogInScreen(props) {
  const {
    onSubmit,
    serverError,
  } = props;

  const loginRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (passwordRef.current.value.trim()) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <NavNotAuthorizedUser />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {serverError && <ErrorNotification message={'Sorry, we can\'t authorize you. \n You need to enter valid email'} />}
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="/#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

LogInScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  serverError: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  serverError: state.serverError,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (authData) => dispatch(login(authData)),
});

export {LogInScreen};
export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);
