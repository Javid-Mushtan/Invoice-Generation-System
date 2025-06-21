// InvoiceForm.js
import { assets } from "../assets/assets.js";
import { Trash2 } from 'lucide-react';
import { AppContext } from "../context/AppContext";
import { useContext, useEffect } from "react";

const InvoiceForm = () => {
    const { invoiceData, setInvoiceData } = useContext(AppContext);

    const addItem = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { name: "", qty: 1, amount: 0, description: "", total: 0 },
            ],
        }));
    };

    const deleteItem = (index) => {
        const items = invoiceData.items.filter((_, i) => i !== index);
        setInvoiceData((prev) => ({ ...prev, items }));
    }

    const handleChange = (field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    const handleCompanyChange = (field, value) => {
        setInvoiceData((prev) => ({
            ...prev,
            company: {
                ...prev.company,
                [field]: value
            }
        }));
    }

    const handleSameAsBilling = (e) => {
        if (e.target.checked) {
            setInvoiceData((prev) => ({
                ...prev,
                shipping: { ...prev.billing }
            }));
        }
    }

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = field === 'name' || field === 'description' ? value : Number(value);

        if (field === "qty" || field === "amount") {
            const qty = Number(items[index].qty) || 0;
            const amount = Number(items[index].amount) || 0;
            items[index].total = qty * amount;
        }

        setInvoiceData((prev) => ({ ...prev, items }));
    }

    const calculateTotals = () => {
        const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0);
        const taxRate = Number(invoiceData.tax || 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return { subtotal, taxAmount, grandTotal };
    }

    const { subtotal, taxAmount, grandTotal } = calculateTotals();

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData((prev) => ({
                    ...prev,
                    logo: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if (!invoiceData.invoice?.number) {
            const number = `INV-${Math.floor(Math.random() * (100000 - 1) + 1)}`;
            setInvoiceData((prev) => ({
                ...prev,
                invoice: {
                    ...prev.invoice,
                    number,
                    date: prev.invoice.date || new Date().toISOString().split('T')[0],
                    dueDate: prev.invoice.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                },
            }));
        }
    }, []);

    return (
        <div className="invoiceform container py-4">
            <div className="mb-4">
                <h5>Company Logo</h5>
                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img src={invoiceData.logo ? invoiceData.logo : assets.logo} alt="Logo" className="img-fluid" width={98} />
                    </label>
                    <input type="file" id="image" hidden accept="image/*" onChange={handleLogoUpload} />
                </div>
            </div>

            <div className="mb-4">
                <h5>Your Company</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Company name"
                               value={invoiceData.company?.name || ''}
                               onChange={(e) => handleCompanyChange("name", e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Company phone"
                               value={invoiceData.company?.phone || ''}
                               onChange={(e) => handleCompanyChange("phone", e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Company address"
                               value={invoiceData.company?.address || ''}
                               onChange={(e) => handleCompanyChange("address", e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h5>Bill To</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"
                               value={invoiceData.billing?.name || ''}
                               onChange={(e) => handleChange("billing", {...invoiceData.billing, name: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Phone number"
                               value={invoiceData.billing?.phone || ''}
                               onChange={(e) => handleChange("billing", {...invoiceData.billing, phone: e.target.value})} />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Billing Address"
                               value={invoiceData.billing?.address || ''}
                               onChange={(e) => handleChange("billing", {...invoiceData.billing, address: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship To</h5>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="sameAsBilling" onChange={handleSameAsBilling} />
                        <label htmlFor="sameAsBilling" className="form-check-label">
                            Same as Billing
                        </label>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"
                               value={invoiceData.shipping?.name || ''}
                               onChange={(e) => handleChange("shipping", {...invoiceData.shipping, name: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Phone number"
                               value={invoiceData.shipping?.phone || ''}
                               onChange={(e) => handleChange("shipping", {...invoiceData.shipping, phone: e.target.value})} />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Shipping Address"
                               value={invoiceData.shipping?.address || ''}
                               onChange={(e) => handleChange("shipping", {...invoiceData.shipping, address: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h5>Invoice Information</h5>
                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                        <input type="text" disabled className="form-control" placeholder="Invoice Number" id="invoiceNumber"
                               value={invoiceData.invoice?.number || ''} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                        <input type="date" className="form-control" id="invoiceDate"
                               value={invoiceData.invoice?.date || ''}
                               onChange={(e) => handleChange("invoice", {...invoiceData.invoice, date: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="invoiceDueDate" className="form-label">Invoice Due Date</label>
                        <input type="date" className="form-control" id="invoiceDueDate"
                               value={invoiceData.invoice?.dueDate || ''}
                               onChange={(e) => handleChange("invoice", {...invoiceData.invoice, dueDate: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h5>Item Details</h5>
                {invoiceData.items.map((item, index) => (
                    <div key={index} className="card p-3 mb-3">
                        <div className="row">
                            <div className="col-md-3 mb-2">
                                <input type="text" className="form-control" placeholder="Item Name"
                                       value={item.name}
                                       onChange={(e) => handleItemChange(index, "name", e.target.value)} />
                            </div>
                            <div className="col-md-3 mb-2">
                                <input type="number" min="1" className="form-control" placeholder="Qty"
                                       value={item.qty}
                                       onChange={(e) => handleItemChange(index, "qty", e.target.value)} />
                            </div>
                            <div className="col-md-3 mb-2">
                                <input type="number" min="0" step="0.01" className="form-control" placeholder="Amount"
                                       value={item.amount}
                                       onChange={(e) => handleItemChange(index, "amount", e.target.value)} />
                            </div>
                            <div className="col-md-3 mb-2">
                                <input type="text" className="form-control" disabled
                                       value={`Rs ${item.total.toFixed(2)}`} />
                            </div>
                        </div>
                        <div className="d-flex gap-2 mt-2">
                            <textarea className="form-control" placeholder="Description"
                                      value={item.description}
                                      onChange={(e) => handleItemChange(index, "description", e.target.value)}></textarea>
                            {invoiceData.items.length > 1 && (
                                <button className="btn btn-outline-danger" type="button" onClick={() => deleteItem(index)}>
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary mt-4" type="button" onClick={addItem}>Add Item</button>
            </div>

            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>Rs {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">Tax Rate(%)</label>
                            <input type="number" id="taxInput" className="form-control" placeholder="Tax Rate"
                                   value={invoiceData.tax || 0}
                                   onChange={(e) => handleChange("tax", Number(e.target.value))} />
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Tax amount</span>
                            <span>Rs {taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>Rs {grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h5>Bank Account Details</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Account Holder Name"
                               value={invoiceData.account?.name || ''}
                               onChange={(e) => handleChange("account", {...invoiceData.account, name: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Account Number"
                               value={invoiceData.account?.number || ''}
                               onChange={(e) => handleChange("account", {...invoiceData.account, number: e.target.value})} />
                    </div>
                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="IFSC Code"
                               value={invoiceData.account?.ifscCode || ''}
                               onChange={(e) => handleChange("account", {...invoiceData.account, ifscCode: e.target.value})} />
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h5>Notes:</h5>
                <textarea name="notes" className="form-control" rows="3"
                          value={invoiceData.notes || ''}
                          onChange={(e) => handleChange("notes", e.target.value)}></textarea>
            </div>
            <button>Submit</button>
        </div>
    );
};

export default InvoiceForm;