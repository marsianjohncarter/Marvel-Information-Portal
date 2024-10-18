import { useState } from "react";
import AppBanner from "../components/appBanner/AppBanner";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useMarvelService from "../services/MarvelService";

import setContent from "../utils/setContent";

import "./CharPage.scss";

export default function CharPage() {
    const { charId } = useParams();
    const [char, setChar] = useState(null);

    const { getCharacter, process, setProcess } = useMarvelService();

    useEffect(() => {
        getCharacter(+charId)
            .then((data) => {
                setChar(data);
            })
            .then(() => setProcess("confirmed"));
    }, []);

    return (
        <>
            <AppBanner />
            {setContent(process, View, char)}
        </>
    );
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;

    return (
        <div className="char__page">
            <div className="char__page-contents">
                <img
                    className="char__page-img"
                    src={thumbnail}
                    alt={name}
                    style={{ width: "aut0", height: "200px" }}
                />
                <div>
                    {" "}
                    <h3 className="char__page-title">{name}</h3>
                </div>
                <div>
                    <p className="char__page-description">{description}</p>
                </div>
            </div>
            <ul className="char__page__comics-list">
                <h3>Comics:</h3>

                {comics.length > 0
                    ? null
                    : "No comics found for this character"}
                {comics.map((item, i) => {
                    return (
                        <li key={i} className="char__page__comics-item">
                            <Link
                                to={`/comics/${item.resourceURI.substring(
                                    item.resourceURI.lastIndexOf("/") + 1
                                )}`}
                            >
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
