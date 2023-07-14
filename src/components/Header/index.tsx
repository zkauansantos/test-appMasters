import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

import logo from "../../assets/imgs/logo.png";

import { BiUser } from "react-icons/bi";
import { AiOutlineHome, AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";

import { AuthContext } from "@/contexts/AuthContext";

import {
  Hamburguer,
  HamburguerContainer,
  HeaderContainer,
  HeaderContent,
  ListNavigations,
} from "./styles";
import { useWidth } from "@/hooks/useWidth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const width = useWidth();
  const { user, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/">
          <Image src={logo} width={120} height={120} alt="logo" priority />
        </Link>

        <nav>
          <ListNavigations width={width} menuOpen={menuOpen}>
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
              <li className="logout">
                <button onClick={() => logout()}>
                  <AiOutlineLogout size={24} color="#fff" />
                </button>
              </li>
            )}
          </ListNavigations>

          {width <= 1000 && (
            <HamburguerContainer onClick={() => setMenuOpen((prev) => !prev)}>
              <Hamburguer menuOpen={menuOpen} />
            </HamburguerContainer>
          )}
        </nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
