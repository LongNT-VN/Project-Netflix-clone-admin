import './Home.scss'
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo';
import Chart from '../../components/Chart/Chart';
import WidgetSm from '../../components/WidgetSm/WidgetSm';
import WidgetLg from '../../components/WidgetLg/WidgetLg';
import { useState, useEffect } from "react";
import axios from 'axios';

const Home = () => {
    const Months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const [userStats, setUserStats] = useState([]);
    
      useEffect(()=>{
        const getStats = async () => {
          try {
            const res = await axios.get("user/stats", {
              headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
              }
              });
              res.data.sort((a,b) => {
                return a._id-b._id
                })
              res.data.map((stat)=>{
                    stat._id = Months[stat._id-1];
                    return stat
              })
              setUserStats(res.data);
          } catch (error) {
            console.log(error);
          }
        };
        getStats();
      },[])
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart userStats={userStats}/>
            <div className="homeWidget">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}

export default Home
