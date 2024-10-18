import { Formik, Field, ErrorMessage, Form } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import * as Yup from "yup";

import "./searchChars.scss";

const SearchChars = () => {
    const { loading, error, getCharacterByName, clearError } = useMarvelService();
    const [char, setChar] = useState(null);

    const handleSubmit = ({name}) => {
        clearError();
        
        getCharacterByName(name).then((data) => {
            console.log(data)
            data ? setChar(data) : setChar('Not found');
        });
    };
    
    const results = !char ? null : char.length > 0 ? (
        <div className="char__search-wrapper">
            <div className="char__search-success">
                Character Found! Visit {char[0].name}'s page?
            </div>

            <Link
                to={`/characters/${char[0].id}`}
                className="button button__secondary"
            >
                <div className="inner">To page</div>
            </Link>
        </div>
    ) : (
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>
    );

    return (
        <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Please enter character name."),
            })}
            onSubmit={(values) => {
                handleSubmit(values);
            }}
        >
            <Form className="char__search-form">
                <label className="char__search-label" htmlFor="name">
                    Find a character by name:
                </label>
                <div className="char__search-wrapper">
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                    />
                    <button
                        type="submit"
                        className="button button__main"
                        disabled={loading}
                    >
                        <div className="inner">find</div>
                    </button>
                    
                </div>
                <ErrorMessage className="char__search-error" name={"name"} component="div" />
            {results}
            </Form>
        </Formik>
    );
};

export default SearchChars;
