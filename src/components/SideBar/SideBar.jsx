import './SideBar.scss';
import { Home, Equalizer, Loyalty, Person, PlayArrowSharp, PlaylistPlay, Assessment, Email, Forum, Work, Report, Feedback } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className="sideBar">
            <div className="wrapper">

                <div className="dashboard cate">
                    <span>Dashboard</span>
                    <Link to="/" className="link">
                        <div className="home item">
                            <Home />
                            <span>Home</span>
                        </div>
                    </Link>
                    <div className="analytics item">
                        <Equalizer />
                        <span>Analytics</span>
                    </div>
                    <div className="sales item">
                        <Loyalty />
                        <span>Sales</span>
                    </div>
                </div>
                <div className="quickMenu cate">
                    <span>Quick Menu</span>
                    <div className="user item">
                        <Person />
                        <span>User</span>
                    </div>
                    <Link to="/movies" className="link">
                        <div className="products item">
                            <PlayArrowSharp />
                            <span>Movies</span>
                        </div>
                    </Link>
                    <Link to="/lists" className="link">
                        <div className="list item">
                            <PlaylistPlay />
                            <span>List</span>
                        </div>
                    </Link>
                    <div className="reports item">
                        <Assessment />
                        <span>Reports</span>
                    </div>
                </div>
                <div className="notification cate">
                    <span>Notification</span>
                    <div className="mail item">
                        <Email />
                        <span>Mail</span>
                    </div>
                    <div className="feedback item">
                        <Feedback />
                        <span>Feedback</span>
                    </div>
                    <div className="messages item">
                        <Forum />
                        <span>Messages</span>
                    </div>
                </div>
                <div className="staff cate">
                    <span>Staff</span>
                    <div className="manage item">
                        <Work />
                        <span>Manage</span>
                    </div>
                    <div className="analytics item">
                        <Assessment />
                        <span>Analytics</span>
                    </div>
                    <div className="reports item">
                        <Report />
                        <span>Report</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
