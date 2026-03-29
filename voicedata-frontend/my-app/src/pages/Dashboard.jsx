// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import EntryForm from '../components/EntryForm'
// import EntriesTable from '../components/EntriesTable'

// function Dashboard() {
//   const navigate = useNavigate()
//   const [refresh, setRefresh] = useState(0)
//   const [activePage, setActivePage] = useState('newEntry')

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     navigate('/login')
//   }

//   return (
//     <div style={styles.wrapper}>

//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         <div>
//           <div style={styles.logoWrapper}>
//             <span style={styles.logoIcon}>⚡</span>
//             <h2 style={styles.logo}>Admin Panel</h2>
//           </div>

//           <div style={styles.divider} />

//           <p style={styles.menuLabel}>MENU</p>

//           <div
//             style={{
//               ...styles.navItem,
//               background: activePage === 'newEntry' ? 'rgba(255,255,255,0.15)' : 'transparent',
//               borderLeft: activePage === 'newEntry' ? '4px solid #818cf8' : '4px solid transparent',
//             }}
//             onClick={() => setActivePage('newEntry')}
//           >
//             <span style={styles.navIcon}>📝</span>
//             <span>New Entry</span>
//           </div>

//           <div
//             style={{
//               ...styles.navItem,
//               background: activePage === 'allEntries' ? 'rgba(255,255,255,0.15)' : 'transparent',
//               borderLeft: activePage === 'allEntries' ? '4px solid #818cf8' : '4px solid transparent',
//             }}
//             onClick={() => setActivePage('allEntries')}
//           >
//             <span style={styles.navIcon}>📋</span>
//             <span>All Entries</span>
//           </div>
//         </div>

//         <button style={styles.logoutBtn} onClick={handleLogout}>
//           🚪 Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div style={styles.main}>

//         {/* Topbar */}
//         <div style={styles.topbar}>
//           <h3 style={styles.pageTitle}>
//             {activePage === 'newEntry' ? '📝 New Entry' : '📋 All Entries'}
//           </h3>
//           <div style={styles.adminBadge}>👤 Admin</div>
//         </div>

//         {/* Content */}
//        {/* Content */}
// {/* Content */}
// <div style={activePage === 'allEntries' ? styles.contentFull : styles.content}>
//   {activePage === 'newEntry' && (
//     <EntryForm onSuccess={() => {
//       setRefresh(prev => prev + 1)
//       setActivePage('allEntries')
//     }} />
//   )}
//   {activePage === 'allEntries' && (
//     <EntriesTable refresh={refresh} />
//   )}
// </div>

//       </div>
//     </div>
//   )
// }

// const SIDEBAR_WIDTH = '240px'

// const styles = {
//   wrapper: {
//     display: 'flex',
//     minHeight: '100vh',
//     fontFamily: 'Segoe UI, sans-serif'
//   },
//   sidebar: {
//     width: SIDEBAR_WIDTH,
//     minWidth: SIDEBAR_WIDTH,
//     background: 'linear-gradient(180deg, #1e1b4b 0%, #2d2a6e 100%)',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     padding: '24px 0',
//     height: '100vh',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     zIndex: 100,
//     boxShadow: '4px 0 12px rgba(0,0,0,0.2)'
//   },
//   logoWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//     padding: '0 20px',
//     marginBottom: '8px'
//   },
//   logoIcon: {
//     fontSize: '24px'
//   },
//   logo: {
//     color: '#fff',
//     fontSize: '18px',
//     margin: 0,
//     fontWeight: '700',
//     letterSpacing: '0.5px'
//   },
//   divider: {
//     height: '1px',
//     background: 'rgba(255,255,255,0.1)',
//     margin: '16px 20px'
//   },
//   menuLabel: {
//     color: 'rgba(255,255,255,0.4)',
//     fontSize: '11px',
//     fontWeight: '600',
//     letterSpacing: '1.5px',
//     padding: '0 24px',
//     marginBottom: '8px'
//   },
//   navItem: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     padding: '13px 24px',
//     cursor: 'pointer',
//     color: 'rgba(255,255,255,0.85)',
//     fontSize: '14px',
//     fontWeight: '500',
//     transition: 'all 0.2s',
//     marginBottom: '4px'
//   },
//   navIcon: {
//     fontSize: '18px'
//   },
//   logoutBtn: {
//     margin: '0 20px',
//     padding: '11px',
//     background: 'rgba(239,68,68,0.85)',
//     color: '#fff',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '500',
//     width: 'calc(100% - 40px)'
//   },
//  main: {
//     marginLeft: SIDEBAR_WIDTH,
//     flex: 1,
//     background: '#f0f2f5',
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     width: `calc(100% - ${SIDEBAR_WIDTH})`,  // ← ye add karo
//     overflow: 'hidden'                        // ← ye add karo
// },
//   topbar: {
//     background: '#fff',
//     padding: '16px 28px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//     position: 'sticky',
//     top: 0,
//     zIndex: 50
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: '18px',
//     color: '#1e1b4b',
//     fontWeight: '600'
//   },
//   adminBadge: {
//     background: '#ede9fe',
//     color: '#4f46e5',
//     padding: '6px 14px',
//     borderRadius: '20px',
//     fontSize: '13px',
//     fontWeight: '600'
//   },
//   content: {
//     padding: '28px',
//     flex: 1
//   },
//   contentFull: {
//   padding: '0',      // ← All Entries ke liye no padding
//   flex: 1
// },
// }

// export default Dashboard


// import { useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import EntryForm from '../components/EntryForm'
// import EntriesTable from '../components/EntriesTable'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'

// const SIDEBAR_WIDTH = '240px'

// function Dashboard() {
//   const navigate = useNavigate()
//   const [refresh, setRefresh] = useState(0)
//   const [activePage, setActivePage] = useState('newEntry')
//   const [showAdminMenu, setShowAdminMenu] = useState(false)

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     navigate('/login')
//   }

//   return (
//     <div style={styles.wrapper}>

//       {/* Sidebar Component */}
//       <Sidebar activePage={activePage} setActivePage={setActivePage} />

//       {/* Main Content */}
//       <div style={styles.main}>

//         {/* Topbar */}
//         <div style={styles.topbar}>
//           <h3 style={styles.pageTitle}>
//             {activePage === 'newEntry' ? '📝 New Entry' : '📋 All Entries'}
//           </h3>

//           {/* Admin Dropdown */}
//           <div style={{ position: 'relative' }}>
//             <div
//               style={styles.adminBadge}
//               onClick={() => setShowAdminMenu(!showAdminMenu)}
//             >
//               👤 Admin ▾
//             </div>

//             {showAdminMenu && (
//               <>
//                 <div style={styles.backdrop} onClick={() => setShowAdminMenu(false)} />
//                 <div style={styles.dropdownMenu}>
//                   <div style={styles.dropdownHeader}>
//                     <div style={styles.avatarCircle}>A</div>
//                     <div>
//                       <p style={styles.adminName}>Admin</p>
//                       <p style={styles.adminRole}>Administrator</p>
//                     </div>
//                   </div>
//                   <div style={styles.dropdownDivider} />
//                   <button style={styles.dropdownLogout} onClick={handleLogout}>
//                     <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                     Logout
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         {/* <div style={activePage === 'allEntries' ? styles.contentFull : styles.content}>
//           {activePage === 'newEntry' && (
//             <EntryForm onSuccess={() => {
//               setRefresh(prev => prev + 1)
//               setActivePage('allEntries')
//             }} />
//           )}
//           {activePage === 'allEntries' && (
//             <EntriesTable refresh={refresh} />
//           )}
//         </div> */}
// {/* Content */}
// <div style={activePage === 'allEntries' ? styles.contentFull : styles.content}>

//   {/* Wave Background - sirf newEntry pe dikhega */}
//   {activePage === 'newEntry' && (
//     <div style={styles.waveBg}>
//       <div style={styles.wave1} />
//       <div style={styles.wave2} />
//       <div style={styles.wave3} />
//     </div>
//   )}

//   {activePage === 'newEntry' && (
//     <EntryForm onSuccess={() => {
//       setRefresh(prev => prev + 1)
//       setActivePage('allEntries')
//     }} />
//   )}
//   {activePage === 'allEntries' && (
//     <EntriesTable refresh={refresh} />
//   )}
// </div>
//       </div>
//     </div>
//   )
// }

// const styles = {
//   wrapper: {
//     display: 'flex',
//     minHeight: '100vh',
//     width: '100vw',
//     overflow: 'hidden',
//     fontFamily: 'Segoe UI, sans-serif'
//   },
//   main: {
//     marginLeft: SIDEBAR_WIDTH,
//     width: `calc(100vw - ${SIDEBAR_WIDTH})`,
//     minHeight: '100vh',
//     background: '#f0f2f5',
//     display: 'flex',
//     flexDirection: 'column',
//     overflow: 'hidden'
//   },
//   topbar: {
//     background: '#fff',
//     padding: '16px 28px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//     position: 'sticky',
//     top: 0,
//     zIndex: 50
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: '18px',
//     color: '#1e1b4b',
//     fontWeight: '600'
//   },
//   adminBadge: {
//     background: '#ede9fe',
//     color: '#4f46e5',
//     padding: '8px 16px',
//     borderRadius: '20px',
//     fontSize: '13px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     userSelect: 'none'
//   },
//   backdrop: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     zIndex: 998
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: '48px',
//     right: '0',
//     background: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//     width: '200px',
//     zIndex: 999,
//     overflow: 'hidden'
//   },
//   dropdownHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     padding: '16px'
//   },
//   avatarCircle: {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     background: '#4f46e5',
//     color: '#fff',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: '700',
//     fontSize: '16px',
//     flexShrink: 0
//   },
//   adminName: {
//     margin: 0,
//     fontWeight: '600',
//     fontSize: '14px',
//     color: '#1e1b4b'
//   },
//   adminRole: {
//     margin: 0,
//     fontSize: '12px',
//     color: '#888'
//   },
//   dropdownDivider: {
//     height: '1px',
//     background: '#f0f0f0'
//   },
//   dropdownLogout: {
//     width: '100%',
//     padding: '14px 16px',
//     background: 'none',
//     border: 'none',
//     textAlign: 'left',
//     cursor: 'pointer',
//     color: '#ef4444',
//     fontSize: '14px',
//     fontWeight: '500'
//   },
 
 
//   content: {
//   padding: '28px',
//   flex: 1,
//   position: 'relative',   // ← add karo
//   overflow: 'hidden'      // ← add karo
// },
//  contentFull: {
//     padding: '0',
//     flex: 1
//   },

// waveBg: {
//   position: 'fixed',        // ← absolute ki jagah fixed
//   top: 0,
//   left: '240px',            // ← sidebar ke baad
//   width: 'calc(100vw - 240px)',
//   height: '100vh',
//   zIndex: 0,
//   pointerEvents: 'none',
//   overflow: 'hidden',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// },
// wave1: {
//   position: 'absolute',
//   width: '120%',
//   height: '3px',
//   background: 'linear-gradient(90deg, transparent, rgba(79,70,229,0.5), transparent)',
//   borderRadius: '50%',
//   top: '30%',
//   animation: 'waveFloat 4s ease-in-out infinite',
//   boxShadow: '0 0 20px rgba(79,70,229,0.3)'
// },
// wave2: {
//   position: 'absolute',
//   width: '110%',
//   height: '3px',
//   background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)',
//   borderRadius: '50%',
//   top: '45%',
//   animation: 'waveFloat2 5s ease-in-out infinite',
//   animationDelay: '0.5s',
//   boxShadow: '0 0 20px rgba(124,58,237,0.3)'
// },
// wave3: {
//   position: 'absolute',
//   width: '130%',
//   height: '3px',
//   background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)',
//   borderRadius: '50%',
//   top: '60%',
//   animation: 'waveFloat 6s ease-in-out infinite',
//   animationDelay: '1s',
//   boxShadow: '0 0 20px rgba(16,185,129,0.3)'
// },
// }

// export default Dashboard


// import { useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import EntryForm from '../components/EntryForm'
// import EntriesTable from '../components/EntriesTable'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'

// const SIDEBAR_WIDTH = '240px'

// function Dashboard() {
//   const navigate = useNavigate()
//   const [refresh, setRefresh] = useState(0)
//   const [activePage, setActivePage] = useState('newEntry')
//   const [showAdminMenu, setShowAdminMenu] = useState(false)

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     navigate('/login')
//   }

//   return (
//     <div style={styles.wrapper}>

//       <Sidebar activePage={activePage} setActivePage={setActivePage} />

//       <div style={styles.main}>

//         {/* SVG Wave Background — form ke peeche grey area mein */}
//         {activePage === 'newEntry' && (
//           <div style={styles.waveBg}>
//             <svg style={styles.waveSvg} viewBox="0 0 1440 120" preserveAspectRatio="none">
//               <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.07)" />
//             </svg>
//             <svg style={{ ...styles.waveSvg, animationDelay: '1s', top: '20%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//               <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(124,58,237,0.05)" />
//             </svg>
//             <svg style={{ ...styles.waveSvg, animationDelay: '2s', top: '38%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//               <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(16,185,129,0.05)" />
//             </svg>
//             <svg style={{ ...styles.waveSvg, animationDelay: '0.5s', top: '55%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//               <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.05)" />
//             </svg>
//             <svg style={{ ...styles.waveSvg, animationDelay: '1.5s', top: '72%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//               <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(124,58,237,0.06)" />
//             </svg>
//           </div>
//         )}

//         {/* Topbar */}
//         <div style={styles.topbar}>
//           <h3 style={styles.pageTitle}>
//             {activePage === 'newEntry' ? '📝 New Entry' : '📋 All Entries'}
//           </h3>

//           <div style={{ position: 'relative' }}>
//             <div style={styles.adminBadge} onClick={() => setShowAdminMenu(!showAdminMenu)}>
//               👤 Admin ▾
//             </div>

//             {showAdminMenu && (
//               <>
//                 <div style={styles.backdrop} onClick={() => setShowAdminMenu(false)} />
//                 <div style={styles.dropdownMenu}>
//                   <div style={styles.dropdownHeader}>
//                     <div style={styles.avatarCircle}>A</div>
//                     <div>
//                       <p style={styles.adminName}>Admin</p>
//                       <p style={styles.adminRole}>Administrator</p>
//                     </div>
//                   </div>
//                   <div style={styles.dropdownDivider} />
//                   <button style={styles.dropdownLogout} onClick={handleLogout}>
//                     <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                     Logout
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Content */}
//         <div style={activePage === 'allEntries' ? styles.contentFull : styles.content}>
//           {activePage === 'newEntry' && (
//             <EntryForm onSuccess={() => {
//               setRefresh(prev => prev + 1)
//               setActivePage('allEntries')
//             }} />
//           )}
//           {activePage === 'allEntries' && (
//             <EntriesTable refresh={refresh} />
//           )}
//         </div>

//       </div>
//     </div>
//   )
// }

// const styles = {
//   wrapper: {
//     display: 'flex',
//     minHeight: '100vh',
//     width: '100vw',
//     overflow: 'hidden',
//     fontFamily: 'Segoe UI, sans-serif'
//   },
//   main: {
//     marginLeft: SIDEBAR_WIDTH,
//     width: `calc(100vw - ${SIDEBAR_WIDTH})`,
//     minHeight: '100vh',
//     background: '#f0f2f5',
//     display: 'flex',
//     flexDirection: 'column',
//     overflow: 'hidden',
//     position: 'relative'     // ← wave ke liye zaroori
//   },
//   waveBg: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 0,
//     pointerEvents: 'none',
//     overflow: 'hidden'
//   },
//   waveSvg: {
//     position: 'absolute',
//     width: '200%',
//     height: '120px',
//     top: '5%',
//     left: 0,
//     animation: 'bgWave 10s linear infinite'
//   },
//   topbar: {
//     background: '#fff',
//     padding: '16px 28px',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//     position: 'sticky',
//     top: 0,
//     zIndex: 50
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: '18px',
//     color: '#1e1b4b',
//     fontWeight: '600'
//   },
//   adminBadge: {
//     background: '#ede9fe',
//     color: '#4f46e5',
//     padding: '8px 16px',
//     borderRadius: '20px',
//     fontSize: '13px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     userSelect: 'none'
//   },
//   backdrop: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     zIndex: 998
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: '48px',
//     right: '0',
//     background: '#fff',
//     borderRadius: '12px',
//     boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//     width: '200px',
//     zIndex: 999,
//     overflow: 'hidden'
//   },
//   dropdownHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     padding: '16px'
//   },
//   avatarCircle: {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     background: '#4f46e5',
//     color: '#fff',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontWeight: '700',
//     fontSize: '16px',
//     flexShrink: 0
//   },
//   adminName: {
//     margin: 0,
//     fontWeight: '600',
//     fontSize: '14px',
//     color: '#1e1b4b'
//   },
//   adminRole: {
//     margin: 0,
//     fontSize: '12px',
//     color: '#888'
//   },
//   dropdownDivider: {
//     height: '1px',
//     background: '#f0f0f0'
//   },
//   dropdownLogout: {
//     width: '100%',
//     padding: '14px 16px',
//     background: 'none',
//     border: 'none',
//     textAlign: 'left',
//     cursor: 'pointer',
//     color: '#ef4444',
//     fontSize: '14px',
//     fontWeight: '500'
//   },
//   content: {
//     padding: '28px',
//     flex: 1,
//     position: 'relative',
//     zIndex: 1               // ← wave ke upar form dikhega
//   },
//   contentFull: {
//     padding: '0',
//     flex: 1,
//     position: 'relative',
//     zIndex: 1
//   }
// }

// export default Dashboard


// import { useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import EntryForm from '../components/EntryForm'
// import EntriesTable from '../components/EntriesTable'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'

// const SIDEBAR_WIDTH = '240px'

// function Dashboard() {
//     const navigate = useNavigate()
//     const [refresh, setRefresh] = useState(0)
//     const [activePage, setActivePage] = useState('newEntry')
//     const [showAdminMenu, setShowAdminMenu] = useState(false)
//     const [editData, setEditData] = useState(null)

//     const handleLogout = () => {
//         localStorage.removeItem('token')
//         navigate('/login')
//     }

//     const handleEdit = (rowData) => {
//         setEditData(rowData)
//         setActivePage('newEntry')   // form page pe le jao
//     }

//     const handleCancelEdit = () => {
//         setEditData(null)
//     }

//     return (
//         <div style={styles.wrapper}>
//             <Sidebar activePage={activePage} setActivePage={setActivePage} />

//             <div style={styles.main}>

//                 {/* SVG Wave Background */}
//                 {activePage === 'newEntry' && (
//                     <div style={styles.waveBg}>
//                         <svg style={styles.waveSvg} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.07)" />
//                         </svg>
//                         <svg style={{ ...styles.waveSvg, animationDelay: '1s', top: '20%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(124,58,237,0.05)" />
//                         </svg>
//                         <svg style={{ ...styles.waveSvg, animationDelay: '2s', top: '40%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(16,185,129,0.05)" />
//                         </svg>
//                         <svg style={{ ...styles.waveSvg, animationDelay: '0.5s', top: '60%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.04)" />
//                         </svg>
//                     </div>
//                 )}

//                 {/* Topbar */}
//                 <div style={styles.topbar}>
//                     <h3 style={styles.pageTitle}>
//                         {activePage === 'newEntry'
//                             ? editData ? '✏️ Edit Entry' : '📝 New Entry'
//                             : '📋 All Entries'}
//                     </h3>

//                     <div style={{ position: 'relative' }}>
//                         <div style={styles.adminBadge} onClick={() => setShowAdminMenu(!showAdminMenu)}>
//                             👤 Admin ▾
//                         </div>

//                         {showAdminMenu && (
//                             <>
//                                 <div style={styles.backdrop} onClick={() => setShowAdminMenu(false)} />
//                                 <div style={styles.dropdownMenu}>
//                                     <div style={styles.dropdownHeader}>
//                                         <div style={styles.avatarCircle}>A</div>
//                                         <div>
//                                             <p style={styles.adminName}>Admin</p>
//                                             <p style={styles.adminRole}>Administrator</p>
//                                         </div>
//                                     </div>
//                                     <div style={styles.dropdownDivider} />
//                                     <button style={styles.dropdownLogout} onClick={handleLogout}>
//                                         <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                                         Logout
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div style={activePage === 'allEntries' ? styles.contentFull : styles.content}>
//                     {activePage === 'newEntry' && (
//                         <EntryForm
//                             onSuccess={() => {
//                                 setRefresh(prev => prev + 1)
//                                 setEditData(null)
//                                 setActivePage('allEntries')
//                             }}
//                             editData={editData}
//                             onCancelEdit={handleCancelEdit}
//                         />
//                     )}
//                     {activePage === 'allEntries' && (
//                         <EntriesTable refresh={refresh} onEdit={handleEdit} />
//                     )}
//                 </div>

//             </div>
//         </div>
//     )
// }

// const styles = {
//     wrapper: {
//         display: 'flex',
//         minHeight: '100vh',
//         width: '100vw',
//         overflow: 'hidden',
//         fontFamily: 'Segoe UI, sans-serif'
//     },
//     main: {
//         marginLeft: SIDEBAR_WIDTH,
//         width: `calc(100vw - ${SIDEBAR_WIDTH})`,
//         minHeight: '100vh',
//         background: '#f0f2f5',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//         position: 'relative'
//     },
//     waveBg: {
//         position: 'absolute',
//         top: 0, left: 0,
//         width: '100%', height: '100%',
//         zIndex: 0,
//         pointerEvents: 'none',
//         overflow: 'hidden'
//     },
//     waveSvg: {
//         position: 'absolute',
//         width: '200%',
//         height: '120px',
//         top: '5%',
//         left: 0,
//         animation: 'bgWave 10s linear infinite'
//     },
//     topbar: {
//         background: '#fff',
//         padding: '16px 28px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//         position: 'sticky',
//         top: 0,
//         zIndex: 50
//     },
//     pageTitle: {
//         margin: 0,
//         fontSize: '18px',
//         color: '#1e1b4b',
//         fontWeight: '600'
//     },
//     adminBadge: {
//         background: '#ede9fe',
//         color: '#4f46e5',
//         padding: '8px 16px',
//         borderRadius: '20px',
//         fontSize: '13px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         userSelect: 'none'
//     },
//     backdrop: {
//         position: 'fixed',
//         top: 0, left: 0,
//         width: '100vw', height: '100vh',
//         zIndex: 998
//     },
//     dropdownMenu: {
//         position: 'absolute',
//         top: '48px', right: '0',
//         background: '#fff',
//         borderRadius: '12px',
//         boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//         width: '200px',
//         zIndex: 999,
//         overflow: 'hidden'
//     },
//     dropdownHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px',
//         padding: '16px'
//     },
//     avatarCircle: {
//         width: '40px', height: '40px',
//         borderRadius: '50%',
//         background: '#4f46e5',
//         color: '#fff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontWeight: '700',
//         fontSize: '16px',
//         flexShrink: 0
//     },
//     adminName: {
//         margin: 0,
//         fontWeight: '600',
//         fontSize: '14px',
//         color: '#1e1b4b'
//     },
//     adminRole: {
//         margin: 0,
//         fontSize: '12px',
//         color: '#888'
//     },
//     dropdownDivider: {
//         height: '1px',
//         background: '#f0f0f0'
//     },
//     dropdownLogout: {
//         width: '100%',
//         padding: '14px 16px',
//         background: 'none',
//         border: 'none',
//         textAlign: 'left',
//         cursor: 'pointer',
//         color: '#ef4444',
//         fontSize: '14px',
//         fontWeight: '500'
//     },
//     content: {
//         padding: '28px',
//         flex: 1,
//         position: 'relative',
//         zIndex: 1
//     },
//     contentFull: {
//         padding: '0',
//         flex: 1,
//         position: 'relative',
//         zIndex: 1
//     }
// }

// export default Dashboard

// import { useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import EntryForm from '../components/EntryForm'
// import EntriesTable from '../components/EntriesTable'
// import Chatbot from '../components/Chatbot'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'

// const SIDEBAR_WIDTH = '240px'

// function Dashboard() {
//     const navigate = useNavigate()
//     const [refresh, setRefresh] = useState(0)
//     const [activePage, setActivePage] = useState('newEntry')
//     const [showAdminMenu, setShowAdminMenu] = useState(false)
//     const [editData, setEditData] = useState(null)

//     const handleLogout = () => {
//         localStorage.removeItem('token')
//         navigate('/login')
//     }

//     const handleEdit = (rowData) => {
//         setEditData(rowData)
//         setActivePage('newEntry')
//     }

//     const handleCancelEdit = () => {
//         setEditData(null)
//     }

//     const getPageTitle = () => {
//         if (activePage === 'newEntry') return editData ? '✏️ Edit Entry' : '📝 New Entry'
//         if (activePage === 'allEntries') return '📋 All Entries'
//         if (activePage === 'chatbot') return '🤖 AI Assistant'
//         return ''
//     }

//     return (
//         <div style={styles.wrapper}>
//             <Sidebar activePage={activePage} setActivePage={setActivePage} />

//             <div style={styles.main}>

//                 {/* SVG Wave Background */}
//                 {activePage === 'newEntry' && (
//                     <div style={styles.waveBg}>
//                         <svg style={styles.waveSvg} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.07)" />
//                         </svg>
//                         <svg style={{ ...styles.waveSvg, animationDelay: '1s', top: '20%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(124,58,237,0.05)" />
//                         </svg>
//                         <svg style={{ ...styles.waveSvg, animationDelay: '2s', top: '40%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(16,185,129,0.05)" />
//                         </svg>
//                         <svg style={{ ...styles.waveSvg, animationDelay: '0.5s', top: '60%' }} viewBox="0 0 1440 120" preserveAspectRatio="none">
//                             <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(79,70,229,0.04)" />
//                         </svg>
//                     </div>
//                 )}

//                 {/* Topbar */}
//                 <div style={styles.topbar}>
//                     <h3 style={styles.pageTitle}>{getPageTitle()}</h3>

//                     <div style={{ position: 'relative' }}>
//                         <div style={styles.adminBadge} onClick={() => setShowAdminMenu(!showAdminMenu)}>
//                             👤 Admin ▾
//                         </div>

//                         {showAdminMenu && (
//                             <>
//                                 <div style={styles.backdrop} onClick={() => setShowAdminMenu(false)} />
//                                 <div style={styles.dropdownMenu}>
//                                     <div style={styles.dropdownHeader}>
//                                         <div style={styles.avatarCircle}>A</div>
//                                         <div>
//                                             <p style={styles.adminName}>Admin</p>
//                                             <p style={styles.adminRole}>Administrator</p>
//                                         </div>
//                                     </div>
//                                     <div style={styles.dropdownDivider} />
//                                     <button style={styles.dropdownLogout} onClick={handleLogout}>
//                                         <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                                         Logout
//                                     </button>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div style={activePage === 'allEntries' ? styles.contentFull : styles.content}>
//                     {activePage === 'newEntry' && (
//                         <EntryForm
//                             onSuccess={() => {
//                                 setRefresh(prev => prev + 1)
//                                 setEditData(null)
//                                 setActivePage('allEntries')
//                             }}
//                             editData={editData}
//                             onCancelEdit={handleCancelEdit}
//                         />
//                     )}
//                     {activePage === 'allEntries' && (
//                         <EntriesTable refresh={refresh} onEdit={handleEdit} />
//                     )}
//                     {activePage === 'chatbot' && <Chatbot />}
//                 </div>

//             </div>
//         </div>
//     )
// }

// const styles = {
//     wrapper: {
//         display: 'flex',
//         minHeight: '100vh',
//         width: '100vw',
//         overflow: 'hidden',
//         fontFamily: 'Segoe UI, sans-serif'
//     },
//     main: {
//         marginLeft: SIDEBAR_WIDTH,
//         width: `calc(100vw - ${SIDEBAR_WIDTH})`,
//         minHeight: '100vh',
//         background: '#f0f2f5',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//         position: 'relative'
//     },
//     waveBg: {
//         position: 'absolute',
//         top: 0, left: 0,
//         width: '100%', height: '100%',
//         zIndex: 0,
//         pointerEvents: 'none',
//         overflow: 'hidden'
//     },
//     waveSvg: {
//         position: 'absolute',
//         width: '200%',
//         height: '120px',
//         top: '5%',
//         left: 0,
//         animation: 'bgWave 10s linear infinite'
//     },
//     topbar: {
//         background: '#fff',
//         padding: '16px 28px',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
//         position: 'sticky',
//         top: 0,
//         zIndex: 50
//     },
//     pageTitle: {
//         margin: 0,
//         fontSize: '18px',
//         color: '#1e1b4b',
//         fontWeight: '600'
//     },
//     adminBadge: {
//         background: '#ede9fe',
//         color: '#4f46e5',
//         padding: '8px 16px',
//         borderRadius: '20px',
//         fontSize: '13px',
//         fontWeight: '600',
//         cursor: 'pointer',
//         userSelect: 'none'
//     },
//     backdrop: {
//         position: 'fixed',
//         top: 0, left: 0,
//         width: '100vw', height: '100vh',
//         zIndex: 998
//     },
//     dropdownMenu: {
//         position: 'absolute',
//         top: '48px', right: '0',
//         background: '#fff',
//         borderRadius: '12px',
//         boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
//         width: '200px',
//         zIndex: 999,
//         overflow: 'hidden'
//     },
//     dropdownHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px',
//         padding: '16px'
//     },
//     avatarCircle: {
//         width: '40px', height: '40px',
//         borderRadius: '50%',
//         background: '#4f46e5',
//         color: '#fff',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontWeight: '700',
//         fontSize: '16px',
//         flexShrink: 0
//     },
//     adminName: {
//         margin: 0,
//         fontWeight: '600',
//         fontSize: '14px',
//         color: '#1e1b4b'
//     },
//     adminRole: {
//         margin: 0,
//         fontSize: '12px',
//         color: '#888'
//     },
//     dropdownDivider: {
//         height: '1px',
//         background: '#f0f0f0'
//     },
//     dropdownLogout: {
//         width: '100%',
//         padding: '14px 16px',
//         background: 'none',
//         border: 'none',
//         textAlign: 'left',
//         cursor: 'pointer',
//         color: '#ef4444',
//         fontSize: '14px',
//         fontWeight: '500'
//     },
//     content: {
//         padding: '28px',
//         flex: 1,
//         position: 'relative',
//         zIndex: 1
//     },
//     contentFull: {
//         padding: '0',
//         flex: 1,
//         position: 'relative',
//         zIndex: 1
//     }
// }

// export default Dashboard;

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import EntryForm from '../components/EntryForm'
import EntriesTable from '../components/EntriesTable'
import Chatbot from '../components/Chatbot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


function Dashboard() {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(0)
    const [activePage, setActivePage] = useState('newEntry')
    const [showAdminMenu, setShowAdminMenu] = useState(false)
    const [editData, setEditData] = useState(null)

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const handleEdit = (rowData) => {
        setEditData(rowData)
        setActivePage('newEntry')
    }

    const handleCancelEdit = () => setEditData(null)

    const getPageTitle = () => {
        if (activePage === 'newEntry')   return editData ? '✏️ Edit Entry' : '📝 New Entry'
        if (activePage === 'allEntries') return '📋 All Entries'
        if (activePage === 'chatbot')    return '🤖 AI Assistant'
        return ''
    }

    return (
        <div className="dashboard-wrapper">
            <Sidebar activePage={activePage} setActivePage={setActivePage} />

            <div className="dashboard-main">

                {/* Wave bg — only on newEntry */}
                {activePage === 'newEntry' && (
                    <div className="dashboard-wave-bg">
                        <svg className="dashboard-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ top: '5%' }}>
                            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(99,102,241,0.06)" />
                        </svg>
                        <svg className="dashboard-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ top: '25%', animationDelay: '1s' }}>
                            <path d="M0,60 C360,0 720,120 1080,60 C1260,30 1350,90 1440,60 L1440,120 L0,120 Z" fill="rgba(139,92,246,0.04)" />
                        </svg>
                        <svg className="dashboard-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ top: '50%', animationDelay: '2s' }}>
                            <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1350,30 1440,60 L1440,120 L0,120 Z" fill="rgba(16,185,129,0.04)" />
                        </svg>
                    </div>
                )}

                {/* Topbar */}
                <div className="dashboard-topbar">
                    <h3 className="dashboard-page-title">{getPageTitle()}</h3>

                    <div style={{ position: 'relative' }}>
                        <div className="dashboard-admin-badge" onClick={() => setShowAdminMenu(!showAdminMenu)}>
                            👤 Admin ▾
                        </div>

                        {showAdminMenu && (
                            <>
                                <div className="dashboard-backdrop" onClick={() => setShowAdminMenu(false)} />
                                <div className="dashboard-dropdown">
                                    <div className="dashboard-dropdown-header">
                                        <div className="dashboard-avatar-circle">A</div>
                                        <div>
                                            <p className="dashboard-admin-name">Admin</p>
                                            <p className="dashboard-admin-role">Administrator</p>
                                        </div>
                                    </div>
                                    <div className="dashboard-dropdown-divider" />
                                    <button className="dashboard-dropdown-logout" onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Content */}
                {activePage === 'newEntry' && (
                    <div className="dashboard-content">
                        <EntryForm
                            onSuccess={() => {
                                setRefresh(prev => prev + 1)
                                setEditData(null)
                                setActivePage('allEntries')
                            }}
                            editData={editData}
                            onCancelEdit={handleCancelEdit}
                        />
                    </div>
                )}

                {activePage === 'allEntries' && (
                    <div className="dashboard-content-full">
                        <EntriesTable refresh={refresh} onEdit={handleEdit} />
                    </div>
                )}

                {activePage === 'chatbot' && (
                    <div className="dashboard-content-full">
                        <div className="dashboard-section-header">
                            <span className="dashboard-section-icon">🤖</span>
                            <div>
                                <h2 className="dashboard-section-title">AI Assistant</h2>
                                <p className="dashboard-section-sub">Ask anything about your entries</p>
                            </div>
                        </div>
                        <div className="dashboard-card">
                            <Chatbot />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Dashboard