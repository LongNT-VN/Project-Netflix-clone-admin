import './TopBar.scss'
import { Notifications, Public, Settings } from '@material-ui/icons'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext/AuthContext';
import { logoutfunc } from '../../context/authContext/apiCall';

const TopBar = () => {
    const { dispatch } = useContext(AuthContext);
    const handleLogout = () => {
        logoutfunc(dispatch);
    }
    return (
        <div className="topBar">
            <div className="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
            </div>
            <div className="right">
                <Notifications className="icon" />
                <Public className="icon" />
                <Settings className="icon" />
                <img src="https://scontent.fsgn8-2.fna.fbcdn.net/v/t39.30808-6/241214347_2971882606409135_4060833953803005321_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=DVhxCVJOL5QAX9TqyU3&_nc_ht=scontent.fsgn8-2.fna&oh=00_AT-DiYuhrZB9-Hyd70aG0mLRiuftkJ6pxPtq23AawDm6AA&oe=61DD47B8" alt="" />
                <span className="logoutButton" onClick={handleLogout}>Log out</span>
            </div>
        </div>
    )
}

export default TopBar
