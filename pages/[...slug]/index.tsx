import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import MainContent from '../../components/MainContent/MainContent';
import useGetLayout from '../../hooks/useGetLayout/useGetLayout';

const X: NextPage = () => {
  const route = useRouter();
  const {
    headerOne,
    headerTwo,
    headerThree,
    contentOne,
    contentTwo,
    contentThree,
  } = useGetLayout({
    slug1: route.query?.slug?.[0],
    slug2: route.query?.slug?.[1],
  });

  return (
    <MainContent
      headerOne={headerOne?.()}
      headerTwo={headerTwo?.()}
      headerThree={headerThree?.()}
      contentOne={contentOne?.()}
      contentTwo={contentTwo?.()}
      contentThree={contentThree?.()}
    />
  );
};

export default X;
