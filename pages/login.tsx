import { EmptyLayout } from "@/components/layout";
import { useAuth } from "hooks";
import { useRef, useState } from "react";
import style from "../styles/login.module.css";
type Props = {};

export default function Login({}: Props) {
  const  [loading,setLoading] = useState(false);
  const userName = useRef<HTMLInputElement>(null);
  const passWord = useRef<HTMLInputElement>(null);
  const { profile, login} = useAuth({ revalidateOnMount: true });
  const handleSubmit = async () => {
    const userNameValue: string = userName.current?.value || "";
    const passWordValue: string = passWord.current?.value || "";
    if (userNameValue && passWordValue) {
      try{
        setLoading(true);
        await login({ username: userNameValue, password: passWordValue });
      }
      finally{
        setLoading(false);
      }
    }
  };
  return (
    <div className={style["form-login"]}>
      <h1>Login</h1>
      <input ref={userName} type="text" placeholder="username" />
      <input ref={passWord} type="password" placeholder="password" />
      <button onClick={() => handleSubmit()}>{loading?'loading....':'login'}</button>
    </div>
  );
}
Login.Layout = EmptyLayout;
