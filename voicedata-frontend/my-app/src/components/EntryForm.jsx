///////////////////////////////////////////////////////
// import { useRef, useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import API from '../utils/api'

// function EntryForm({ onSuccess, editData, onCancelEdit }) {
//     const [listening, setListening] = useState(false)
//     const [message, setMessage] = useState('')
//     const [filledFields, setFilledFields] = useState([])
//     const [liveText, setLiveText] = useState('')
//     const recognitionRef = useRef(null)
//     const submitRef = useRef(null)
//     const listeningRef = useRef(false)
//     const accumulatedRef = useRef('')
//     const isEditMode = !!editData

//     const { register, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm({
//         defaultValues: {
//             name: '', city: '', gender: 'Male',
//             ds1: 'Subah', ds1Time: '', ds1Place: '',
//             ds2: 'Subah', ds2Time: '', ds2Place: '',
//             dateIn: '', dateOut: ''
//         }
//     })

//     useEffect(() => {
//         if (editData) {
//             setValue('name', editData.Name || '')
//             setValue('city', editData.City || '')
//             setValue('gender', editData.Gender || 'Male')
//             setValue('ds1', editData.DS1 || 'Subah')
//             setValue('ds1Time', editData['DS1 Time'] || '')
//             setValue('ds1Place', editData['DS1 Place'] || '')
//             setValue('ds2', editData.DS2 || 'Subah')
//             setValue('ds2Time', editData['DS2 Time'] || '')
//             setValue('ds2Place', editData['DS2 Place'] || '')
//             setValue('dateIn', editData['Date In'] || '')
//             setValue('dateOut', editData['Date Out'] || '')
//         }
//     }, [editData])

//     const startVoice = () => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//         if (!SpeechRecognition) { alert('Chrome use karo!'); return }

//         if (listeningRef.current) {
//             recognitionRef.current?.stop()
//             listeningRef.current = false
//             setListening(false)
//             setLiveText('')
//             accumulatedRef.current = ''
//             return
//         }

//         const recognition = new SpeechRecognition()
//         recognition.lang = 'en-IN'
//         recognition.continuous = true
//         recognition.interimResults = true
//         recognitionRef.current = recognition
//         listeningRef.current = true
//         accumulatedRef.current = ''
//         setListening(true)

//         recognition.onresult = (event) => {
//             let interimText = ''
//             for (let i = event.resultIndex; i < event.results.length; i++) {
//                 const t = event.results[i][0].transcript
//                 if (event.results[i].isFinal) {
//                     accumulatedRef.current += ' ' + t
//                 } else {
//                     interimText = t
//                 }
//             }
//             setLiveText((accumulatedRef.current + ' ' + interimText).trim())

//             if (accumulatedRef.current.toLowerCase().includes('submit') ||
//                 accumulatedRef.current.toLowerCase().includes('summit')) {
//                 recognition.stop()
//                 listeningRef.current = false
//                 setListening(false)
//                 setLiveText('⚡ Processing...')
//                 parseAndFill(accumulatedRef.current)
//                 accumulatedRef.current = ''
//             }
//         }

//         recognition.onerror = (e) => {
//             if (e.error !== 'no-speech') { listeningRef.current = false; setListening(false) }
//         }
//         recognition.onend = () => {
//             if (listeningRef.current) { try { recognition.start() } catch (e) { } }
//         }
//         recognition.start()
//     }

//     const highlight = (field, value) => {
//         setValue(field, value)
//         setFilledFields(prev => [...new Set([...prev, field])])
//         setTimeout(() => setFilledFields(prev => prev.filter(f => f !== field)), 1500)
//     }

//     const parseAndFill = (rawText) => {
//         let text = rawText.toLowerCase().trim()
//         console.log('Voice input:', text)

//         const monthMap = {
//             january: '01', february: '02', march: '03', april: '04',
//             may: '05', june: '06', july: '07', august: '08',
//             september: '09', october: '10', november: '11', december: '12',
//             jan: '01', feb: '02', mar: '03', apr: '04', jun: '06',
//             jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
//         }

//         const dsWordMap = {
//             subah: 'Subah', morning: 'Subah',
//             dopahar: 'Dopahar', duphar: 'Dopahar', afternoon: 'Dopahar',
//             sham: 'Sham', evening: 'Sham',
//             raat: 'Raat', night: 'Raat'
//         }

//         // Gender
//         if (/\b(female|lady|woman)\b/.test(text)) highlight('gender', 'Female')
//         else if (/\b(male|man)\b/.test(text)) highlight('gender', 'Male')

//         // DS slots — sabhi occurrences nikalo
//         const dsRegex = /\b(subah|morning|dopahar|duphar|afternoon|sham|evening|raat|night)\b/g
//         const dsMatches = []
//         let dm
//         while ((dm = dsRegex.exec(text)) !== null) {
//             dsMatches.push(dsWordMap[dm[1]])
//         }
//         if (dsMatches[0]) highlight('ds1', dsMatches[0])
//         if (dsMatches[1]) highlight('ds2', dsMatches[1])

//         // Times — pehli ds1Time, doosri ds2Time
//         const allTimes = []
//         const timeRe = /\b(\d{1,2})[: ](\d{2})\b/g
//         let tm
//         while ((tm = timeRe.exec(text)) !== null) {
//             allTimes.push(`${tm[1].padStart(2, '0')}:${tm[2]}`)
//         }
//         if (allTimes[0]) highlight('ds1Time', allTimes[0])
//         if (allTimes[1]) highlight('ds2Time', allTimes[1])

//         // Dates — pehli dateIn, doosri dateOut
//         const mNames = Object.keys(monthMap).join('|')
//         const allDates = []
//         const dateRe = new RegExp(`(\\d{1,2})\\s+(${mNames})\\s+(\\d{4})`, 'gi')
//         while ((dm = dateRe.exec(text)) !== null) {
//             const mo = monthMap[dm[2].toLowerCase()]
//             if (mo) allDates.push({ date: `${dm[3]}-${mo}-${dm[1].padStart(2, '0')}`, raw: dm[0] })
//         }
//         if (allDates[0]) highlight('dateIn', allDates[0].date)
//         if (allDates[1]) highlight('dateOut', allDates[1].date)

//         // Clean text — dates, numbers, stop words hato
//         let clean = text
//         allDates.forEach(d => { clean = clean.replace(d.raw, ' ') })
//         clean = clean
//             .replace(new RegExp(`\\b(${mNames})\\b`, 'gi'), ' ')
//             .replace(/\b\d{4}\b/g, ' ')
//             .replace(/\b\d{1,2}[: ]\d{2}\b/g, ' ')
//             .replace(/\b\d{1,2}\b/g, ' ')

//         const STOP = new Set([
//             'male', 'female', 'lady', 'man', 'woman',
//             'subah', 'dopahar', 'duphar', 'sham', 'raat',
//             'morning', 'evening', 'night', 'afternoon',
//             'submit', 'summit', 'time', 'baje', 'am', 'pm',
//             'the', 'and', 'is', 'ka', 'ki', 'ke', 'on', 'at', 'to', 'of', 'a', 'in', 'out', 'date'
//         ])

//         const words = clean.split(/\s+/)
//             .map(w => w.replace(/[^a-z]/gi, '').trim())
//             .filter(w => w.length > 1 && !STOP.has(w.toLowerCase()))

//         console.log('Words after clean:', words)

//         // words[0]=name, words[1]=city, words[2]=ds1Place, words[3+]=ds2Place
//         if (words[0]) highlight('name', cap(words[0]))
//         if (words[1]) highlight('city', cap(words[1]))
//         if (words[2]) highlight('ds1Place', cap(words[2]))
//         if (words.length >= 4) highlight('ds2Place', words.slice(3).map(cap).join(' '))

//         // Submit
//         setTimeout(() => { setLiveText(''); submitRef.current?.click() }, 600)
//     }

//     const cap = w => w ? w.charAt(0).toUpperCase() + w.slice(1) : ''

//     const onSubmit = async (data) => {
//         setMessage('')
//         try {
//             let res
//             if (isEditMode) {
//                 res = await API.put(`/entries/update/${editData.rowIndex}`, data)
//             } else {
//                 res = await API.post('/entries/submit', data)
//             }
//             if (res.data.success) {
//                 setMessage('success')
//                 reset()
//                 setTimeout(() => { setMessage(''); onSuccess() }, 1500)
//             }
//         } catch (err) { setMessage('error') }
//     }

//     const handleDownload = async () => {
//         const token = localStorage.getItem('token')
//         const res = await fetch('http://localhost:5000/api/entries/download', {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         const blob = await res.blob()
//         const url = window.URL.createObjectURL(blob)
//         const a = document.createElement('a'); a.href = url; a.download = 'entries.xlsx'; a.click()
//     }

//     const getInputStyle = (f) => ({
//         ...styles.input,
//         borderColor: errors[f] ? '#ef4444' : filledFields.includes(f) ? '#10b981' : '#e5e7eb',
//         boxShadow: filledFields.includes(f) ? '0 0 0 3px rgba(16,185,129,0.15)' : 'none',
//         background: filledFields.includes(f) ? '#f0fdf4' : '#fafafa',
//         transition: 'all 0.2s ease'
//     })

//     const watchGender = watch('gender')
//     const watchDS1 = watch('ds1')
//     const watchDS2 = watch('ds2')

//     const DSRadio = ({ fieldName, watchVal }) => (
//         <div style={styles.dsGroup}>
//             {[
//                 { val: 'Subah', icon: '🌅' },
//                 { val: 'Dopahar', icon: '☀️' },
//                 { val: 'Sham', icon: '🌆' },
//                 { val: 'Raat', icon: '🌙' }
//             ].map(slot => (
//                 <label key={slot.val} style={{
//                     ...styles.dsLabel,
//                     background: watchVal === slot.val ? '#1e1b4b' : '#f9fafb',
//                     borderColor: watchVal === slot.val ? '#1e1b4b' : '#e5e7eb',
//                     color: watchVal === slot.val ? '#fff' : '#374151',
//                     boxShadow: filledFields.includes(fieldName) && watchVal === slot.val
//                         ? '0 0 0 3px rgba(16,185,129,0.2)' : 'none'
//                 }}>
//                     <input type="radio" value={slot.val} style={{ display: 'none' }} {...register(fieldName)} />
//                     {slot.icon} {slot.val}
//                 </label>
//             ))}
//         </div>
//     )

//     return (
//         <div style={styles.card}>
//             <div style={styles.cardWaveBg}>
//                 <svg style={styles.cardWave} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                     <path d="M0,40 C360,100 720,0 1080,50 C1260,80 1350,20 1440,40 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.04)" />
//                 </svg>
//             </div>

//             <div style={{ position: 'relative', zIndex: 1 }}>

//                 {/* Voice Banner */}
//                 <div style={{
//                     ...styles.voiceBanner,
//                     borderColor: listening ? '#a78bfa' : '#ddd6fe',
//                     background: listening
//                         ? 'linear-gradient(135deg,#ede9fe,#ddd6fe)'
//                         : 'linear-gradient(135deg,#f5f3ff,#ede9fe)'
//                 }}>
//                     <div style={styles.waveWrapper}>
//                         {[...Array(12)].map((_, i) => (
//                             <div key={i} style={{
//                                 ...styles.waveBar,
//                                 animationDelay: `${i * 0.08}s`,
//                                 animationPlayState: listening ? 'running' : 'paused',
//                                 height: listening ? `${10 + Math.sin(i) * 20}px` : '5px',
//                                 background: listening ? `hsl(${230 + i * 10},75%,60%)` : '#d1d5db'
//                             }} />
//                         ))}
//                     </div>
//                     {liveText && <p style={styles.liveText}>"{liveText}"</p>}
//                     <p style={styles.voiceHint}>
//                         {listening
//                             ? '🎤 Speak'
//                             : '🎙️ "Diya Jaipur female subah 9:00 Tonk Phatak sham 5:00 Civil Lines 1 march 2026 5 march 2026 submit"'}
//                     </p>
//                 </div>

//                 {/* Top Row */}
//                 <div style={styles.topRow}>
//                     <h3 style={styles.heading}>{isEditMode ? '✏️ Edit Entry' : '📝 New Entry'}</h3>
//                     <div style={{ display: 'flex', gap: '10px' }}>
//                         <div style={{ position: 'relative', display: 'inline-block' }}>
//                             {listening && (
//                                 <>
//                                     <span style={styles.pulseRing} />
//                                     <span style={{ ...styles.pulseRing, animationDelay: '0.4s' }} />
//                                 </>
//                             )}
//                             <button style={{
//                                 ...styles.btn,
//                                 background: listening
//                                     ? 'linear-gradient(135deg,#ef4444,#dc2626)'
//                                     : 'linear-gradient(135deg,#10b981,#059669)',
//                                 boxShadow: listening
//                                     ? '0 4px 15px rgba(239,68,68,0.4)'
//                                     : '0 4px 15px rgba(16,185,129,0.3)'
//                             }} onClick={startVoice} type="button">
//                                 {listening ? '🔴 Stop' : '🎤 Voice Fill'}
//                             </button>
//                         </div>
//                         <button style={{
//                             ...styles.btn,
//                             background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
//                             boxShadow: '0 4px 15px rgba(79,70,229,0.3)'
//                         }} onClick={handleDownload} type="button">
//                              Excel
//                         </button>
//                     </div>
//                 </div>

//                 {isEditMode && (
//                     <div style={styles.editBanner}>
//                          Edit mode — voice se ya manually changes karo
//                         <button style={styles.cancelBtn} onClick={onCancelEdit} type="button">✕ Cancel</button>
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit(onSubmit)}>

//                     {/* Row 1: Gender | Date In | Date Out */}
//                     <div style={styles.row3}>
//                         <div style={styles.field}>
//                             <label style={styles.label}>Gender</label>
//                             <div style={styles.radioGroup}>
//                                 {['Male', 'Female'].map(g => (
//                                     <label key={g} style={{
//                                         ...styles.radioLabel,
//                                         background: watchGender === g ? '#ede9fe' : '#f9fafb',
//                                         borderColor: watchGender === g ? '#7c3aed' : '#e5e7eb',
//                                         color: watchGender === g ? '#7c3aed' : '#374151',
//                                         boxShadow: filledFields.includes('gender') && watchGender === g
//                                             ? '0 0 0 3px rgba(16,185,129,0.2)' : 'none'
//                                     }}>
//                                         <input type="radio" value={g} style={{ display: 'none' }} {...register('gender')} />
//                                         {g === 'Male' ? '👨 Male' : '👩 Female'}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                         <div style={styles.field}>
//                             <label style={styles.label}>Date In</label>
//                             <input style={getInputStyle('dateIn')} type="date"
//                                 {...register('dateIn', { required: 'Required' })} />
//                             {errors.dateIn && <span style={styles.error}>{errors.dateIn.message}</span>}
//                         </div>
//                         <div style={styles.field}>
//                             <label style={styles.label}>Date Out</label>
//                             <input style={getInputStyle('dateOut')} type="date"
//                                 {...register('dateOut', { required: 'Required' })} />
//                             {errors.dateOut && <span style={styles.error}>{errors.dateOut.message}</span>}
//                         </div>
//                     </div>

//                     {/* Row 2: Name | City */}
//                     <div style={styles.row2}>
//                         <div style={styles.field}>
//                             <label style={styles.label}>Name</label>
//                             <input style={getInputStyle('name')} placeholder="Enter name"
//                                 {...register('name', { required: 'Required' })} />
//                             {errors.name && <span style={styles.error}>{errors.name.message}</span>}
//                         </div>
//                         <div style={styles.field}>
//                             <label style={styles.label}>City</label>
//                             <input style={getInputStyle('city')} placeholder="Enter city"
//                                 {...register('city', { required: 'Required' })} />
//                             {errors.city && <span style={styles.error}>{errors.city.message}</span>}
//                         </div>
//                     </div>

//                     {/* DS1 Section */}
//                     <div style={styles.dsSection}>
//                         <p style={styles.dsSectionTitle}> DS Slot 1</p>
//                         <div style={styles.row3}>
//                             <div style={styles.field}>
//                                 <label style={styles.label}>DS1 Slot</label>
//                                 <DSRadio fieldName="ds1" watchVal={watchDS1} />
//                             </div>
//                             <div style={styles.field}>
//                                 <label style={styles.label}>DS1 Time</label>
//                                 <input style={getInputStyle('ds1Time')} type="time"
//                                     {...register('ds1Time', { required: 'Required' })} />
//                                 {errors.ds1Time && <span style={styles.error}>{errors.ds1Time.message}</span>}
//                             </div>
//                             <div style={styles.field}>
//                                 <label style={styles.label}>DS1 Place</label>
//                                 <input style={getInputStyle('ds1Place')} placeholder="Enter place"
//                                     {...register('ds1Place', { required: 'Required' })} />
//                                 {errors.ds1Place && <span style={styles.error}>{errors.ds1Place.message}</span>}
//                             </div>
//                         </div>
//                     </div>

//                     {/* DS2 Section */}
//                     <div style={{ ...styles.dsSection, background: '#f0f9ff', borderColor: '#bae6fd' }}>
//                         <p style={{ ...styles.dsSectionTitle, color: '#0369a1' }}> DS Slot 2</p>
//                         <div style={styles.row3}>
//                             <div style={styles.field}>
//                                 <label style={styles.label}>DS2 Slot</label>
//                                 <DSRadio fieldName="ds2" watchVal={watchDS2} />
//                             </div>
//                             <div style={styles.field}>
//                                 <label style={styles.label}>DS2 Time</label>
//                                 <input style={getInputStyle('ds2Time')} type="time"
//                                     {...register('ds2Time')} />
//                             </div>
//                             <div style={styles.field}>
//                                 <label style={styles.label}>DS2 Place</label>
//                                 <input style={getInputStyle('ds2Place')} placeholder="Enter place"
//                                     {...register('ds2Place')} />
//                             </div>
//                         </div>
//                     </div>

//                     {message === 'success' && (
//                         <div style={styles.successBox}>
//                             Entry {isEditMode ? 'updated' : 'saved'} successfully!
//                         </div>
//                     )}
//                     {message === 'error' && (
//                         <div style={styles.errorBox}>Something went wrong!</div>
//                     )}

//                     <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
//                         <button ref={submitRef} style={{
//                             ...styles.btn,
//                             background: isEditMode
//                                 ? 'linear-gradient(135deg,#f59e0b,#d97706)'
//                                 : 'linear-gradient(135deg,#4f46e5,#7c3aed)',
//                             flex: 1,
//                             boxShadow: '0 4px 15px rgba(79,70,229,0.3)',
//                             opacity: isSubmitting ? 0.8 : 1
//                         }} type="submit" disabled={isSubmitting}>
//                             {isSubmitting ? '⏳ Saving...' : isEditMode ? '✏️ Update Entry' : '💾 Submit Entry'}
//                         </button>
//                         <button style={{
//                             ...styles.btn,
//                             background: 'linear-gradient(135deg,#6b7280,#4b5563)',
//                             flex: 1
//                         }} type="button"
//                             onClick={() => { reset(); setMessage(''); if (onCancelEdit) onCancelEdit() }}>
//                              Reset / Cancel
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// const styles = {
//     card: {
//         background: '#fff', padding: '30px', borderRadius: '10px',
//         boxShadow: '0 2px 6px rgba(0,0,0,0.08)', width: '100%', maxWidth: '100%',
//         margin: '0', boxSizing: 'border-box', animation: 'fadeSlideUp 0.4s ease forwards',
//         position: 'relative', overflow: 'hidden'
//     },
//     cardWaveBg: {
//         position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//         zIndex: 0, pointerEvents: 'none', overflow: 'hidden'
//     },
//     cardWave: {
//         position: 'absolute', width: '200%', height: '100px',
//         top: '0%', left: 0, animation: 'bgWave 12s linear infinite'
//     },
//     voiceBanner: {
//         display: 'flex', flexDirection: 'column', alignItems: 'center',
//         gap: '8px', padding: '14px 20px', borderRadius: '12px',
//         marginBottom: '20px', border: '1px solid', transition: 'all 0.3s ease'
//     },
//     waveWrapper: { display: 'flex', alignItems: 'center', gap: '3px', height: '36px' },
//     waveBar: {
//         width: '4px', borderRadius: '10px',
//         transition: 'height 0.1s ease, background 0.2s ease',
//         animation: 'wave 0.8s ease-in-out infinite'
//     },
//     liveText: {
//         margin: 0, fontSize: '12px', color: '#4f46e5',
//         fontStyle: 'italic', fontWeight: '500', textAlign: 'center',
//         maxWidth: '90%', wordBreak: 'break-word'
//     },
//     voiceHint: { margin: 0, fontSize: '11px', color: '#7c3aed', fontWeight: '500', textAlign: 'center' },
//     topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
//     heading: { margin: 0, fontSize: '18px', color: '#1e1b4b', fontWeight: '700' },
//     editBanner: {
//         display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//         background: '#fef3c7', border: '1px solid #fcd34d', color: '#92400e',
//         padding: '10px 16px', borderRadius: '8px', fontSize: '13px',
//         fontWeight: '500', marginBottom: '16px'
//     },
//     cancelBtn: {
//         background: 'none', border: '1px solid #92400e', color: '#92400e',
//         padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px'
//     },
//     pulseRing: {
//         position: 'absolute', top: '50%', left: '50%',
//         transform: 'translate(-50%,-50%)', width: '100%', height: '100%',
//         borderRadius: '6px', border: '2px solid rgba(239,68,68,0.5)',
//         animation: 'pulse-ring 1.2s ease-out infinite', pointerEvents: 'none'
//     },
//     row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' },
//     row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
//     field: { display: 'flex', flexDirection: 'column', gap: '8px' },
//     label: { fontSize: '13px', fontWeight: '600', color: '#374151' },
//     radioGroup: { display: 'flex', gap: '8px' },
//     radioLabel: {
//         flex: 1, padding: '10px', border: '1.5px solid', borderRadius: '8px',
//         cursor: 'pointer', fontSize: '13px', fontWeight: '600',
//         textAlign: 'center', transition: 'all 0.2s ease'
//     },
//     dsSection: {
//         background: '#fafaf9', border: '1px solid #e5e7eb',
//         borderRadius: '12px', padding: '16px 20px', marginBottom: '16px'
//     },
//     dsSectionTitle: {
//         margin: '0 0 12px 0', fontSize: '14px',
//         fontWeight: '700', color: '#4f46e5'
//     },
//     dsGroup: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' },
//     dsLabel: {
//         padding: '8px 6px', border: '1.5px solid', borderRadius: '8px',
//         cursor: 'pointer', fontSize: '12px', fontWeight: '600',
//         textAlign: 'center', transition: 'all 0.2s ease'
//     },
//     input: {
//         padding: '11px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb',
//         fontSize: '14px', outline: 'none', color: '#1f2937',
//         width: '100%', boxSizing: 'border-box'
//     },
//     btn: {
//         padding: '10px 18px', color: '#fff', border: 'none',
//         borderRadius: '8px', cursor: 'pointer', fontSize: '14px',
//         fontWeight: '600', position: 'relative'
//     },
//     error: { color: '#ef4444', fontSize: '12px' },
//     successBox: {
//         background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a',
//         padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
//         fontWeight: '500', marginTop: '16px'
//     },
//     errorBox: {
//         background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626',
//         padding: '12px 16px', borderRadius: '10px', fontSize: '14px',
//         fontWeight: '500', marginTop: '16px'
//     }
// }

// export default EntryForm
//////////////////////////////////////////////////////


import { useRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import API from '../utils/api'


function EntryForm({ onSuccess, editData, onCancelEdit }) {
    const [listening, setListening] = useState(false)
    const [message, setMessage] = useState('')
    const [filledFields, setFilledFields] = useState([])
    const [liveText, setLiveText] = useState('')
    const recognitionRef = useRef(null)
    const submitRef = useRef(null)
    const listeningRef = useRef(false)
    const accumulatedRef = useRef('')
    const isEditMode = !!editData

    const { register, handleSubmit, setValue, reset, watch, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: '', city: '', gender: 'Male',
            ds1: 'Subah', ds1Time: '', ds1Place: '',
            ds2: '', ds2Time: '', ds2Place: '',
            dateIn: '', dateOut: ''
        }
    })

    useEffect(() => {
        if (editData) {
            setValue('name', editData.Name || '')
            setValue('city', editData.City || '')
            setValue('gender', editData.Gender || 'Male')
            setValue('ds1', editData.DS1 || 'Subah')
            setValue('ds1Time', editData['DS1 Time'] || '')
            setValue('ds1Place', editData['DS1 Place'] || '')
            setValue('ds2', editData.DS2 || '')
            setValue('ds2Time', editData['DS2 Time'] || '')
            setValue('ds2Place', editData['DS2 Place'] || '')
            setValue('dateIn', editData['Date In'] || '')
            setValue('dateOut', editData['Date Out'] || '')
        }
    }, [editData])

    const startVoice = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) { alert('Chrome use karo!'); return }

        if (listeningRef.current) {
            recognitionRef.current?.stop()
            listeningRef.current = false
            setListening(false)
            setLiveText('')
            accumulatedRef.current = ''
            return
        }

        const recognition = new SpeechRecognition()
        recognition.lang = 'en-IN'
        recognition.continuous = true
        recognition.interimResults = true
        recognitionRef.current = recognition
        listeningRef.current = true
        accumulatedRef.current = ''
        setListening(true)

        recognition.onresult = (event) => {
            let interimText = ''
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const t = event.results[i][0].transcript
                if (event.results[i].isFinal) accumulatedRef.current += ' ' + t
                else interimText = t
            }
            setLiveText((accumulatedRef.current + ' ' + interimText).trim())
            if (accumulatedRef.current.toLowerCase().includes('submit') ||
                accumulatedRef.current.toLowerCase().includes('summit')) {
                recognition.stop()
                listeningRef.current = false
                setListening(false)
                setLiveText('Processing...')
                parseAndFill(accumulatedRef.current)
                accumulatedRef.current = ''
            }
        }

        recognition.onerror = (e) => {
            if (e.error !== 'no-speech') { listeningRef.current = false; setListening(false) }
        }
        recognition.onend = () => {
            if (listeningRef.current) { try { recognition.start() } catch (e) { } }
        }
        recognition.start()
    }

    const highlight = (field, value) => {
        setValue(field, value)
        setFilledFields(prev => [...new Set([...prev, field])])
        setTimeout(() => setFilledFields(prev => prev.filter(f => f !== field)), 1500)
    }

    const parseAndFill = (rawText) => {
        let text = rawText.toLowerCase().trim()
        const monthMap = {
            january:'01',february:'02',march:'03',april:'04',may:'05',june:'06',
            july:'07',august:'08',september:'09',october:'10',november:'11',december:'12',
            jan:'01',feb:'02',mar:'03',apr:'04',jun:'06',jul:'07',aug:'08',sep:'09',oct:'10',nov:'11',dec:'12'
        }
        const mNames = Object.keys(monthMap).join('|')
        const dsWordMap = {
            subah:'Subah',morning:'Subah',dopahar:'Dopahar',duphar:'Dopahar',
            afternoon:'Dopahar',sham:'Sham',evening:'Sham',raat:'Raat',night:'Raat'
        }
        const wordNumMap = {
            'one':'1','two':'2','three':'3','four':'4','five':'5','six':'6','seven':'7',
            'eight':'8','nine':'9','ten':'10','eleven':'11','twelve':'12','thirteen':'13',
            'fourteen':'14','fifteen':'15','sixteen':'16','seventeen':'17','eighteen':'18',
            'nineteen':'19','twenty':'20','twenty one':'21','twenty two':'22','twenty three':'23',
            'twenty four':'24','twenty five':'25','twenty six':'26','twenty seven':'27',
            'twenty eight':'28','twenty nine':'29','thirty':'30','thirty one':'31',
            'first':'1','second':'2','third':'3','fourth':'4','fifth':'5','sixth':'6',
            'seventh':'7','eighth':'8','ninth':'9','tenth':'10','eleventh':'11','twelfth':'12',
            'thirteenth':'13','fourteenth':'14','fifteenth':'15','sixteenth':'16',
            'seventeenth':'17','eighteenth':'18','nineteenth':'19','twentieth':'20','thirtieth':'30'
        }
        Object.entries(wordNumMap).forEach(([word, num]) => {
            const re = new RegExp(`\\b${word}\\b(?=\\s+(${mNames}))`, 'gi')
            text = text.replace(re, num)
        })
        text = text.replace(/\b(\d+)(?:st|nd|rd|th)\b/g, '$1')

        if (/\b(female|lady|woman)\b/.test(text)) highlight('gender', 'Female')
        else if (/\b(male|man)\b/.test(text)) highlight('gender', 'Male')

        const dsRegex = /\b(subah|morning|dopahar|duphar|afternoon|sham|evening|raat|night)\b/g
        const dsMatches = []
        let dm
        while ((dm = dsRegex.exec(text)) !== null) dsMatches.push({ val: dsWordMap[dm[1]], idx: dm.index })
        if (dsMatches[0]) highlight('ds1', dsMatches[0].val)
        if (dsMatches[1]) highlight('ds2', dsMatches[1].val)

        const timeRe = /\b(\d{1,2})[: ](\d{2})\b/g
        const allTimes = []
        let tm
        while ((tm = timeRe.exec(text)) !== null)
            allTimes.push({ val: `${tm[1].padStart(2,'0')}:${tm[2]}`, idx: tm.index })
        if (allTimes[0]) highlight('ds1Time', allTimes[0].val)
        if (allTimes[1]) highlight('ds2Time', allTimes[1].val)

        const allDates = []
        const dateRe = new RegExp(`(\\d{1,2})\\s+(${mNames})\\s+(\\d{4})`, 'gi')
        while ((dm = dateRe.exec(text)) !== null) {
            const mo = monthMap[dm[2].toLowerCase()]
            if (mo) allDates.push({ date: `${dm[3]}-${mo}-${dm[1].padStart(2,'0')}`, raw: dm[0] })
        }
        if (allDates[0]) highlight('dateIn', allDates[0].date)
        if (allDates[1]) highlight('dateOut', allDates[1].date)

        let clean = text
        allDates.forEach(d => { clean = clean.replace(d.raw, ' ') })
        clean = clean
            .replace(new RegExp(`\\b(${mNames})\\b`, 'gi'), ' ')
            .replace(/\b\d{4}\b/g, ' ')
            .replace(/\b\d{1,2}[: ]\d{2}\b/g, ' ')
            .replace(/\b\d{1,2}\b/g, ' ')

        const STOP = new Set([
            'male','female','lady','man','woman','subah','dopahar','duphar','sham','raat',
            'morning','evening','night','afternoon','submit','summit','time','baje','am','pm',
            'the','and','is','ka','ki','ke','on','at','to','of','a','in','out','date',
            'one','two','three','four','five','six','seven','eight','nine','ten','eleven',
            'twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen',
            'nineteen','twenty','thirty','first','second','third','fourth','fifth',
            'sixth','seventh','eighth','ninth','tenth','eleventh','twelfth'
        ])

        const cleanWords = clean.split(/\s+/)
            .map(w => w.replace(/[^a-z]/gi, '').trim())
            .filter(w => w.length > 1 && !STOP.has(w.toLowerCase()))

        if (cleanWords[0]) highlight('name', cap(cleanWords[0]))
        if (cleanWords[1]) highlight('city', cap(cleanWords[1]))
        if (cleanWords[2]) highlight('ds1Place', cap(cleanWords[2]))
        if (cleanWords.length >= 4) highlight('ds2Place', cleanWords.slice(3).map(cap).join(' '))

        setTimeout(() => { setLiveText(''); submitRef.current?.click() }, 600)
    }

    const cap = w => w ? w.charAt(0).toUpperCase() + w.slice(1) : ''

    const onSubmit = async (data) => {
        setMessage('')
        try {
            let res
            if (isEditMode) {
                res = await API.put(`/entries/update/${editData.rowIndex}`, data)
            } else {
                res = await API.post('/entries/submit', data)
            }
            if (res.data.success) {
                setMessage('success')
                reset()
                setTimeout(() => setMessage(''), 1500)
            }
        } catch (err) { setMessage('error') }
    }

    const handleDownload = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:5000/api/entries/download?t=${Date.now()}`, {
            headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
        })
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `entries_${new Date().toISOString().split('T')[0]}.xlsx`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }

    const isFilled = (f) => filledFields.includes(f)

    const watchGender = watch('gender')
    const watchDS1 = watch('ds1')
    const watchDS2 = watch('ds2')

    const DSRadio = ({ fieldName, watchVal }) => (
        <div className="ef-ds-group">
            {[{val:'Subah',icon:'🌅'},{val:'Dopahar',icon:'☀️'},{val:'Sham',icon:'🌆'},{val:'Raat',icon:'🌙'}].map(slot => (
                <label key={slot.val} className={`ef-ds-label ${watchVal === slot.val ? 'active' : ''} ${isFilled(fieldName) && watchVal === slot.val ? 'filled-highlight' : ''}`}>
                    <input type="radio" value={slot.val} style={{ display: 'none' }} {...register(fieldName)} />
                    {slot.icon} {slot.val}
                </label>
            ))}
        </div>
    )

    return (
        <div className="ef-card">
            <div className="ef-wave-bg">
                <svg className="ef-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <path d="M0,40 C360,100 720,0 1080,50 C1260,80 1350,20 1440,40 L1440,120 L0,120 Z" fill="rgba(99,102,241,0.04)" />
                </svg>
            </div>

            <div className="ef-inner">
                {/* Voice Banner */}
                <div className={`ef-voice-banner ${listening ? 'listening' : ''}`}>
                    <div className="ef-wave-wrapper">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="ef-wave-bar" style={{
                                animationDelay: `${i * 0.08}s`,
                                height: listening ? `${10 + Math.sin(i) * 20}px` : '5px',
                                background: listening ? `hsl(${230 + i * 10},75%,60%)` : '#d1d5db'
                            }} />
                        ))}
                    </div>
                    {liveText && <p className="ef-live-text">"{liveText}"</p>}
                    <p className="ef-voice-hint">
                        {listening ? '🎤 Speak Now......'
                            : '🎙️ "Diya Jaipur female subah 9:00 TonkPhatak sham 5:00 CivilLines 1 march 2026 5 march 2026 submit"'}
                    </p>
                </div>

                {/* Top Row */}
                <div className="ef-top-row">
                    <h3 className="ef-heading">{isEditMode ? '✏️ Edit Entry' : '📝 New Entry'}</h3>
                    <div className="ef-btn-group">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            {listening && (<><span className="ef-pulse-ring" /><span className="ef-pulse-ring delay" /></>)}
                            <button className={`ef-btn ef-btn-voice ${listening ? 'recording' : ''}`} onClick={startVoice} type="button">
                                {listening ? '🔴 Stop' : '🎤 Voice Fill'}
                            </button>
                        </div>
                        <button className="ef-btn ef-btn-excel" onClick={handleDownload} type="button">
                            📥 Excel
                        </button>
                    </div>
                </div>

                {isEditMode && (
                    <div className="ef-edit-banner">
                        ✏️ Edit mode active
                        <button className="ef-cancel-btn" onClick={onCancelEdit} type="button">✕ Cancel</button>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Gender, Date In, Date Out */}
                    <div className="ef-row3">
                        <div className="ef-field">
                            <label className="ef-label">Gender</label>
                            <div className="ef-radio-group">
                                {['Male', 'Female'].map(g => (
                                    <label key={g} className={`ef-radio-label ${watchGender === g ? 'active' : ''} ${isFilled('gender') && watchGender === g ? 'filled-highlight' : ''}`}>
                                        <input type="radio" value={g} style={{ display: 'none' }} {...register('gender')} />
                                        {g === 'Male' ? '👨 Male' : '👩 Female'}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="ef-field">
                            <label className="ef-label">Date In</label>
                            <input className={`ef-input ${isFilled('dateIn') ? 'filled' : ''} ${errors.dateIn ? 'error' : ''}`} type="date" {...register('dateIn', { required: 'Required' })} />
                            {errors.dateIn && <span className="ef-error">{errors.dateIn.message}</span>}
                        </div>
                        <div className="ef-field">
                            <label className="ef-label">Date Out</label>
                            <input className={`ef-input ${isFilled('dateOut') ? 'filled' : ''} ${errors.dateOut ? 'error' : ''}`} type="date" {...register('dateOut', { required: 'Required' })} />
                            {errors.dateOut && <span className="ef-error">{errors.dateOut.message}</span>}
                        </div>
                    </div>

                    {/* Name, City */}
                    <div className="ef-row2">
                        <div className="ef-field">
                            <label className="ef-label">Name</label>
                            <input className={`ef-input ${isFilled('name') ? 'filled' : ''} ${errors.name ? 'error' : ''}`} placeholder="Enter name" {...register('name', { required: 'Required' })} />
                            {errors.name && <span className="ef-error">{errors.name.message}</span>}
                        </div>
                        <div className="ef-field">
                            <label className="ef-label">City</label>
                            <input className={`ef-input ${isFilled('city') ? 'filled' : ''} ${errors.city ? 'error' : ''}`} placeholder="Enter city" {...register('city', { required: 'Required' })} />
                            {errors.city && <span className="ef-error">{errors.city.message}</span>}
                        </div>
                    </div>

                    {/* DS Slot 1 */}
                    <div className="ef-ds-section">
                        <p className="ef-ds-title">🔵 DS Slot 1</p>
                        <div className="ef-row3">
                            <div className="ef-field">
                                <label className="ef-label">DS1 Slot</label>
                                <DSRadio fieldName="ds1" watchVal={watchDS1} />
                            </div>
                            <div className="ef-field">
                                <label className="ef-label">DS1 Time</label>
                                <input className={`ef-input ${isFilled('ds1Time') ? 'filled' : ''} ${errors.ds1Time ? 'error' : ''}`} type="time" {...register('ds1Time', { required: 'Required' })} />
                                {errors.ds1Time && <span className="ef-error">{errors.ds1Time.message}</span>}
                            </div>
                            <div className="ef-field">
                                <label className="ef-label">DS1 Place</label>
                                <input className={`ef-input ${isFilled('ds1Place') ? 'filled' : ''} ${errors.ds1Place ? 'error' : ''}`} placeholder="Enter place" {...register('ds1Place', { required: 'Required' })} />
                                {errors.ds1Place && <span className="ef-error">{errors.ds1Place.message}</span>}
                            </div>
                        </div>
                    </div>

                    {/* DS Slot 2 */}
                    <div className="ef-ds-section ds2">
                        <p className="ef-ds-title">🟦 DS Slot 2</p>
                        <div className="ef-row3">
                            <div className="ef-field">
                                <label className="ef-label">DS2 Slot</label>
                                <DSRadio fieldName="ds2" watchVal={watchDS2} />
                            </div>
                            <div className="ef-field">
                                <label className="ef-label">DS2 Time</label>
                                <input className={`ef-input ${isFilled('ds2Time') ? 'filled' : ''}`} type="time" {...register('ds2Time')} />
                            </div>
                            <div className="ef-field">
                                <label className="ef-label">DS2 Place</label>
                                <input className={`ef-input ${isFilled('ds2Place') ? 'filled' : ''}`} placeholder="Enter place" {...register('ds2Place')} />
                            </div>
                        </div>
                    </div>

                    {message === 'success' && <div className="ef-success">✅ Entry {isEditMode ? 'updated' : 'saved'} successfully!</div>}
                    {message === 'error'   && <div className="ef-err-box">❌ Something went wrong!</div>}

                    <div className="ef-submit-row">
                        <button ref={submitRef} className={`ef-btn ef-btn-submit ${isEditMode ? 'edit-mode' : ''}`} type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Saving...' : isEditMode ? '✏️ Update Entry' : '✅ Submit Entry'}
                        </button>
                        <button className="ef-btn ef-btn-reset" type="button"
                            onClick={() => { reset(); setMessage(''); if (onCancelEdit) onCancelEdit() }}>
                            🔄 Reset / Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EntryForm