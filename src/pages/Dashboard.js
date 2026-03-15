export default function Dashboard() {
    const Logout = () => {
        localStorage.removeItem('token');
        console.log('User logged out');
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <br />
            <a href="/login" className="btn btn-primary">
                Login
            </a>
            &nbsp;
            <button className="btn btn-danger" onClick={Logout}>
                Logout
            </button>
        </div>
    );
}