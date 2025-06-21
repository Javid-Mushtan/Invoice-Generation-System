import { useState, useContext } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { AppContext } from '../context/AppContext.jsx';
import InvoiceForm from '../components/InvoiceForm.jsx';
import TemplateGrid from "../components/TemplateGrid.jsx";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const { invoiceTitle, setInvoiceTitle, invoiceData, setInvoiceData, selectedTemplate, setSelectedTemplate} = useContext(AppContext);
    const navigate = useNavigate();

    const handleTemplateClick = (templateid) => {
        const hasInvalidItem = invoiceData.items.some((item) => {
            !item.qty || !item.amount
        })

        if(hasInvalidItem){
            toast.error("Please enter quantity and amount for all items.");
            return;
        }

        setSelectedTemplate(templateid);
        navigate(`/preview`);
    }

    const handleTitleChange = (e) => {
        setInvoiceTitle(e.target.value);
        setInvoiceData((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleTitleEdit = () => {
        setIsEditingTitle(true);
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
    };

    return (
        <div className="mainpage container-fluid bg-light min-vh-100 py-4">
            <div className="container">
                <div className="bg-white border rounded shadow-sm p-3 mb-4">
                    <div className="d-flex align-items-center">
                        {isEditingTitle ? (
                            <input
                                className="form-control me-2"
                                autoFocus
                                onBlur={handleTitleBlur}
                                onChange={handleTitleChange}
                                value={invoiceTitle}
                            />
                        ) : (
                            <>
                                <h5 className="mb-0 me-2">{invoiceTitle}</h5>
                                <button
                                    className="btn btn-sm p-0 border-0 bg-transparent"
                                    onClick={handleTitleEdit}
                                >
                                    <FiEdit2 className="text-primary" size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="row g-4 align-items-stretch">
                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-3 mb-4 w-100">
                            <h6>Invoice Form</h6>
                            <InvoiceForm />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 d-flex">
                        <div className="bg-white border rounded shadow-sm p-3 mb-4 w-100">
                            <h6>Template Grid</h6>
                            <TemplateGrid onTemplateClick={handleTemplateClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
