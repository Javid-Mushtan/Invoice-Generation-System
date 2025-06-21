import axios from "axios";

export const uploadInvoiceThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset','javid_mushtan');
    formData.append('cloud_name', "dv5obho8e")

    const response = await axios.post(`https://api.cloudinary.com/v1_1/dv5obho8e/image/upload`,formData);

    return response.data.secure_url;
}