import Head from 'next/head';
import Link from "next/link";
import material from 'materialize-css/sass/materialize.scss'

function Header() {
  return (
    <header>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <nav>
        <div className="nav-wrapper">
          <Link href="/">
            <a>
              <i className="material-icons logo">terrain</i>
            </a>
          </Link>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <style jsx>{`
        .logo {
          display: inline-block;
          margin-left: 24px;
        }
        ${material}
      `}</style>
    </header>
  );
}

export default Header;
