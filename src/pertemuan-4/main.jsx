import { createRoot } from "react-dom/client";
import "./tailwind.css"
import FrameworkList from "./frameworklist";
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";
import ResponsiveDesign from "./ResponsiveDesign";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* <FrameworkList/> */}
            <ResponsiveDesign/>
            {/* <FrameworkListSearchFilter/> */}
        </div>
    )

