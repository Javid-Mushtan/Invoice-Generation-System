import {templates} from "../assets/assets.js";
import {AppContext} from "../context/AppContext.jsx";
import {useContext, useRef, useState} from 'react';
import InvoicePreview from "../components/InvoicePreview.jsx";
import {saveInvoice} from "../service/invoiceService.js";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {Loader2} from "lucide-react";
import html2canvas from "html2canvas";
import {uploadInvoiceThumbnail} from "../service/cloudinaryService.js";

const PreviewPage = () => {

    const previewRef = useRef();
    const {selectedTemplate,invoiceData ,setSelectedTemplate,baseURL } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveAndExit = async () => {
        try {
            setLoading(true);
            const canvas = await html2canvas(previewRef.current,{
                scale: 2,
                useCORS: true,
                backgroundColor: "#fff",
                scrollY: -window.scrollY,
            });
            const imageData = canvas.toDataURL("image/png");
            const thumbnailUrl = await uploadInvoiceThumbnail(imageData);
            // Only pick clean, serializable fields
            /*title: "New Invoice",
    billing: { name: "", phone: "", address: "" },
    shipping: { name: "", phone: "", address: "" },
    invoice: { number: "", dueDate: "", address: "" },
    account: { name: "", number: "", ifsccode: "" },
    company: { name: "", number: "", address: "" },
    tax: 0,
    notes: "",
    items: [
        { name: "", qty: "", amount: "", description: "", total: 0 }
    ],
    logo: ""*/
            const payload = {
                invoiceData,
                thumbnailUrl,
            };
            /*{
                title: invoiceData.title,
                billing: {
                    name: invoiceData.billing.name,
                    phone: invoiceData.billing.phone,
                    address: invoiceData.billing.address
                },
                shipping: {
                    name: invoiceData.shipping.name,
                    phone: invoiceData.shipping.phone,
                    address: invoiceData.shipping.address
                },
                invoice: {
                    name: invoiceData.invoice.name,
                    phone: invoiceData.invoice.dueDate,
                    address: invoiceData.invoice.address
                },
                account: {
                    name: invoiceData.account.name,
                    phone: invoiceData.account.number,
                    address: invoiceData.account.ifsccode
                },
                company: {
                    name: invoiceData.company.name,
                    number: invoiceData.company.number,
                    address: invoiceData.company.address
                },
                tax: invoiceData.tax,
                notes: invoiceData.notes,
                items : invoiceData.items.map(item => ({
                    name: item.name,
                    qty: item.qty,
                    amount: item.amount,
                    description: item.description,
                    total: item.total
                })),
                logo: invoiceData.logo,
            };*/

            const response = await saveInvoice(baseURL, payload);

            if (response.status === 200 || response.status === 201) {
                toast.success("Successfully saved invoice");
                navigate("/dashboard");
            } else {
                toast.error("Save failed");
            }
        } catch (error) {
            console.error("❌ Save Error:", error);
            toast.error("Something went wrong: " + error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">
            <div className="d-flex flex-column align-items-center mb-4">
                <div className="d-flex gap-2 flex-wrap justify-content-center">

                    {templates.map(({id,label}) => (
                        <button key={id} className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? `btn-warning` : `btn-outline-secondary`}`}
                        style={{minWidth: "100px", height: "38px", }}
                        onClick={() => setSelectedTemplate(id)}
                        >{label}</button>
                    ))}
                </div>

                <div className="d-flex flex-wrap justify-content-between gap-2 mt-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" onClick={handleSaveAndExit} disabled={loading}>
                        {loading && <Loader2 className="me-2 spin-animation" size={18}/>}
                        {loading ? "Saving..." : "Save And Exit"}
                    </button>
                    <button className="btn btn-danger">Delete Invoice</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                    <button className="btn btn-info">Send Email</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download PDF</button>
                </div>

                <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light" >
                    <div ref={previewRef} className="invoice-preview">{/*credit goes to youtube*/}
                        <InvoicePreview invoiceData={invoiceData} template={selectedTemplate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewPage;