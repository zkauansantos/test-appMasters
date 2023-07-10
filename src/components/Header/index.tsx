import Image from "next/image";
import { HeaderContainer, HeaderContent } from "./styles";

import logo from "../../assets/imgs/logo.png";

import { BiUser } from "react-icons/bi";
import { AiOutlineStar, AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/">
          <Image src={logo} width={120} height={120} alt="logo" />
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
                <AiOutlineStar size={18} />
                Favorites
              </Link>
            </li>
            <li>
              <Link href="/auth">
                <BiUser size={18} />
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
