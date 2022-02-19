import './FeaturedInfo.scss'
import { KeyboardArrowDownSharp,KeyboardArrowUpSharp } from '@material-ui/icons'

const FeaturedInfo = () => {
    return (
        <div className="featuredInfo">
            <div className="featuredInfoitem">
                <div className="type">Revenue</div>
                <div className="revenue">
                    <div className="total">
                        $2,400
                    </div>
                    <div className="percent">
                        -11%
                    </div>
                    <KeyboardArrowDownSharp />
                </div>
                <div className="info">
                    Compare to last month
                </div>
            </div>
            <div className="featuredInfoitem">
                <div className="type">Sales</div>
                <div className="revenue">
                    <div className="total">
                        $2,400
                    </div>
                    <div className="percent">
                        +11%
                    </div>
                    <KeyboardArrowUpSharp />
                </div>
                <div className="info">
                    Compare to last month
                </div>
            </div>
            <div className="featuredInfoitem">
                <div className="type">Cost</div>
                <div className="revenue">
                    <div className="total">
                        $2,400
                    </div>
                    <div className="percent">
                        -11%
                    </div>
                    <KeyboardArrowDownSharp />
                </div>
                <div className="info">
                    Compare to last month
                </div>
            </div>
        </div>
    )
}

export default FeaturedInfo
