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

// Check if device is mobile
const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

// Copy text to clipboard (fallback for mobile)
const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      return result;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

// Open native email client with pre-filled form data
export const openEmailClient = async (
  formData: BookingInquiryData
): Promise<boolean> => {
  const mailtoLink = createMailtoLink(formData);

  // For mobile devices, try multiple approaches
  if (isMobile()) {
    try {
      // First try: location.href (most reliable on mobile)
      window.location.href = mailtoLink;
      return true;
    } catch (error) {
      console.warn("location.href failed on mobile:", error);

      // Second try: window.open
      try {
        const newWindow = window.open(mailtoLink, "_blank");
        if (newWindow) {
          return true;
        }
      } catch (openError) {
        console.warn("window.open failed on mobile:", openError);
      }

      // Third try: copy email content to clipboard as fallback
      const emailContent = `
To: akikobandb@gmail.com
Subject: ${encodeURIComponent(`Booking Inquiry from ${formData.name}`)}

Name: ${formData.name}
Accommodation Interest: ${formData.accommodation || "Not specified"}
Preferred Dates: ${formData.dates || "Not specified"}

Message:
${formData.message}
      `.trim();

      const copied = await copyToClipboard(emailContent);
      if (copied) {
        alert(
          "Email content copied to clipboard. Please paste it into your email app and send to akikobandb@gmail.com"
        );
        return true;
      }

      return false;
    }
  } else {
    // For desktop, use the original approach
    try {
      window.location.href = mailtoLink;
      return true;
    } catch (error) {
      console.warn("location.href failed, trying window.open:", error);
      window.open(mailtoLink, "_blank");
      return true;
    }
  }
};
