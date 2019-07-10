import Head from 'next/head';
import Link from "next/link";
import Header from "../components/header";
import material from 'materialize-css/sass/materialize.scss'

function Index() {
  return (
    <main>
      <Head>
        <title>Sync Battle</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <Header />
      <section className="content">
        <Link href="/about">
          <a>Go to About Me</a>
        </Link>
      </section>
      <style jsx>{`
        ${material}
        .content {

        }
      `}</style>
    </main>
  );
}

export default Index;
