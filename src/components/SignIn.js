import React, { useState } from 'react'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import { logInWithEmail, resetPassword } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import './Auth.scss'
import { ClosedEye, OpenEye } from '../assets/svgs'

const SignIn = () => {
  const defaultInputs = {email: '', password: ''}
  const [inputs, setInputs] = useState(defaultInputs)
  const { email, password } = inputs
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleChange = (e) => {
    const { name, value} = e.target;
    setInputs({...inputs, [name]: value})
  }

  const handleLogin = (e) => {
    logInWithEmail(email, password)

    setInputs(defaultInputs)
  }

  const handleShow = () => {
    setShow((prevShow) => !prevShow)
  }


  return (
    <div className='auth-container'>
      <p className="text-head">Welcome back</p>
      <p className="text">Hi there! Please enter your details.</p>
      <form>
        <CustomInput value={email} name='email' onChange={(e) => handleChange(e)}>Email</CustomInput>
        <CustomInput value={password} name='password' type={show ? 'text' : 'password'} onChange={(e) => handleChange(e)} icon={show ? <ClosedEye onClick={handleShow} /> : <OpenEye onClick={handleShow} />}>Password</CustomInput>
      </form>
      <p className="reset" onClick={() => resetPassword(email)}>Forgot password?</p>
      <CustomButton size='full' onClick={(e) => handleLogin(e)}>Log in</CustomButton>
      <div className="change-auth">
        <p className='change-auth__text'>No account yet?</p>
        <p className='change-auth__link' onClick={() => navigate('/signup')}>Sign up.</p>
      </div>
    </div>
  )
}

export default SignIn