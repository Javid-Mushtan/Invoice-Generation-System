import './Template4.css'

const Template4 = ({data}) => {
    return (
        <div className="template4 border rounded mx-auto my-4 px-sm-4 py-3 w-100">

            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    {data.companyLogo && (
                        <div className="mb-2">
                            <img src={data.companyLogo} alt="Company" style={{maxWidth: '200px', maxHeight: '100px'}} />
                        </div>
                    )}
                    <h2 className="mb-1 company-title">{data.companyName}</h2>
                    <p className="mb-1">{data.companyAddress}</p>
                    <p className="mb-0">{data.companyPhone}</p>
                </div>
                <div className="col-md-6 text-start text-md-end">
                    <h1 className="mb-2 invoice-title" style={{color: "#cc74fa"}}>Invoice</h1>
                    <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2 gap-md-4">
                        <div className="w-100 w-md-50 mb-3 mb-md-0">
                            <p className="mb-1">
                                <strong>Invoice#:</strong> {data.invoiceNumber}
                            </p>
                            <p className="mb-1">
                                <strong>Invoice Date:</strong> {data.invoiceDate}
                            </p>
                            <p className="mb-1">
                                <strong>Due Date:</strong> {data.paymentDate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-3 orange-border" />

            <div className="row g-3 mb-4">
                {data.shippingName && data.shippingPhone && data.shippingAddress && (
                    <div className="col-md-6">
                        <div className="p-3 rounded h-100 billing-box">
                            <h3 className="mb-2 billing-title">Shipped To</h3>
                            <p className="mb-1">
                                <strong>{data.shippingName}</strong>
                            </p>
                            <p className="mb-1">
                                <strong>{data.shippingPhone}</strong>
                            </p>
                            <p className="mb-1">
                                <strong>{data.shippingAddress}</strong>
                            </p>
                        </div>
                    </div>
                )}

                <div className="col-md-6">
                    <div className="p-3 rounded h-100 billing-box">
                        <h3 className="mb-2 billing-title">Billed To</h3>
                        <p className="mb-1">
                            <strong>{data.billingName}</strong>
                        </p>
                        <p className="mb-1">
                            <strong>{data.billingAddress}</strong>
                        </p>
                        <p className="mb-1">
                            <strong>{data.billingPhone}</strong>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                        <tr className="table-header-row">
                            <th className="p-2 table-header" id="thead">Item #/Item description</th>
                            <th className="p-2 text-center table-header" id="thead">Qty.</th>
                            <th className="p-2 text-end table-header" id="thead">Rate</th>
                            <th className="p-2 text-end table-header" id="thead">Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.items.map((item, index) => (
                            <tr key={index}>
                                <td className="p-2">{item.name}</td>
                                <td className="p-2 text-center">{item.qty}</td>
                                <td className="p-2 text-end">Rs {Number(item.amount).toFixed(2)}</td>
                                <td className="p-2 text-end">Rs {Number(item.qty * item.amount).toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-4">
                <div className="d-flex justify-content-end">
                    <div className="p-3 w-100 totals-box" style={{maxWidth: "300px"}}>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Sub Total: </span>
                            <span>Rs {data.subtotal.toFixed(2)}</span>
                        </div>
                        {data.tax > 0 && (
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax ({data.tax}%)</span>
                                <span>Rs {data.taxAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="d-flex justify-content-between fw-bold total-highlight">
                            <span>Total: </span>
                            <span>Rs {data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {(data.accountName || data.accountNumber ||data.accountIfscCode) && (
                <div className="mt-4">
                    <h3 className="mb-2 billing-title">Bank Account Details</h3>
                    {data.accountName && (
                        <p className="mb-1">
                            <strong>Account Holder: </strong>{data.accountName}
                        </p>
                    )}
                    {data.accountNumber && (
                        <p className="mb-1">
                            <strong>Account Number: </strong>{data.accountNumber}
                        </p>
                    )}
                    {data.accountIfscCode && (
                        <p className="mb-1">
                            <strong>Account IfscCode: </strong>{data.accountIfscCode}
                        </p>
                    )}
                </div>
            )}

            {data.notes && (
                <div className="mt-4">
                    <h3 className="mb-2 billing-title">
                        Remarks
                    </h3>
                    <p className="mb-0">{data.notes}</p>
                </div>
            )}
        </div>
    )
}

export default Template4;