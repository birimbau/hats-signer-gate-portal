import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import MainContent from '../../components/MainContent/MainContent';
import useGetLayout from '../../hooks/useGetLayout/useGetLayout';
import { findAction } from '../../utils/utils';

const X: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    headerOne,
    headerTwo,
    headerThree,
    contentOne,
    contentTwo,
    contentThree,
  } = useGetLayout({
    slug1: findAction(slug, 0),
    slug2: findAction(slug, 1),
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
