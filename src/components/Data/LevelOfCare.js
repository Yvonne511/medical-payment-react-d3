import "./LevelOfCare.css";
import { LevelOfCareByStateBarChart } from "./LevelOfCareByStateBarChart";
import {PayByCareBarChart} from "./PayByCareBarChart";

const LevelOfCare = () => {
    return (
        <div>
        <h1>LevelOfCare</h1>
        <LevelOfCareByStateBarChart />
        <PayByCareBarChart />
        </div>
    );
};

export default LevelOfCare;