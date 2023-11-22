import { useNavigate } from "react-router-dom";
import '../Styles/Logout.css'


function Logout() {

    const navigate = useNavigate();

    function logout(){
        localStorage.clear();
        navigate('/');
    }

    return (
            <button className="logout" onClick={logout}>Logout</button>
    );
};

export default Logout;

