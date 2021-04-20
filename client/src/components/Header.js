const Header = ({ user }) => {
    return (
        <div className="header">
            <h1 className="welcome">Welcome {user}!</h1>
        </div>
    )
}

export default Header