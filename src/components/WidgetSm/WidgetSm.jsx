import './WidgetSm.scss'
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from 'react';
import axios from 'axios';

const WidgetSm = () => {
    const [newUsers, setnewUser] = useState([]);
    useEffect(() => {
        const getnewUser = async () => {
            const res = await axios.get('user/get?new=true', {
                headers: {
                    token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
                }
                });
            setnewUser(res.data)
        }
        getnewUser();
    }, [])
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map(user => (
                    <li className="widgetSmListItem">
                        <img
                            src={
                                user.avatar || "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                            }
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.name}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default WidgetSm 
