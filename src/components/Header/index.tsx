import Image from "next/image";
import { HeaderContainer, HeaderContent } from "./styles";

import logo from "../../assets/imgs/logo.png";

import { BiUser } from "react-icons/bi";
import { AiOutlineHome, AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/">
          <Image src={logo} width={120} height={120} alt="logo" priority/>
        </Link>

        <nav>
          <ul>
            <li>
              <Link href="/">
                <AiOutlineHome size={18} />
                Home
              </Link>
            </li>
            <li>
              <Link href="/favorites">
                <AiOutlineHeart size={18} />
                Favoritos
              </Link>
            </li>
            <li>
              <Link href={!!user ? "/account" : "/auth"}>
                <BiUser size={18} />
                {!!user?.name ? user.name : "Account"}
              </Link>
            </li>
            {!!user && (
              <li>
                <button onClick={() => logout()}>
                  <AiOutlineLogout size={24} color="#fff" />
                </button>
              </li>
            )}
          </ul>
        </nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
