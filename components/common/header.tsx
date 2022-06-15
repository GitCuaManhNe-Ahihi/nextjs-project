import { useEffect, useState } from "react";
import style from "@/styles/header.module.css";
import { useAuth } from "hooks";
import Link from "next/link";
type Props = {};

export default function Header({}: Props) {
  const { profile, logout } = useAuth();
  const [login, setLogin] = useState(false);
  const handleLogout = async () => {
    setLogin(false);
    await logout();
    console.log("logout");
  };
  useEffect(() => {
    if (Object(profile)["data"]!==undefined)
    {
      setLogin(true);
    }
  }
  , [profile]);

  return (
    <div className={style["header-container"]}>
      <div className={style.logo}>Blog</div>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
        <li>
          {!login ? (
            <Link href="/login">
              <a>Login</a>
            </Link>
          ) : (
            <a onClick={() => handleLogout()}>Logout</a>
          )}
        </li>
      </ul>
    </div>
  );
}
