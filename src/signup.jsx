import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

function Signup(){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [subject, setSubject] = useState();
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
    
        if (!name || !email || !password || !subject) {
            alert("All fields are required.")
            return
        }
    
        axios.post('https://server-kmyn.onrender.com/register', {name, email, password, subject})
        .then(result => {
            if(result.data === "User Already Exists") {
                alert("Email is already registered.")
            } else {
                console.log(result)
                navigate('/login')
            }
        })
        .catch(error => {
            console.error(error)
            alert("Registration failed.")
        })
    }    

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor='email'>
                            <strong>Name</strong>
                        </label>
                        <input 
                        type='text'
                        placeholder='Enter Name'
                        autoComplete='off'
                        name='name'
                        className='form-control rounded-0'
                        onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input 
                        type='email'
                        placeholder='Enter Email'
                        autoComplete='off'
                        name='email'
                        className='form-control rounded-0'
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input 
                        type='password'
                        placeholder='Enter Password'
                        autoComplete='off'
                        name='password'
                        className='form-control rounded-0'
                        onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    {/* Options */}
                    <div className="mb-3">
                        <label htmlFor="select">
                            <strong>Select One</strong>
                        </label>
                        <select
                            id="select"
                            name="subject"
                            className="form-control rounded-0"
                            onChange={(event) => setSubject(event.target.value)}
                            >
                            <option>Math</option>
                            <option>English</option>
                            <option>Science</option>
                            <option>Social Studies</option>
                            <option>Computer Science</option>
                        </select>
                    </div>
                    {/* Button */}
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Register
                    </button>
                    </form>
                    <p>Already Have An Account</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                        Login
                    </Link>
            </div>
        </div>

    )
}

export default Signup;