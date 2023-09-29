import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import MainContent from '../../components/MainContent/MainContent';
import useGetLayout from '../../hooks/useGetLayout/useGetLayout';
import { findAction } from '../../utils/utils';

const X: NextPage = () => {
  const router = useRouter();
  const path = router.asPath;
  const {
    headerOne,
    headerTwo,
    headerThree,
    contentOne,
    contentTwo,
    contentThree,
  } = useGetLayout({
    slug1: findAction(path, 1),
    slug2: findAction(path, 2),
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
