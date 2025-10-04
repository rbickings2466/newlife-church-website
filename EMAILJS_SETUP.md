# EmailJS Setup Instructions

Follow these steps to set up EmailJS for your contact form:

## 1. Create EmailJS Account

1. Go to [https://emailjs.com](https://emailjs.com)
2. Sign up for a free account (200 emails/month free tier)

## 2. Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal/church Gmail accounts)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for church email servers)
4. Connect your church email account (office@newlifebfcde.org)

## 3. Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

### Subject:

```
New Contact Form Message: {{subject}}
```

### Content:

```html
<h2>New Contact Form Submission</h2>

<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>

<h3>Message:</h3>
<p>{{message}}</p>

<hr />
<p><small>Sent from New Life BFC website contact form</small></p>
```

4. **Test the template** with sample data
5. **Save** the template

## 4. Get Your Credentials

Copy these values from EmailJS dashboard:

1. **Service ID**: Found in Email Services section
2. **Template ID**: Found in Email Templates section
3. **Public Key**: Found in Account > API Keys

## 5. Update Environment Variables

Replace the placeholder values in `.env.local`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 6. Auto-Reply Template (Optional)

Create a second template for auto-replies to users:

### Template Name: "auto_reply"

### Subject:

```
Thank you for contacting New Life Bible Fellowship Church
```

### Content:

```html
<div style="font-family: Arial, sans-serif;">
  <h2>Thank You!</h2>

  <p>Dear {{from_name}},</p>

  <p>
    Thank you for reaching out to New Life Bible Fellowship Church! We have
    received your message and will get back to you as soon as possible.
  </p>

  <p>
    God bless,<br />
    New Life Bible Fellowship Church Team
  </p>

  <hr />
  <p>
    <small
      >24771 Cannon Rd, Millsboro, DE 19966<br />
      Phone: (302) 945-8145<br />
      Email: office@newlifebfcde.org</small
    >
  </p>
</div>
```

## 7. Testing

1. Restart your development server after updating `.env.local`
2. Fill out the contact form on your website
3. Check that emails are received at office@newlifebfcde.org
4. Monitor EmailJS dashboard for usage statistics

## Troubleshooting

- Check browser console for EmailJS errors
- Verify all environment variables are set correctly
- Test with EmailJS dashboard's template tester first
- Make sure your email service is properly connected
- Check spam folder for test emails

## Free Tier Limits

- 200 emails per month
- For higher volume, consider upgrading to paid plan ($15/month for 1,000 emails)
