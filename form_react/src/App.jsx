import './App.css'
import { useForm } from "react-hook-form";
function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    let r = await fetch("http://localhost:3000/", {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
    let res = await r.text()
    console.log(data, res)
  }
  return (
    <>
      <div className="container">
        {isSubmitting && <div>Loading...</div>}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Username"
            {...register("username",
              {
                required: true,
                minLength: { value: 3, message: "min length should be above 3" },
                maxLength: { value: 8, message: "min length should be below 8" }
              }
            )
            } name='username' type="text" />
          {errors.username && <div>{errors.username.message}</div>}
          <br />
          <input
            {...register("password",
              {
                required: true,
                minLength: { value: 3, message: "min length should be above 3" },
                maxLength: { value: 8, message: "min length should be below 8" }
              }
            )} type="password" />
          {errors.password && <div>{errors.password.message}</div>}
          <br />
          <input disabled={isSubmitting} type="submit" value="submit" />
        </form>
      </div>
    </>
  )
}

export default App
