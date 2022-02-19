import './WidgetLg.scss'

const WidgetLg = ({title}) => {
    title = "Lasted transactions";
    return (
        <div className="widgetLg">
            <div className="widgetLgTitle">{title}</div>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTH">Customer</th>
                    <th className="widgetLgTH">Date</th>
                    <th className="widgetLgTH">Amount</th>
                    <th className="widgetLgTH">Status</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgTd">
                        <img
                            src={
                                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
                            }
                            alt=""
                            className="widgetSmImg"
                        />
                        <span className="userName">Long</span>
                    </td>
                    <td className="widgetLgTd">
                        <span>12/01/2021</span>
                    </td>
                    <td className="widgetLgTd">
                        <span>100$</span>
                    </td>
                    <td className="widgetLgTd">
                        <span className="status approved">Approved</span>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default WidgetLg
