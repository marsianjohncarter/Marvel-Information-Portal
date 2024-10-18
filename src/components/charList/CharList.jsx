import { useState, useEffect, useRef, createRef, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charList.scss";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case "waiting":
            return <Spinner />;
        case "loading":
            return newItemLoading ? <Component /> : <Spinner />;
        case "confirmed":
            return <Component />;
        case "error":
            return <ErrorMessage />;
        default:
            throw new Error("Unexpected process state");
    }
};

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [lastSelectedItem, setLastItemSelected] = useState(null);
    const [charEnded, setCharEnded] = useState(false);

    const { getAllCharacters, process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = useCallback(
        (offset, initial = false) => {
            setNewItemLoading(!initial);
            getAllCharacters(offset)
                .then(onCharListLoaded)
                .then(() => setProcess("confirmed"))
                .catch(() => setProcess("error"));
        },
        [getAllCharacters, setProcess]
    );

    const onCharListLoaded = (newCharList) => {
        setCharList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setCharEnded(newCharList.length < 9);
    };

    const itemRefs = useRef([]);

    const setItemSelected = (index) => {
        setLastItemSelected(index);
        itemRefs.current.forEach((item, i) => {
            if (item) {
                if (i === index) {
                    item.classList.add("char__item_selected");
                } else {
                    item.classList.remove("char__item_selected");
                }
            }
        });
    };

    const renderItems = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };
            if (
                item.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
                imgStyle = { objectFit: "unset" };
            }
    
            const nodeRef = createRef();
    
            return (
                <CSSTransition
                    key={item.id}
                    nodeRef={nodeRef}
                    timeout={200}
                    classNames="item"
                >
                    <li
                        className={`char__item ${lastSelectedItem === i ? 'char__item_selected' : ''}`}
                        tabIndex={0}
                        ref={(el) => {
                            itemRefs.current[i] = el;
                            nodeRef.current = el;
                        }}
                        onClick={() => {
                            if (lastSelectedItem === i) {
                                setItemSelected(null);
                            } else {
                                props.onCharSelected(item.id);
                                setItemSelected(i);
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                                if (lastSelectedItem === i) {
                                    setItemSelected(null);
                                } else {
                                    props.onCharSelected(item.id);
                                    setItemSelected(i);
                                }
                            }
                        }}
                        onMouseOver={() => {
                            if (lastSelectedItem !== i) {
                                itemRefs.current[i]?.classList.add("char__item_hover");
                            }
                        }}
                        onMouseOut={() => {
                            if (lastSelectedItem !== i) {
                                itemRefs.current[i]?.classList.remove("char__item_hover");
                            }
                        }}
                    >
                        <img
                            src={item.thumbnail}
                            alt={item.name}
                            style={imgStyle}
                            className="char__img_item"
                        />
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            );
        });
    
        return (
            <TransitionGroup component="ul" className="char__grid">
                {items}
            </TransitionGroup>
        );
    };
    

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
    }, [process, charList, newItemLoading]);

    return (
        <div className="char__list">
            {elements}
            {!charEnded && (
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => onRequest(offset)}
                >
                    <div className="inner">load more</div>
                </button>
            )}
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
