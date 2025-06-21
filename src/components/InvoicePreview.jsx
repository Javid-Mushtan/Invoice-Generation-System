import { forwardRef } from "react";
import { formatInvoiceData } from "../utill/formatInvoiceData.js";
import { templateComponents } from "../utill/InvoiceTemplates.js";

const InvoicePreview = forwardRef(({ invoiceData, template }, ref) => {

    const formatedData = formatInvoiceData(invoiceData)

    const SelectedTemplate = templateComponents[template] || templateComponents["template1"];

    return (
        <div ref={ref} className="invoice-preview container px-0 py-0 overflow-x-auto">
            <SelectedTemplate data={formatedData} />
        </div>
    );
});

export default InvoicePreview;
