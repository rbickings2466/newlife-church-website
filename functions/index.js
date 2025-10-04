// Firebase functions removed - using EmailJS for contact form instead
// This file can be deleted if no other functions are needed

console.log("Firebase functions file - contact form now handled by EmailJS");

// Ensure process is defined (for environments where it may be undefined)
// Use globalThis.process if available, otherwise fallback to empty object
const processEnv =
  typeof globalThis.process !== "undefined" ? globalThis.process.env : {};

// Initialize Firebase Admin
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: functions.config().email.user || processEnv.EMAIL_USER,
      pass: functions.config().email.password || processEnv.EMAIL_PASSWORD,
    },
  });
};

// Main contact form function
export const sendContactEmail = functions.https.onCall(
  async (data, context) => {
    try {
      // Validate input data
      const { name, email, subject, message } = data;

      if (!name || !email || !message) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Missing required fields: name, email, and message are required"
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Invalid email address format"
        );
      }

      // Sanitize inputs
      const sanitizedData = {
        name: name.trim().substring(0, 100),
        email: email.trim().toLowerCase(),
        subject: (subject || "New Contact Form Message")
          .trim()
          .substring(0, 200),
        message: message.trim().substring(0, 2000),
      };

      const transporter = createTransporter();

      // Email to church/admin
      const churchEmailOptions = {
        from: `"New Life BFC Website" <${functions.config().email.user}>`,
        to: "info@newlifebfcde.org", // Your church email
        replyTo: sanitizedData.email,
        subject: `Website Contact: ${sanitizedData.subject}`,
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${
              sanitizedData.email
            }">${sanitizedData.email}</a></p>
            <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0;">
            <h3 style="color: #dc2626; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${
              sanitizedData.message
            }</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <div style="color: #6b7280; font-size: 14px;">
            <p><strong>New Life Bible Fellowship Church</strong></p>
            <p>Sent from church website contact form</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      };

      // Auto-reply to sender
      const autoReplyOptions = {
        from: `"New Life Bible Fellowship Church" <${
          functions.config().email.user
        }>`,
        to: sanitizedData.email,
        subject: "Thank you for contacting New Life Bible Fellowship Church",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2563eb, #1e40af); color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">Thank You!</h1>
          </div>
          
          <div style="padding: 30px; background-color: #ffffff; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 18px; color: #374151;">Dear ${sanitizedData.name},</p>
            
            <p style="line-height: 1.6; color: #4b5563;">
              Thank you for reaching out to New Life Bible Fellowship Church! 
              We have received your message and truly appreciate you taking the time to contact us.
            </p>
            
            <div style="background-color: #f0f9ff; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 0; color: #1e40af; font-style: italic;">
                "To pursue God's glory in all things among all people"
              </p>
            </div>
            
            <p style="line-height: 1.6; color: #4b5563;">
              A member of our pastoral team will get back to you as soon as possible, 
              typically within 24-48 hours. If your message is urgent, please don't 
              hesitate to call us directly at (302) 555-0123.
            </p>
            
            <p style="line-height: 1.6; color: #4b5563;">
              We look forward to connecting with you and pray that God blesses you richly!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-weight: bold;">New Life Bible Fellowship Church</p>
              <p style="margin: 5px 0; color: #6b7280;">123 Church Street, Anytown, DE 19701</p>
              <p style="margin: 5px 0; color: #6b7280;">Phone: (302) 555-0123</p>
              <p style="margin: 5px 0; color: #6b7280;">
                <a href="https://www.newlifebfcde.org" style="color: #2563eb; text-decoration: none;">
                  www.newlifebfcde.org
                </a>
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Sunday Worship: 10:00 AM | Sunday School: 9:00 AM | Wednesday Prayer: 7:00 PM
              </p>
            </div>
          </div>
        </div>
      `,
      };

      // Send both emails
      const emailPromises = [
        transporter.sendMail(churchEmailOptions),
        transporter.sendMail(autoReplyOptions),
      ];

      await Promise.all(emailPromises);

      // Save to Firestore for record keeping
      await admin
        .firestore()
        .collection("contactSubmissions")
        .add({
          name: sanitizedData.name,
          email: sanitizedData.email,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          processed: true,
          ipAddress: context.rawRequest?.ip || "unknown",
        });

      console.log(
        `Contact form submitted by ${sanitizedData.name} (${sanitizedData.email})`
      );

      return {
        success: true,
        message:
          "Your message has been sent successfully! We will get back to you soon.",
      };
    } catch (error) {
      console.error("Error in sendContactEmail:", error);

      // Log error to Firestore for debugging
      try {
        await admin.firestore().collection("contactErrors").add({
          error: error.message,
          data: data,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      } catch (logError) {
        console.error("Failed to log error:", logError);
      }

      // Return appropriate error
      if (error instanceof functions.https.HttpsError) {
        throw error;
      } else {
        throw new functions.https.HttpsError(
          "internal",
          "An error occurred while sending your message. Please try again or contact us directly."
        );
      }
    }
  }
);

// Optional: Function to get contact form submissions (admin only)
export const getContactSubmissions = functions.https.onCall(async () => {
  // Add authentication check here if needed
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  // }

  try {
    const snapshot = await admin
      .firestore()
      .collection("contactSubmissions")
      .orderBy("timestamp", "desc")
      .limit(50)
      .get();

    const submissions = [];
    snapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate(),
      });
    });

    return { submissions };
  } catch (error) {
    console.error("Error getting contact submissions:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to retrieve submissions"
    );
  }
});
