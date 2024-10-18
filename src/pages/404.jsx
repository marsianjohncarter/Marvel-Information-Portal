import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <div style={{'textAlign':'center', 'fontWeight':'bold', 'fontSize':'large'}}>
                <p>No page found for this url!</p>
                <Link to="/">Go to home</Link>
            </div>
        </div>
    );
};

export default Page404;
