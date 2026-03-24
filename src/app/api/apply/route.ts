// // app/api/apply/route.ts
// //
// // ─── SETUP ────────────────────────────────────────────────────────────────────
// // 1. npm install resend
// // 2. Go to resend.com → free account → create API key
// // 3. Add to .env.local:
// //       RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
// //       HR_EMAIL=hr@statementsecurity.com        ← where you want to receive apps
// //       FROM_EMAIL=noreply@statementsecurity.com ← must be a verified domain in Resend
// // ─────────────────────────────────────────────────────────────────────────────

// import { NextRequest, NextResponse } from 'next/server'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export async function POST(req: NextRequest) {
//   try {
//     // ── 1. Parse multipart form ───────────────────────────
//     const formData = await req.formData()
    
//     const formType = formData.get("formType") as string
//     const fullName     = formData.get('fullName')     as string
//     const email        = formData.get('email')        as string
//     const phone        = formData.get('phone')        as string || 'Not provided'
//     const position     = formData.get('position')     as string
//     const experience   = formData.get('experience')   as string
//     const background   = formData.get('background')   as string
//     const availability = formData.get('availability') as string
//     const message      = formData.get('message')      as string || 'None'

//     // Basic validation
//     if (!fullName || !email ) {
//       return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
//     }

//     // ── 2. Handle optional PDF ────────────────────────────
//     const cvFile = formData.get('cv') as File | null
//     let attachments: { filename: string; content: Buffer }[] = []

//     if (cvFile && cvFile.size > 0) {
//       const arrayBuffer = await cvFile.arrayBuffer()
//       attachments = [{
//         filename: cvFile.name || 'CV.pdf',
//         content:  Buffer.from(arrayBuffer),
//       }]
//     }

//     // ── 3. Email to HR ────────────────────────────────────
//     await resend.emails.send({
//       from: process.env.FROM_EMAIL!,
//       to: process.env.HR_EMAIL!,
//       subject: `New Application: ${position} — ${fullName}`,
//       attachments,
//       html: `
//       <div style="margin:0;padding:0;background:#050000;">
//         <table width="100%" cellpadding="0" cellspacing="0" border="0">
//           <tr>
//             <td align="center" style="padding:20px 10px;">
              
//               <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#0a0000;border:1px solid #4a0000;color:#d0d8dd;font-family:Arial,sans-serif;">
                
//                 <!-- Header -->
//                 <tr>
//                   <td style="padding:24px 20px;border-bottom:2px solid #cc0000;">
//                     <h1 style="margin:0;color:#ffffff;font-size:20px;letter-spacing:0.08em;">
//                       NEW JOB APPLICATION
//                     </h1>
//                     <p style="margin:6px 0 0;color:#cc4444;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">
//                       International Statement Security Services
//                     </p>
//                   </td>
//                 </tr>

//                 <!-- Info Table -->
//                 <tr>
//                   <td style="padding:20px;">
//                     <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
//                       ${row('Full Name', fullName)}
//                       ${row('Email', `<a href="mailto:${email}" style="color:#ef4444;text-decoration:none;">${email}</a>`)}
//                       ${row('Phone', phone)}
//                       ${row('Position Applied', position)}
//                       ${row('Experience', experience)}
//                       ${row('Background', background)}
//                       ${row('Availability', availability)}
//                     </table>

//                     <!-- Message -->
//                     <div style="margin-top:20px;padding:14px;background:#0f0000;border-left:3px solid #cc0000;">
//                       <p style="color:#888;font-size:11px;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.15em;">
//                         Additional Information
//                       </p>
//                       <p style="color:#c0c8cc;font-size:14px;margin:0;line-height:1.6;word-break:break-word;">
//                         ${escapeHtml(message)}
//                       </p>
//                     </div>

//                     ${
//                       attachments.length > 0
//                         ? '<p style="color:#888;font-size:12px;margin-top:16px;">📎 CV attached to this email.</p>'
//                         : '<p style="color:#888;font-size:12px;margin-top:16px;">No CV uploaded.</p>'
//                     }

//                   </td>
//                 </tr>

//                 <!-- Footer -->
//                 <tr>
//                   <td style="padding:16px 20px;border-top:1px solid #2a0000;color:#555;font-size:11px;">
//                     Submitted via ISSS Career Portal
//                   </td>
//                 </tr>

//               </table>

//             </td>
//           </tr>
//         </table>
//       </div>
//       `,
//     })

//     // ── 4. Auto-reply to applicant ────────────────────────
//     await resend.emails.send({
//       from:    process.env.FROM_EMAIL!,
//       to:      email,
//       subject: 'Application Received – International Statement Security Services',
//       html: `
//         <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0000;color:#d0d8dd;padding:32px;border:1px solid #4a0000;">
//           <h2 style="color:#fff;font-size:20px;letter-spacing:0.06em;margin:0 0 8px;">Application Received</h2>
//           <div style="height:2px;background:linear-gradient(to right,#cc0000,transparent);margin-bottom:20px;"></div>
//           <p style="color:#c0c8cc;font-size:14px;line-height:1.7;margin:0 0 12px;">
//             Dear ${escapeHtml(fullName)},
//           </p>
//           <p style="color:#c0c8cc;font-size:14px;line-height:1.7;margin:0 0 12px;">
//             Thank you for applying for the <strong style="color:#fff;">${escapeHtml(position)}</strong> position at
//             International Statement Security Services.
//           </p>
//           <p style="color:#c0c8cc;font-size:14px;line-height:1.7;margin:0 0 20px;">
//             Our recruitment team will carefully review your application and reach out if your profile matches our current requirements.
//             This process typically takes <strong style="color:#fff;">5–10 business days</strong>.
//           </p>
//           <p style="color:#888;font-size:12px;line-height:1.6;margin:0;">
//             Please do not reply to this email. For enquiries contact
//             <a href="mailto:${process.env.HR_EMAIL}" style="color:#ef4444;">${process.env.HR_EMAIL}</a>.
//           </p>
//           <div style="margin-top:28px;padding-top:14px;border-top:1px solid #2a0000;color:#444;font-size:11px;">
//             International Statement Security Services — Confidential
//           </div>
//         </div>
//       `,
//     })

//     return NextResponse.json({ success: true })

//   } catch (err: any) {
//     console.error('[/api/apply]', err)
//     return NextResponse.json(
//       { error: 'Server error. Please try again later.' },
//       { status: 500 }
//     )
//   }
// }

// // ── Helpers ────────────────────────────────────────────────
// function row(label: string, value: string) {
//   return `
//     <tr>
//       <td style="padding:8px 12px 8px 0;color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;white-space:nowrap;vertical-align:top;">${label}</td>
//       <td style="padding:8px 0;color:#e0e8ec;font-size:14px;">${value}</td>
//     </tr>
//   `
// }

// function escapeHtml(str: string) {
//   return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
// }




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