import * as yaml from "js-yaml";
import React from "react";
import { useHistory } from "react-router-dom";
import { GithubFilePicker } from "../components/GithubFilePicker";
import { ImportWarbandPng } from "./../images";
export const LandingPage = () => {
    const history = useHistory();

    return <div className="flex-container" style={{ textAlign: "center" }}>
        <label htmlFor="file-uploader" className="flex-container" style={{ display: "unset" }}>
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
            <img style={{ width: "25%", maxWidth: "1000px" }} src={ImportWarbandPng} alt="Import Icon"></img>
            <div style={{ padding: "0.7rem 0.5rem 0.7rem 0rem", fontWeight: "bold", borderBottom: "1px solid black" }} onClick={() => document.getElementById("file-uploader")?.click()}>Tap here to select a local .yml file</div>
        </label>
        <GithubFilePicker />
    </div>;
};
