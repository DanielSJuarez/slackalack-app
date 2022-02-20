import { useState } from 'react';
import Cookies, { set } from 'js-cookie';


function Login(props) {
    const [state, setState] = useState({
        username: '',
        password: ''
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

    const handleSubmit = async event => {
        event.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch('/rest-auth/login/', options).catch(
            handleError
        )

        if (!response.ok) {
            throw new Error('Network response not ok!');
        } else {
            const data = await response.json();
            Cookies.set('Authorization', `Token ${data.key}`);
            props.setAuth(true);
        }
    }

    const registerAccount = () => {
        props.setAccount(false)
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='col'>
                <label htmlFor='username'>Username</label>
                <input type='text' name='username' id='username' placeholder='username' onChange={handleInput} required value={state.username} />
            </div>
            <div className='col'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' id='email' placeholder='email' onChange={handleInput} required value={state.email} />
            </div>
            <div className='col'>
                <label htmlFor='password'>Password</label>
                <input type='password' name='password' id='password' placeholder='password' onChange={handleInput} required value={state.password}></input>
            </div>
            <div className='col'>
                <button type='submit'>Login</button>
                <button type='button' name='register' onClick={registerAccount}>Register</button>
            </div>
        </form>
    )

}

export default Login;