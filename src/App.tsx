import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { LogIn } from "./pages/login";
import { Routes as NamedRoutes } from "./config/routes";
import { BooksPage } from "./pages/list/books";
import { CharactertsPage } from "./pages/list/characters";
import { HousesPage } from "./pages/list/houses";
import { Toolbar, Typography } from "@mui/material";
import { HouseView } from "./pages/view/house";

import { QueryClient, QueryClientProvider } from "react-query";
import { CharacterView } from "./pages/view/character";
import { BookView } from "./pages/view/book";
import { NavLink } from "./components/nav-link";
import { UserProvider } from "./context/user-context";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <Toolbar sx={{ flexWrap: "wrap", gap: "1rem" }}>
              <Typography
                variant="h1"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                GOT Fan app
              </Typography>
              <nav>
                <NavLink to={NamedRoutes.BOOKS}>Books</NavLink>
                <NavLink to={NamedRoutes.CHARACTERS}>Characters</NavLink>
                <NavLink to={NamedRoutes.HOUSES}>Houses</NavLink>
              </nav>
            </Toolbar>
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path={NamedRoutes.LOGIN} element={<LogIn />} />
              <Route path={NamedRoutes.BOOKS} element={<BooksPage />} />
              <Route
                path={NamedRoutes.CHARACTERS}
                element={<CharactertsPage />}
              />
              <Route path={NamedRoutes.HOUSES} element={<HousesPage />} />
              <Route path={NamedRoutes.HOUSE_DETAILS} element={<HouseView />} />
              <Route
                path={NamedRoutes.CHARACTER_DETAILS}
                element={<CharacterView />}
              />
              <Route path={NamedRoutes.BOOK_DETAILS} element={<BookView />} />
              <Route path="/" element={<LogIn />} />
            </Routes>
          </UserProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
