import img from './Error.gif'

const ErrorMessage = () => {
    return (
        <img alt='Error' style={{ display: 'block', width: "250px", height: "250px",objectFit: 'contain', margin: "30px auto"}} src={img}/>
    )
}

export default ErrorMessage;