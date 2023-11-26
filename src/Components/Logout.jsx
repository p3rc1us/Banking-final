import { useNavigate } from "react-router-dom";
import '../Styles/Logout.css'


function Logout() {

    const navigate = useNavigate();

    function logout(){
        localStorage.clear();
        navigate('/');
    }

    return (
            <button className="logout bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={logout}>Logout</button>
    );
};

export default Logout;

