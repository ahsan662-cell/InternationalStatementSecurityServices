
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const formType = formData.get("formType") as string
    const email = formData.get('email') as string

    if (!email || !formType) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    let subject = ""
    let adminHtml = ""
    let attachments: any[] = []

    // Extracting all possible fields
    const name = (formData.get('name') || formData.get('fullName') || `${formData.get('firstName')} ${formData.get('lastName')}`) as string
    const phone = formData.get('phone') as string || 'Not provided'
    const message = formData.get('message') as string || 'No message'

    // --- 1. Logic based on formType ---
    switch (formType) {
      case 'aboutForm':
        subject = `Contact Inquiry: ${name}`
        adminHtml = generateAdminEmail("Contact Form", [
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Message", value: message }
        ])
        break

      case 'faq':
        subject = `FAQ Question: ${name}`
        adminHtml = generateAdminEmail("FAQ Inquiry", [
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
          { label: "Question", value: message }
        ])
        break

      case 'jobApplication':
        const position = formData.get('position') as string
        subject = `Job Application: ${position} - ${name}`
        
        // Handle CV Attachment
        const cvFile = formData.get('cv') as File | null
        if (cvFile && cvFile.size > 0) {
          const arrayBuffer = await cvFile.arrayBuffer()
          attachments.push({
            filename: cvFile.name || 'CV.pdf',
            content: Buffer.from(arrayBuffer),
          })
        }

        adminHtml = generateAdminEmail("Job Application", [
          { label: "Full Name", value: name },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
          { label: "Position", value: position },
          { label: "Experience", value: formData.get('experience') as string },
          { label: "Background", value: formData.get('background') as string },
          { label: "Availability", value: formData.get('availability') as string },
          { label: "Message", value: message }
        ], attachments.length > 0)
        break

      case 'requestConsultation':
        subject = `Consultation Request: ${formData.get('service')}`
        adminHtml = generateAdminEmail("Security Consultation", [
          { label: "Name", value: name },
          { label: "Email", value: email },
          { label: "Service", value: formData.get('service') as string },
          { label: "Location", value: formData.get('location') as string },
          { label: "Message", value: message }
        ])
        break

      default:
        return NextResponse.json({ error: 'Invalid form type.' }, { status: 400 })
    }

    // --- 2. Send Email to Admin (HR/Support) ---
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.HR_EMAIL!,
      subject: subject,
      attachments,
      html: adminHtml,
    })

    // --- 3. Send Auto-Reply to User ---
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: 'We have received your request – ISSS',
      html: generateUserAutoReply(name, formType),
    })

    return NextResponse.json({ success: true })

  } catch (err: any) {
    console.error('[/api/apply] Error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}

// --- Email Templates Helpers ---

function generateAdminEmail(title: string, fields: { label: string, value: string }[], hasAttachment = false) {
  const rows = fields.map(f => `
    <tr>
      <td style="padding:8px 0;color:#888;font-size:11px;text-transform:uppercase;width:120px;">${f.label}</td>
      <td style="padding:8px 0;color:#e0e8ec;font-size:14px;">${f.value}</td>
    </tr>
  `).join('')

  return `
    <div style="background:#050000;padding:20px;font-family:Arial,sans-serif;">
      <div style="max-width:600px;margin:0 auto;background:#0a0000;border:1px solid #4a0000;padding:24px;">
        <h2 style="color:#ffffff;border-bottom:2px solid #cc0000;padding-bottom:10px;">${title}</h2>
        <table width="100%">${rows}</table>
        ${hasAttachment ? '<p style="color:#cc0000;font-size:12px;margin-top:15px;">📎 Attachment included.</p>' : ''}
        <p style="color:#555;font-size:10px;margin-top:20px;">Submitted via ISSS Portal</p>
      </div>
    </div>
  `
}

function generateUserAutoReply(name: string, type: string) {
  let customText = "Thank you for contacting us. Our team will get back to you shortly."
  if (type === 'jobApplication') customText = "Our recruitment team will review your application within 5-10 business days."
  if (type === 'requestConsultation') customText = "One of our security experts will contact you to discuss your requirements."

  return `
    <div style="font-family:Arial,sans-serif;background:#0a0000;color:#d0d8dd;padding:30px;border:1px solid #4a0000;max-width:500px;">
      <h3 style="color:#fff;">Hello ${name},</h3>
      <p>${customText}</p>
      <br />
      <p style="font-size:12px;color:#888;">International Statement Security Services</p>
    </div>
  `
}