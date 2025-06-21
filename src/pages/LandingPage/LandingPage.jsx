import './LandingPage.css';
import {assets} from "../../assets/assets.js";

const LandingPage = () => {

    return (
        <div className="landing-container" style={{color:"white", backgroundColor: "#0d6efd", borderRadius: "20px"}}>

            <div className="container my-5 py-5" >
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="offline-badge mb-3">Offline</div>
                        <h1 className="display-4 fw-bold mb-4">Effortless Invoicing.<br />Professional Results.</h1>
                        <p className="lead mb-4 text-muted">
                            Stop wrestling with spreadsheets. QuickInvoice helps you create and send beautiful invoices in minutes, so you get paid faster.
                        </p>
                        <div className="d-flex gap-3">
                            <button className="btn btn-lg px-4" style={{backgroundColor: "#FFC300", borderRadius: "10%"}}>Generate Your First Invoice</button>
                            <button id="btn" className="btn btn-outline-secondary btn-lg px-4" style={{backgroundColor: "gray" ,borderRadius: "10%"}}>Learn More</button>
                        </div>
                    </div>
                    <div className="col-lg-6 d-none d-lg-block" style={{paddingTop: "5%"}}>
                        <div className="invoice-preview shadow-lg">

                            <div className="invoice-header p-4 bg-primary text-white">
                                <h5>INVOICE</h5>
                                <div className="d-flex justify-content-between">
                                    <div>#INV-2023-001</div>
                                    <div>Jun 13, 2023</div>
                                </div>
                            </div>
                            <div className="invoice-body p-4 bg-white">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <h6>From</h6>
                                        <p>Your Company<br />123 Business St.<br />City, Country</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>To</h6>
                                        <p>Client Name<br />456 Client Ave.<br />City, Country</p>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Web Design</td>
                                        <td>1</td>
                                        <td>$500.00</td>
                                        <td>$500.00</td>
                                    </tr>
                                    <tr>
                                        <td>Hosting</td>
                                        <td>12</td>
                                        <td>$10.00</td>
                                        <td>$120.00</td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="text-end">
                                    <h5>Total: $620.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className="fw-bold" style={{color: "gray", boxShadow: "1px 1px 3px gray", borderRadius:"100%"}}>Why Choose QuickInvoice</h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100 border-0 bg-white shadow-sm">
                                <div className="card-body p-4 text-center">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-lightning"></i>
                                    </div>
                                    <h4 className="card-title">Fast & Easy</h4>
                                    <p className="card-text text-muted">Create professional invoices in minutes with our intuitive interface.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 bg-white shadow-sm">
                                <div className="card-body p-4 text-center">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-laptop"></i>
                                    </div>
                                    <h4 className="card-title">Offline Access</h4>
                                    <p className="card-text text-muted">Work anywhere, anytime - no internet connection required.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 bg-white shadow-sm">
                                <div className="card-body p-4 text-center">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-file-earmark-pdf"></i>
                                    </div>
                                    <h4 className="card-title">PDF Export</h4>
                                    <p className="card-text text-muted">Export your invoices as PDFs for easy sharing and printing.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-5 bg-primary text-white">
                <div className="container text-center">
                    <h2 className="fw-bold mb-4">Ready to Simplify Your Invoicing?</h2>
                    <button className="btn btn-light btn-lg px-5">Download Now</button>
                </div>
            </div>

            <footer className="py-4 bg-dark text-white">
                <div className="container text-center">
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} QuickInvoice. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;