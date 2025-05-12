import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';

export default function useRoutes() {
  const lang = useRecoilValue(LangAtom);

  const routes = useMemo(() => {
    return {
      tildaOtzovik: () => '/ru/otzovik',
      tildaStream: () => '/ru/stream',
      stream: () => '/stream',
      home: () => `/${lang}`,
      contests: () => `/${lang}/contests`,
      contest: (id = ':id') => `/${lang}/contests/${id}`,
      signIn: () => `/${lang}/signin`,
      works: () => `/${lang}/works`,
      signUp: () => `/${lang}/signup`,
      passwordReset: () => `/${lang}/passwordReset`,
      passwordConfirm: () => `/${lang}/password-recovery/confirm`,
      notFound: () => `/404`,
      work: (id = ':id') => `/${lang}/works/${id}`,
      workPreview: (id = ':id') => `/${lang}/works/preview/${id}`,
      submissionRules: () => `/${lang}/submissionRules`,
      workCreate: () => `/${lang}/workCreate`,
      workUpdate: (id = ':id') => `/${lang}/workUpdate/${id}`,
      albums: () => `/${lang}/albums`,
      album: (id = ':id') => `/${lang}/albums/${id}`,
      payment: (id = ':id') => `/${lang}/payment/${id}`,
      paymentLegal: (id = ':id') => `/${lang}/payment/${id}/legal`,
      afterPayment: () => '/afterPayment',
      account: () => `/${lang}/account`,
      jury: () => `/${lang}/jury`,
      articles: () => `/${lang}/articles`,
      article: (id = ':id') => `/${lang}/articles/${id}`,
      conference: () => `/${lang}/conference`,
      price: () => `/${lang}/price`,
      profile: (id = ':id') => `/${lang}/account/${id}`,
      cookiePolicy: () => `/${lang}/cookiePolicy`,
    };
  }, [lang]);

  return routes;
}
