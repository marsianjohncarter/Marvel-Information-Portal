import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import useMarvelService from "../services/MarvelService";
import setContent from "../utils/setContent";
import "./singleComic.scss";

const SingleComic = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { getComic, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
        .then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        console.log(comic)
        setComic(comic);
        setProcess("confirmed");
    };

    return <>{setContent(process, View, comic)}</>;
};

const View = ({ data }) => {
    const { title, description, thumbnail, pages, price, lang } = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta name="description" content={`${title} comic book`} />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages} pages</p>
                <p className="single-comic__descr">Language: {lang}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={"/comics"}>Back to all</Link>
        </div>
    );
};

export default SingleComic;
