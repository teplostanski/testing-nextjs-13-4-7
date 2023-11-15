import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

//const API_URL =
//  process.env.NEXT_PUBLIC_API_URL ||
//  'http://localhost:3002' ||
//  'http://localhost:3001' ||
//  'http://localhost:3000';

type Data = {
  name: string;
};

export default function Home({ hello }: any) {
  const [hello1, setHello] = useState<Data[]>([]);

  useEffect(() => {
    const fetchDataa = async () => {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/teplostanski/testing-nextjs-13-4-7/main/data.json`);
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error(`Failed to fetch hello, status: ${res.status}`);
        }

        const arr: { name: string } = await res.json();
        setHello([arr]);
        console.log('hello data:', arr);
      } catch (error) {
        console.error('Error in fetchDataa:', error);
      }
    };

    fetchDataa();
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
          <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/pages/index.tsx</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="./vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          {hello &&
            hello.map(({ name }: { name: string }) => <p key={1}>{name} static props</p>)}
        </div>
        
        <div>
          {hello1 &&
            hello1.map(({ name }: { name: string }) => <p key={10}>{name} use effect</p>)}
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Docs <span>-&gt;</span>
            </h2>
            <p>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Learn <span>-&gt;</span>
            </h2>
            <p>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Templates <span>-&gt;</span>
            </h2>
            <p>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>
              Deploy <span>-&gt;</span>
            </h2>
            <p>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/teplostanski/testing-nextjs-13-4-7/main/data.json`);
    console.log('Response status:', res.status); // Логируем статус ответа
    if (!res.ok) {
      throw new Error(`Failed to fetch hello, status: ${res.status}`);
    }

    const arr = await res.json();
    const hello = [arr];
    console.log('hello data:', hello); // Логируем полученные данные
    
    return {
      props: {
        hello,
      },
      revalidate: 60, // Re-generate the page every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        hello: [],
      },
    };
  }
}
