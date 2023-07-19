import { Box } from '@chakra-ui/layout';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Content from '../components/Content/Content';
import Header from '../components/Header/Header';
import styles from '../styles/Home.module.css';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import MainContent from '../components/MainContent/MainContent';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hat Signer Gate Portal</title>
        <meta
          content='Generated by @rainbow-me/create-rainbowkit'
          name='description'
        />
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <Header />
        <MainContent />
      </main>
    </div>
  );
};

export default Home;
