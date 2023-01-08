import React, { useState } from 'react'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import {createUserWithEmail} from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import './Auth.scss'
import { ClosedEye, OpenEye } from '../assets/svgs'

const SignUp = () => {
  const defaultInputs = {userName: '', email: '', password: '', confirmPassword: ''}
  const [inputs, setInputs] = useState(defaultInputs)
  const { userName, email, password, confirmPassword } = inputs
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const handleChange = (e) => {
    const { name, value} = e.target;
    setInputs({...inputs, [name]: value})
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    } 

    try {
      const { user } = await createUserWithEmail(email, password)

      navigate('/')
    } catch (err) {
      console.log(err)
    }

    setInputs(defaultInputs)
  }

  const handleShow = () => {
    setShow((prevShow) => !prevShow)
  }

  return (
    <div className='auth-container'>
      <p className="text-head">Hello there!</p>
      <p className="text">Please sign up using your email.</p>
      <form>
        <CustomInput value={userName} name='userName' onChange={(e) => handleChange(e)}>User Name</CustomInput>
        <CustomInput value={email} name='email' onChange={(e) => handleChange(e)}>Email</CustomInput>
        <CustomInput value={password} name='password' type={show ? 'text' : 'password'} onChange={(e) => handleChange(e)} icon={show ? <ClosedEye onClick={handleShow} /> : <OpenEye onClick={handleShow} />}>Password</CustomInput>
        <CustomInput value={confirmPassword} name='confirmPassword' type='password' onChange={(e) => handleChange(e)}>Confirm Password</CustomInput>
        <CustomButton size='full' onClick={(e) => handleSignup(e)}>Sign Up</CustomButton>
      </form>
      <div className='change-auth'>
            <p className='change-auth__text'>Already have an account?</p>
            <p className='change-auth__link' onClick={() => navigate('/')}>Log in.</p>
        </div>
    </div>
  )
}

export default SignUp