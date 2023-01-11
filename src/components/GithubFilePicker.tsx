import * as yaml from "js-yaml";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
interface GithubContent {
    name: string;
    type: string;
    url: string;
    download_url: string;
}
export const GithubFilePicker = () => {
    const [githubRepo, setGithubRepo] = useState("Mordheim");
    const [githubUser, setGithubUser] = useState("Labernator");
    const [currentContentUrl, setCurrentContentUrl] = useState("");
    const [currentContent, setCurrentContent] = useState<GithubContent[]>([]);
    const [selectedFile, setSelectedFile] = useState<string>();
    const [navigationMap, setNavigationMap] = useState<GithubContent[]>([]);
    const history = useHistory();
    useEffect(() => {
        const fetching = async () => fetchData();
        // tslint:disable-next-line: no-floating-promises
        fetching();
        return () => {
            // this now gets called when the component unmounts
        };
    }, [currentContentUrl]);
    const fetchData = async () => {
        const response = await fetch(currentContentUrl || `https://api.github.com/repos/${githubUser}/${githubRepo}/contents`);
        const jsonResponse = await response.json();
        if (!currentContentUrl) {
            setNavigationMap([{ ...jsonResponse, name: "root" }]);
        }
        setCurrentContent(jsonResponse);
    };
    const getYamlDataAndJump = async () => {
        if (!selectedFile) {
            return;
        }
        const response = await fetch(selectedFile);
        const txtResponse = await response.text();
        history.push("/PdfExport", yaml.load(txtResponse));
    };
    const getNavigationRoute = () =>
        navigationMap.length > 0 ?
            <div style={{ display: "flex" }}>
                {navigationMap.map((nav, idx) =>
                    <div
                        style={{ color: "blue", padding: "1rem 0.1rem" }}
                        onClick={() => {
                            setCurrentContentUrl(nav.url);
                            setNavigationMap(navigationMap.slice(0, idx + 1));
                        }}>
                        {`${nav.name} /`}
                    </div>)}
            </div> :
            <div>No Path yet</div>;

    const getFoldersAndYmls = () => {
        const filteredContent = currentContent.length && currentContent.length > 0 ? currentContent.filter((content) => content.type === "dir" || (content.type === "file" && content.name.indexOf(".yml") !== -1)) : undefined;
        return <table className="storage-table" style={{ width: "calc(100% - 1.5rem)", textAlign: "left" }}>
            <thead>
                <tr><td>Folder/File</td><td>Type</td></tr>
            </thead>
            <tbody>
                {filteredContent ? filteredContent.map((content) => content.type === "dir" ?
                    <tr onClick={() => {
                        setCurrentContentUrl(content.url);
                        setNavigationMap([...navigationMap, content]);
                    }
                    }>
                        <td>{content.name}</td>
                        <td>Dir</td>
                    </tr> :
                    <tr onClick={() => setSelectedFile(content.download_url)} className={content.download_url === selectedFile ? "selected" : ""}><td>{content.name}</td><td>File</td></tr>
                ) : undefined}
            </tbody>
        </table>;
    };
    return <React.Fragment><div>
        <div className="bold-text-with-margins" style={{ float: "left" }}>Or select a yml file from a Github repo</div>
        <div className="bold-text-with-margins" style={{ float: "left" }}>Github Repository: </div>
        <div className="text-with-margins" style={{ float: "left" }}>{githubUser}/{githubRepo}</div>
    </div>
        <div>
            <div className="bold-text-with-margins" style={{ marginTop: "1rem" }}>Tap on an entry in the table to navigate or on the path below to go back</div>
            {getNavigationRoute()}
            {getFoldersAndYmls()}
            <div className={selectedFile ? "enabled" : "disabled"} onClick={getYamlDataAndJump}>Generate Pdf from Selection</div>

        </div>
    </React.Fragment>;
};
