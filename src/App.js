import { Navbar, Footer } from "./Components/Layout";
import { Home, Standings, News, Faq, Cabang, CabangDetail, Galeri, Katalog,KatalogDetail } from "./Pages";
import { Switch, Route } from "react-router-dom";
import ScrollIntoView from "./Components/Layout/hooks/ScrollIntoView";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollIntoView>
        <Switch>
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            exact
            component={Home}
          ></Route>
          <Route
            path={`${process.env.PUBLIC_URL}/klasemen`}
            exact
            component={Standings}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/cabang`}
            exact
            component={Cabang}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/cabang/:id`}
            render={(props) => <CabangDetail {...props} />}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/berita`}
            exact
            component={News}
          />
            <Route
            path={`${process.env.PUBLIC_URL}/galeri`}
            exact
            component={Galeri}
          />
          <Route 
            path={`${process.env.PUBLIC_URL}/faq`} 
            exact 
            component={Faq} />
          <Route 
            path={`${process.env.PUBLIC_URL}/katalog`} 
            exact 
            component={Katalog} />
          <Route
            path={`${process.env.PUBLIC_URL}/katalog/:id`}
            render={(props) => <KatalogDetail {...props} />}
          />
        </Switch>
      </ScrollIntoView>
      <Footer />
    </div>
  );
}

export default App;
