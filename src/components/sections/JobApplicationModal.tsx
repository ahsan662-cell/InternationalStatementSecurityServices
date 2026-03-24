'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ──────────────────────────────────────────────────
interface FormData {
  fullName:     string
  email:        string
  phone:        string
  position:     string
  experience:   string
  background:   string
  availability: string
  message:      string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const POSITIONS = [
  'Close Protection Officer',
  'Executive Protection Specialist',
  'Secure Transportation Specialist',
  'Other',
]

const EXPERIENCE_OPTIONS = [
  '0–2 years',
  '2–5 years',
  '5–10 years',
  '10+ years',
]

const BACKGROUND_OPTIONS = [
  'Military',
  'Law Enforcement',
  'Private Security',
  'Intelligence / Government',
  'Other',
]

const AVAILABILITY_OPTIONS = [
  'Immediately',
  'Within 1 month',
  '1–3 months',
  '3+ months',
]

// ── Close icon ─────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

// ── Field wrapper ──────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400/80">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

// ── Input styles (shared) ──────────────────────────────────
const inputCls = `
  w-full bg-black/50 border border-red-900/40 text-white text-sm px-3 py-2.5
  outline-none placeholder-white transition-colors duration-200
  focus:border-red-600/70 focus:bg-black/70
`.trim()

const selectCls = `${inputCls} appearance-none cursor-pointer`

// ── Main component ─────────────────────────────────────────
interface Props {
  isOpen:    boolean
  onClose:   () => void
  /** Pre-fill position from job card "Apply Now" buttons */
  position?: string
}

export default function JobApplicationModal({ isOpen, onClose, position = '' }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName]   = useState('')
  const [fileError, setFileError] = useState('')
  const [status, setStatus]       = useState<Status>('idle')
  const [errorMsg, setErrorMsg]   = useState('')
    console.log("Positooion: ",position);
  const [form, setForm] = useState<FormData>({
    fullName:     '',
    email:        '',
    phone:        '',
    position:     position || POSITIONS[0],
    experience:   EXPERIENCE_OPTIONS[0],
    background:   BACKGROUND_OPTIONS[0],
    availability: AVAILABILITY_OPTIONS[0],
    message:      '',
  })

  // Update a single field
  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  // CV file pick
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFileError('')
    if (!file) return
    if (file.type !== 'application/pdf') {
      setFileError('Please upload a PDF file only.')
      e.target.value = ''
      setFileName('')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File must be under 5 MB.')
      e.target.value = ''
      setFileName('')
      return
    }
    setFileName(file.name)
  }

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const payload = new FormData()
      // Append text fields
      payload.append("formType","jobApplication")
      Object.entries(form).forEach(([k, v]) => payload.append(k, v))
      // Append CV if picked
      const file = fileRef.current?.files?.[0]
      if (file) payload.append('cv', file)

      const res = await fetch('/api/apply', { method: 'POST', body: payload })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Submission failed')

      setStatus('success')
      // Reset after 3 s and close
      setTimeout(() => {
        setStatus('idle')
        setFileName('')
        setForm({ fullName:'', email:'', phone:'', position:POSITIONS[0], experience:EXPERIENCE_OPTIONS[0], background:BACKGROUND_OPTIONS[0], availability:AVAILABILITY_OPTIONS[0], message:'' })
        onClose()
      }, 3000)

    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong.')
    }
  }

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        // ── Backdrop ──────────────────────────────────────
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleBackdrop}
        >
          {/* ── Modal panel ─────────────────────────────── */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(160deg, #0d0000 0%, #050000 100%)',
              border: '1px solid rgba(180,0,0,0.35)',
              boxShadow: '0 0 80px rgba(160,0,0,0.18)',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner brackets */}
            <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-red-600/70 pointer-events-none"/>
            <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-red-600/70 pointer-events-none"/>
            <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-red-600/70 pointer-events-none"/>
            <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-red-600/70 pointer-events-none"/>

            {/* Top red line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/80 to-transparent pointer-events-none"/>

            {/* ── Header ─────────────────────────────────── */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-red-900/25">
              <div>
                <p className="text-red-500/70 text-[10px] font-bold tracking-[0.3em] uppercase mb-1">— Join Our Team —</p>
                <h2
                  className="text-white font-bold text-xl sm:text-2xl uppercase tracking-widest"
                  style={{ fontFamily: "'Rajdhani','Barlow Condensed',sans-serif" }}
                >
                  Apply Now
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors duration-200 mt-1 p-1"
                aria-label="Close modal"
              >
                <CloseIcon/>
              </button>
            </div>

            {/* ── Success state ───────────────────────────── */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
                >
                  <div className="w-14 h-14 rounded-full border-2 border-red-600/60 flex items-center justify-center bg-red-950/40">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h3 className="text-white text-xl font-bold tracking-wide" style={{ fontFamily: "'Rajdhani',sans-serif" }}>
                    Application Received
                  </h3>
                  <p className="text-white text-sm max-w-xs">
                    Thank you for applying. Our recruitment team will review your application and reach out shortly.
                  </p>
                </motion.div>
              ) : (

                // ── Form ────────────────────────────────────
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="px-6 py-5 flex flex-col gap-5"
                  encType="multipart/form-data"
                >
                  {/* Row 1: Full name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name" required>
                      <input
                        type="text" required placeholder="John Smith"
                        className={inputCls} value={form.fullName} onChange={set('fullName')}
                      />
                    </Field>
                    <Field label="Email Address" required>
                      <input
                        type="email" required placeholder="you@email.com"
                        className={inputCls} value={form.email} onChange={set('email')}
                      />
                    </Field>
                  </div>

                  {/* Row 2: Phone + Position */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone Number">
                      <input
                        type="tel" placeholder="+1 000 000 0000"
                        className={inputCls} value={form.phone} onChange={set('phone')}
                      />
                    </Field>
                    <Field label="Position Applying For" required>
                      <div className="relative">
                        <select
                          required className={selectCls}
                          value={form.position} onChange={set('position')}
                        >
                        {
                            position? <option key={position} value={position}>{position}</option>:
                            POSITIONS.map(p => <option key={p} value={p}>{p}</option>)
                        }
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </Field>
                  </div>

                  {/* Row 3: Experience + Background */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Years of Experience" required>
                      <div className="relative">
                        <select required className={selectCls} value={form.experience} onChange={set('experience')}>
                          {EXPERIENCE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </Field>
                    <Field label="Professional Background" required>
                      <div className="relative">
                        <select required className={selectCls} value={form.background} onChange={set('background')}>
                          {BACKGROUND_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </Field>
                  </div>

                  {/* Row 4: Availability */}
                  <Field label="Availability to Start">
                    <div className="relative">
                      <select className={selectCls} value={form.availability} onChange={set('availability')}>
                        {AVAILABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </Field>

                  {/* CV Upload */}
                  <Field label="Upload CV / Resume">
                    <div
                      className="relative flex items-center gap-3 px-3 py-2.5 border border-dashed border-red-900/50 hover:border-red-600/60 cursor-pointer transition-colors duration-200 bg-black/30"
                      onClick={() => fileRef.current?.click()}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200,30,30,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <span className="text-sm text-white">
                        {fileName
                          ? <span className="text-red-300">{fileName}</span>
                          : 'Click to upload PDF (max 5 MB)'}
                      </span>
                      <input
                        ref={fileRef} type="file" accept=".pdf"
                        className="sr-only" onChange={handleFile}
                      />
                    </div>
                    {fileError && <p className="text-red-400 text-xs mt-1">{fileError}</p>}
                  </Field>

                  {/* Additional info */}
                  <Field label="Additional Information">
                    <textarea
                      rows={3} placeholder="Briefly describe your relevant experience, languages spoken, or anything else you'd like us to know..."
                      className={`${inputCls} resize-none`}
                      value={form.message} onChange={set('message')}
                    />
                  </Field>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="text-red-400 text-sm bg-red-950/30 border border-red-800/40 px-3 py-2">
                      ⚠ {errorMsg}
                    </p>
                  )}

                  {/* Disclaimer + Submit */}
                  <div className="flex flex-col gap-3 pt-1">
                    <p className="text-white text-xs leading-relaxed">
                      By submitting this form you consent to ISSS processing your personal data for recruitment purposes in accordance with our Privacy Policy.
                    </p>
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 text-sm font-bold tracking-[0.18em] uppercase text-white
                                 bg-red-700 hover:bg-red-600 disabled:bg-red-900/40 disabled:cursor-not-allowed
                                 transition-colors duration-200 flex items-center justify-center gap-2"
                      style={{
                        clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))',
                        boxShadow: status === 'loading' ? 'none' : '0 0 24px rgba(180,0,0,0.4)',
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 010 20" strokeLinecap="round"/></svg>
                          Submitting…
                        </>
                      ) : (
                        'Submit Application →'
                      )}
                    </motion.button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}