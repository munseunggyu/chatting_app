import { useEffect, useRef, useState } from "react";
import {  useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app, { db } from "../../firebase";
import { getDatabase, ref,set } from "firebase/database";
import md5 from "md5";
import { collection, doc, setDoc } from "firebase/firestore";

function RegisterPage(){
  const [loding,setLoding] = useState(false) // 계정 생성 시 firebase에서 계정 생성될때 까지 submit버튼 비활성화
  const {register, watch, formState:{errors},handleSubmit} = useForm()
  
  const password = useRef()
  password.current = watch('password')
  const onSubmit = async (data) => {
  try{
    setLoding(true)
    const auth = getAuth(app)
    let createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
    await updateProfile(auth.currentUser,{
      displayName:data.name,
      photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
    })
      const userData =  doc(collection(db,'users'))
      await setDoc(userData,{
        email:data.email,
        displayName:data.name,
        photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      })
    setLoding(false)
  }
  catch(error){
    console.log(error.message)
  }
}
  

  return(
    <article className="auth-wrapper">
      <h1 className="h1-tit">Register</h1>
       <form
       onSubmit={handleSubmit(onSubmit)}
        >
          <label>Email</label>
      <input 
      name="email"
      type='email'
      {...register("email",{required:true,pattern:/^\S+@\S+$/i })}
      />
      {errors.email && <p>This email field is required</p>}
      <label>Name</label>
      <input
      name="name"
      {...register("name", { required: true, maxLength: 10 })}
      />
      {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
      {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

      <label>Password</label>
      <input 
      name="password"
      type='password'
      {...register("password", { required: true,minLength:6 })}
       />
       {errors.password && errors.password.type==='required' &&<p>This password field is required</p>}
       {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}
      <label>Password Confirm</label>
      <input 
      name="password_confirm"
      type='password'
      {...register('password_confirm',{required:true,validate:(value) => value === password.current})}
      />
      {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
      {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}
      <input type="submit" disabled={loding} />
      <Link to='/login' className="link">이미 아이디가 있다면...</Link>
    </form>
    </article>
  )
}

export default RegisterPage