export const formatInvoiceData = (invoiceData) => {
    const {
        company = {},
        invoice = {},
        account = {},
        billing = {},
        shipping = {},
        tax = 0,
        notes = "",
        items = [],
        logo = ""
    } = invoiceData || {};

    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.amount), 0);
    const taxAmount = subtotal * (tax / 100);
    const total = subtotal + taxAmount;

    return {
        companyName: company.name || '',
        companyAddress: company.address || '',
        companyPhone: company.phone || '',
        companyLogo: logo,

        invoiceNumber: invoice.number || '',
        invoiceDate: invoice.date || '',
        paymentDate: invoice.dueDate || '',

        accountName: account.name || '',
        accountNumber: account.number || '',
        accountIfscCode: account.ifscCode || '',

        billingName: billing.name || '',
        billingAddress: billing.address || '',
        billingPhone: billing.phone || '',

        shippingName: shipping.name || '',
        shippingAddress: shipping.address || '',
        shippingPhone: shipping.phone || '',

        tax,
        items: items.map(item => ({
            name: item.name || '',
            qty: item.qty || 0,
            amount: item.amount || 0,
            description: item.description || '',
            total: (item.qty || 0) * (item.amount || 0)
        })),
        notes,
        subtotal,
        taxAmount,
        total
    };
};