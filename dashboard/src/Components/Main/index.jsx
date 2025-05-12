import { makeStyles } from '@material-ui/core/styles';
import PublicRoute from 'Components/Main/Routes/PublicRoute';
import { DictionaryContext } from 'Context/Dictionaries';
import { UserContext } from 'Context/global/UserContext';
import routes from 'Dictionaries/routes';
import Album from 'Pages/Album';
import Albums from 'Pages/Albums';
import Article from 'Pages/Article';
import Articles from 'Pages/Articles';
import Contest from 'Pages/Contest';
import Cost from 'Pages/Cost';
import Costs from 'Pages/Costs';
import EditableContent from 'Pages/EditableContent';
import Home from 'Pages/Home';
import Nomination from 'Pages/Nomination';
import Nominations from 'Pages/Nominations';
import PersonalArea from 'Pages/PersonalArea';
import Place from 'Pages/Place';
import Places from 'Pages/Places';
import Report from 'Pages/Report';
import Reports from 'Pages/Reports';
import Room from 'Pages/Room';
import Rooms from 'Pages/Rooms';
import Season from 'Pages/Season';
import Seasons from 'Pages/Seasons';
import Section from 'Pages/Section';
import Sections from 'Pages/Sections';
import SignIn from 'Pages/SignIn';
import Sponsor from 'Pages/Sponsor';
import SponsorType from 'Pages/SponsorType';
import SponsorTypes from 'Pages/SponsorTypes';
import Sponsors from 'Pages/Sponsors';
import SponsorsPages from 'Pages/SponsorsPages';
import User from 'Pages/User';
import Users from 'Pages/Users';
import VotingLogs from 'Pages/VotingLogs';
import Work from 'Pages/Work';
import Works from 'Pages/Works';
import { useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute'; // PrivateRoute for Pages

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: '100%',
    overflowX: 'hidden',
    backgroundColor: 'white',
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
}));

export default function Main() {
  const [user] = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const dictionary = useContext(DictionaryContext);

  useEffect(() => {
    if (!user.logged) {
      history.push(routes.signin());
      // Api.get(Api.routes.cookies());
    }
  }, []);

  if (!dictionary) {
    return null;
  }

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Switch>
        <PublicRoute
          restricted
          exact
          path={routes.signin()}
          component={SignIn}
        />
        <PrivateRoute exact path={routes.users()} component={Users} />
        <PrivateRoute
          exact
          path={[routes.userPage(), routes.userCreate()]}
          component={User}
        />
        <PrivateRoute exact path={routes.seasons()} component={Seasons} />
        <PrivateRoute
          exact
          path={[routes.seasonPage(), routes.seasonCreate()]}
          component={Season}
        />
        <PrivateRoute
          exact
          path={[routes.contestPage(), routes.contestCreate()]}
          component={Contest}
        />
        <PrivateRoute
          exact
          path={routes.nominations()}
          component={Nominations}
        />
        <PrivateRoute
          exact
          path={[routes.nominationCreate(), routes.nominationPage()]}
          component={Nomination}
        />
        <PrivateRoute exact path={routes.articles()} component={Articles} />
        <PrivateRoute
          exact
          path={[routes.articlePage(), routes.articleCreate()]}
          component={Article}
        />
        <PrivateRoute
          exact
          path={routes.sponsorsPages()}
          component={SponsorsPages}
        />
        <PrivateRoute
          exact
          path={routes.editableContent()}
          component={EditableContent}
        />
        <PrivateRoute
          exact
          path={routes.personalArea()}
          component={PersonalArea}
        />
        <PrivateRoute
          exact
          path={routes.sponsorTypes()}
          component={SponsorTypes}
        />
        <PrivateRoute
          exact
          path={[routes.sponsorTypePage(), routes.sponsorTypeCreate()]}
          component={SponsorType}
        />
        <PrivateRoute exact path={routes.sponsors()} component={Sponsors} />
        <PrivateRoute
          exact
          path={[routes.sponsorPage(), routes.sponsorCreate()]}
          component={Sponsor}
        />
        <PrivateRoute exact path={routes.costs()} component={Costs} />
        <PrivateRoute
          exact
          path={[routes.costPage(), routes.costCreate()]}
          component={Cost}
        />
        <PrivateRoute exact path={routes.sections()} component={Sections} />
        <PrivateRoute
          exact
          path={[routes.sectionPage(), routes.sectionCreate()]}
          component={Section}
        />
        <PrivateRoute exact path={routes.works()} component={Works} />
        <PrivateRoute exact path={routes.workPage()} component={Work} />
        <PrivateRoute exact path={routes.reports()} component={Reports} />
        <PrivateRoute
          exact
          path={[routes.reportPage(), routes.reportCreate()]}
          component={Report}
        />
        <PrivateRoute exact path={routes.albums()} component={Albums} />
        <PrivateRoute
          exact
          path={[routes.albumPage(), routes.albumCreate()]}
          component={Album}
        />
        <PrivateRoute exact path={routes.places()} component={Places} />
        <PrivateRoute
          exact
          path={[routes.placePage(), routes.placeCreate()]}
          component={Place}
        />
        <PrivateRoute exact path={routes.rooms()} component={Rooms} />
        <PrivateRoute
          exact
          path={[routes.roomPage(), routes.roomCreate()]}
          component={Room}
        />
        <PrivateRoute exact path={routes.votingLogs()} component={VotingLogs} />

        <PrivateRoute exact path={routes.home()} component={Home} />
        <Route path="*" render={() => <Redirect to={routes.home()} />} />
      </Switch>
    </main>
  );
}
