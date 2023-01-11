
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PdfInfoPage, PdfRoster } from "../components";
import "../css/Pdf.css";
import { CompletedPng, LoadingPng } from "../images";
import { WarbandState } from "../utilities/Interfaces";

export const PdfCreationPage = () => {
    const history = useHistory();
    const state = history.location.state as WarbandState;
    const exportPdf = async () => {
        const jsPdf = new jsPDF("portrait", "mm", "a4", true);
        let canvas: HTMLCanvasElement;
        canvas = await html2canvas(document.querySelector("#pdf-roster") as HTMLElement, { scale: 4 });
        jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());

        jsPdf.addPage();
        canvas = await html2canvas(document.querySelector("#pdf-info-page") as HTMLElement, { scale: 4 });
        jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());
        if (document.querySelector("#pdf-info-page2")) {
            jsPdf.addPage();
            canvas = await html2canvas(document.querySelector("#pdf-info-page2") as HTMLElement, { scale: 4 });
            jsPdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, jsPdf.internal.pageSize.getWidth(), jsPdf.internal.pageSize.getHeight());
        }
        jsPdf.save(`${state.warband}.pdf`);
    };
    const [showSuccess, setSuccess] = useState<boolean>(false);
    useEffect(() => {
        // tslint:disable-next-line: no-floating-promises
        (async () => {
            await exportPdf();
            setSuccess(true);
        })();
        return () => {
            // this now gets called when the component unmounts
        };
    }, []);
    return <React.Fragment>
        {showSuccess ?
            <React.Fragment>
                <img src={CompletedPng} className="img-container" alt="Complete Icon"></img>
                <div className="large-header">Enjoy your pdf</div>
                <div
                    className="back-btn"
                    onClick={() => history.goBack()}
                >Back</div>
            </React.Fragment> :
            <React.Fragment>
                <img src={LoadingPng} className="img-container" alt="Loading Icon"></img>
                <div className="large-header">Please be patient. </div>
                <div className="large-header">The Snotlings are painting your pdf right now.</div>
                <div className="large-header">They are almost done.</div>
                <div className="large-header">Hang on...</div>
            </React.Fragment>
        }
        <PdfRoster state={state} />
        <PdfInfoPage state={state} />
    </React.Fragment>;
};
