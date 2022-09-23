import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


function RegisterPage(){
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  return(
    <article className="auth-wrapper">
      <h1 className="h1-tit">Register</h1>
       <form
        // onSubmit={handleSubmit(onSubmit)}
        >
          <label>Email</label>
      <input 
      name="email"
      type='email'
      // {...register("exampleRequired", { required: true })}
       />
      {/* {errors.exampleRequired && <p>This field is required</p>} */}
      <label>Name</label>
      <input 
      name="name"
      // {...register("exampleRequired", { required: true })}
       />
      {/* {errors.exampleRequired && <p>This field is required</p>} */}
      <label>Password</label>
      <input 
      name="password"
      type='password'
      // {...register("exampleRequired", { required: true })}
       />
      {/* {errors.exampleRequired && <p>This field is required</p>} */}
     
      <label>Password Confirm</label>
      <input 
      name="password_confirm"
      type='password'
      // {...register("exampleRequired", { required: true })}
       />
      {/* {errors.exampleRequired && <p>This field is required</p>} */}

      <input type="submit" />
    </form>
    <Link to='/login' className="link">이미 아이디가 있다면...</Link>

    </article>
  )
}

export default RegisterPage