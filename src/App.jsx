import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

import AppHeader from "./components/appHeader/AppHeader";
import Spinner from "./components/spinner/spinner";

const Page404 = lazy(() => import("./pages/404"));
const Home = lazy(() => import("./pages/Home"));
const CharPage = lazy(() => import("./pages/CharPage"));
const Comics = lazy(() => import("./pages/Comics"));
const SingleComic = lazy(() => import("./pages/SingleComic"));

const App = () => {
    const [selectedChar, setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    };

    return (
        <div className="app">
            <AppHeader />
            <main>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    selectedChar={selectedChar}
                                    onCharSelected={onCharSelected}
                                />
                            }
                        />
                        <Route path="/characters/:charId" element={<CharPage />} />
                        <Route path="/comics" element={<Comics />} />
                        <Route
                            path="/comics/:comicId"
                            element={<SingleComic />}
                        ></Route>
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
};

export default App;

