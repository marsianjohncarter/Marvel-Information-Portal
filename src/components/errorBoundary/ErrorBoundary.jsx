import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
// import img from './error.gif'


class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    static getDerivedStateFromError(error) {
        return {error: true}
    }

    componentDidCatch(err, errInfo) {
        console.log(err, errInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />
        } 

        return this.props.children;

    }
}


export default ErrorBoundary;