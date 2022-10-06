import * as yaml from "js-yaml";
import { useHistory } from "react-router-dom";
import { ImportWarbandPng } from "./../images";
export const LandingPage = () => {

    const history = useHistory();

    return <div className="flex-container" style={{ textAlign: "center" }}>
        <label htmlFor="file-uploader" className="flex-container">
            <input
                id="file-uploader"
                type="file"
                accept=".yml"
                style={{ display: "none" }}
                onChange={() => {
                    const reader = new FileReader();
                    reader.onload = (ev: ProgressEvent<FileReader>) => {
                        const jsobject = yaml.load(ev.target?.result as string);
                        history.push("/PdfExport", jsobject);
                    };
                    reader.readAsText((document.querySelector("#file-uploader") as HTMLInputElement)?.files?.item(0) as File);
                }}
            />
            <img className="img-container" src={ImportWarbandPng} alt="Import Icon"></img>
            <div className="large-header" onClick={() => document.getElementById("file-uploader")?.click()}>Tap here to load your .yml file and get a nice pdf for it</div>
        </label>
    </div>;
};
