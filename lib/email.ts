// Form data interface
export interface BookingInquiryData {
  name: string;
  accommodation?: string;
  dates?: string;
  message: string;
}

// Create mailto link for native email client
export const createMailtoLink = (formData: BookingInquiryData): string => {
  const subject = `Booking Inquiry from ${formData.name}`;
  const body = `
Name: ${formData.name}
Accommodation Interest: ${formData.accommodation || "Not specified"}
Preferred Dates: ${formData.dates || "Not specified"}

Message:
${formData.message}
  `.trim();

  return `mailto:akikobandb@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
};

// Open native email client with pre-filled form data
export const openEmailClient = (formData: BookingInquiryData): void => {
  const mailtoLink = createMailtoLink(formData);
  window.open(mailtoLink, "_blank");
};
