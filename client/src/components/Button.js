const Button = ({ color, text, onClick}) => {
    return (
        <button 
            onClick={onClick} 
            style={ {backgroundColor: color} } 
            className="btn"
        > 
           <strong> {text}  </strong> 
        </button>
    )
}

export default Button
