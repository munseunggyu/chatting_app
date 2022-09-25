import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';
import app from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("")
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {

  try {
    setLoading(true)
    const auth = getAuth(app)
    await signInWithEmailAndPassword(auth,data.email, data.password);
    setLoading(false)
    console.log('로그인 완료')
  } catch (error) {
    setErrorFromSubmit(error.message)
    setLoading(false)
  }}
  return (
  <article className="auth-wrapper">
    <h1 className='h1-tit'>Login</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
      name="email"
      type="email"
      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && <p>This email field is required</p>}
      <label>Password</label>
      <input
      name="password"
      type="password"
      {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
      {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}
      {errorFromSubmit &&
      <p>{errorFromSubmit}</p>
      }
      <input type="submit" disabled={loading} />
      <Link className='link' to="/register">아직 아이디가 없다면... </Link>
    </form>
  </article>
  )}



  export default LoginPage
