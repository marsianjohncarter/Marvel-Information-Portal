import { Helmet } from "react-helmet";

import AppBanner from "../components/appBanner/AppBanner";
import ComicsList from "../components/comicsList/ComicsList";

const Comics = () => {
    return (
        <>
            <Helmet>
                <meta name="description" content="Page with a list of our comics" />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ComicsList />
        </>
    );
};

export default Comics;
