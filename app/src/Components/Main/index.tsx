import Home from 'Pages/Home';
import Contests from 'Pages/ContestPages/Contests';
import Contest from 'Pages/ContestPages/Contest';
import React from 'react';
import dictionaryAtom from 'Recoil/Atoms/dictionary';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountPage from 'Pages/ProfilePages/ProfilePage';
import { useRecoilValue } from 'recoil';
import useRoutes from 'Hooks/useRoutes';
import SignIn from 'Pages/AuthPages/SignIn';
import SignUp from 'Pages/AuthPages/SignUp';
import ResetPassword from 'Pages/AuthPages/ResetPassword';
import ConfirmPassword from 'Pages/AuthPages/ResetPassword/Confirm';
import WorkPage from 'Pages/WorkPages/Work';
import WorkCreate from 'Pages/ProfilePages/WorkCreate';
import WorksPage from 'Pages/WorkPages/Works';
import seasonAtom from 'Recoil/Atoms/Season';
import Conference from 'Pages/Conference';
import Price from 'Pages/Price';
import User from 'Pages/ProfilePages/UserProfile';
import Jury from 'Pages/JuryPages/Jury';
import Articles from 'Pages/Articles';
import Article from 'Pages/Article';
import Payment from 'Pages/ProfilePages/Payment';
import WorkUpdate from 'Pages/ProfilePages/WorkUpdate';
import Albums from 'Pages/AlbumPages/Albums';
import Album from 'Pages/AlbumPages/Album';
import LegalPayment from 'Pages/LegalPayment';
import CookiePolicy from 'Pages/CookiePolicy';
import OtzovikTilda from 'Pages/OtzovikTilda';
import Stream from 'Pages/Stream';
import StreamTilda from 'Pages/StreamTilda';
import PrivateRouteWrapper from './PrivateRouteWrapper';
import PublicRoute from './PublicRouteWrapper';

export default function Main() {
  const ROUTES = useRoutes();
  const dictionary = useRecoilValue(dictionaryAtom);
  const current = useRecoilValue(seasonAtom);

  if (!dictionary || !current) {
    return null;
  }

  return (
    <main>
      <Routes>
        <Route
          path={ROUTES.account()}
          element={
            <PrivateRouteWrapper>
              <AccountPage />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path={ROUTES.workCreate()}
          element={
            current?.show_request_work_button ? (
              <PrivateRouteWrapper>
                <WorkCreate />
              </PrivateRouteWrapper>
            ) : (
              <Navigate to={ROUTES.home()} replace />
            )
          }
        />

        <Route
          path={ROUTES.workUpdate()}
          element={
            <PrivateRouteWrapper>
              <WorkUpdate />
            </PrivateRouteWrapper>
          }
        />
        <Route
          path={ROUTES.payment()}
          element={
            <PrivateRouteWrapper>
              <Payment />
            </PrivateRouteWrapper>
          }
        />
        <Route path={ROUTES.contests()} element={<Contests />} />
        <Route path={ROUTES.contest()} element={<Contest />} />
        <Route path={ROUTES.workPreview()} element={<WorkPage preview />} />
        <Route path={ROUTES.work()} element={<WorkPage />} />
        <Route path={ROUTES.home()} element={<Home />} />
        <Route path={ROUTES.albums()} element={<Albums />} />
        <Route path={ROUTES.album()} element={<Album />} />
        <Route path={ROUTES.cookiePolicy()} element={<CookiePolicy />} />
        <Route
          path={ROUTES.signIn()}
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.signUp()}
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.passwordReset()}
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.works()} element={<WorksPage />} />
        <Route path={ROUTES.jury()} element={<Jury />} />
        <Route path={ROUTES.articles()} element={<Articles />} />
        <Route path={ROUTES.article()} element={<Article />} />
        <Route
          path={ROUTES.afterPayment()}
          element={<Navigate to={ROUTES.account()} />}
        />
        <Route path={ROUTES.price()} element={<Price />} />
        <Route path={ROUTES.profile()} element={<User />} />
        <Route
          path={ROUTES.passwordConfirm()}
          element={
            <PublicRoute>
              <ConfirmPassword />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.conference()} element={<Conference />} />
        <Route path={ROUTES.paymentLegal()} element={<LegalPayment />} />
        <Route path={ROUTES.tildaOtzovik()} element={<OtzovikTilda />} />
        <Route path={ROUTES.tildaStream()} element={<StreamTilda />} />
        <Route path={ROUTES.stream()} element={<Stream />} />
        <Route path="*" element={<Navigate to={ROUTES.home()} replace />} />
      </Routes>
    </main>
  );
}
