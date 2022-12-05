import PayByState from "./Data/PayByState";
import {PayByStateBarChart} from "./Data/PayByStateBarChart";
import PayByStateOY from "./Data/PayByStateOY";
import {PayByStateBarChartOY} from "./Data/PayByStateBarChartOY";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <PayByState />
            <PayByStateBarChart />
            <PayByStateOY />
            <PayByStateBarChartOY />
        </div>
    );
};

export default Home;