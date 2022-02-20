import { useState } from 'react';
import Cookies from 'js-cookie';


function Register(props) {
    const [state, setState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    })

    const handleInput = (event) => {
        const { name, value } = event.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleError = (err) => {
        console.log(err);
    }

    const handleCreateSubmit = async event => {
        event.preventDefault();
        if (state.password1 !== state.password2) {
            alert('Passwords to not match, please try again')
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch('/rest-auth/registration/', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            props.setAuth(true);
            props.setAccount(false);
        }
    }

    const backToLogin = () => {
        props.setAccount(true)
    }

    return (
        <>
        <h1 className='loginHeader'>Slackalack Registration <span className="dot"></span></h1>
        <div className='loginPlacholder'>
        <form onSubmit={handleCreateSubmit}>
            <div className='col loginField'>
                <label htmlFor='username'>Username</label>
                <input type='text' className='inputField' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
            </div>
            <div className='col loginField'>
                <label htmlFor='email'>Email</label>
                <input type='email' className='inputField' name='email' id='email' placeholder='email' onChange={handleInput} required value={state.email} />
            </div>
            <div className='col loginField'>
                <label htmlFor='password1'>Password</label>
                <input type='password'  className='inputField'name='password1' id='password' placeholder='password' onChange={handleInput} required value={state.password1}></input>
            </div>
            <div className='col loginField'>
                <label htmlFor='password2'>Confirm Password</label>
                <input type='password' className='inputField' name='password2' id='password' placeholder='password' onChange={handleInput} required value={state.password2}></input>
            </div>
            <div className='col loginField'>
                <button type='submit' className='loginRegisterButton'>Login</button>
                <button type='button' className='loginRegisterButton' name='backToLogin' onClick={backToLogin}>Back</button>
            </div>
        </form>
        </div>
        </>
    )

}

export default Register;