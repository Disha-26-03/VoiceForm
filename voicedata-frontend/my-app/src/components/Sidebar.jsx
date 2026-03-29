// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket, faBolt, faFileCirclePlus, faList } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'

// function Sidebar({ activePage, setActivePage }) {
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         localStorage.removeItem('token')
//         navigate('/login')
//     }

//     const menuItems = [
//          { key: 'allEntries', label: 'All Entries', icon: faList },
//         { key: 'newEntry', label: 'New Entry', icon: faFileCirclePlus },
       
//     ]

//     return (
//         <div style={styles.sidebar}>
//             <div>
//                 {/* Logo */}
//                 <div style={styles.logoWrapper}>
//                     <FontAwesomeIcon icon={faBolt} style={styles.logoIcon} />
//                     <h2 style={styles.logo}>Admin Panel</h2>
//                 </div>

//                 <div style={styles.divider} />

//                 <p style={styles.menuLabel}>MENU</p>

//                 {/* Nav Items */}
//                 {menuItems.map(item => (
//                     <div
//                         key={item.key}
//                         style={{
//                             ...styles.navItem,
//                             background: activePage === item.key ? 'rgba(255,255,255,0.15)' : 'transparent',
//                             borderLeft: activePage === item.key ? '4px solid #818cf8' : '4px solid transparent',
//                         }}
//                         onClick={() => setActivePage(item.key)}
//                     >
//                         <FontAwesomeIcon icon={item.icon} style={styles.navIcon} />
//                         <span>{item.label}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Logout */}
//             <button style={styles.logoutBtn} onClick={handleLogout}>
//                 <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                 Logout
//             </button>
//         </div>
//     )
// }

// const styles = {
//     sidebar: {
//         width: '240px',
//         minWidth: '240px',
//         background: 'linear-gradient(180deg, #1e1b4b 0%, #2d2a6e 100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         padding: '24px 0',
//         height: '100vh',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: 100,
//         boxShadow: '4px 0 12px rgba(0,0,0,0.2)'
//     },
//     logoWrapper: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px',
//         padding: '0 20px',
//         marginBottom: '8px'
//     },
//     logoIcon: {
//         fontSize: '22px',
//         color: '#f59e0b'
//     },
//     logo: {
//         color: '#fff',
//         fontSize: '18px',
//         margin: 0,
//         fontWeight: '700',
//         letterSpacing: '0.5px'
//     },
//     divider: {
//         height: '1px',
//         background: 'rgba(255,255,255,0.1)',
//         margin: '16px 20px'
//     },
//     menuLabel: {
//         color: 'rgba(255,255,255,0.4)',
//         fontSize: '11px',
//         fontWeight: '600',
//         letterSpacing: '1.5px',
//         padding: '0 24px',
//         marginBottom: '8px'
//     },
//     navItem: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '12px',
//         padding: '13px 24px',
//         cursor: 'pointer',
//         color: 'rgba(255,255,255,0.85)',
//         fontSize: '14px',
//         fontWeight: '500',
//         marginBottom: '4px'
//     },
//     navIcon: {
//         fontSize: '16px',
//         width: '18px'
//     },
//     logoutBtn: {
//         margin: '0 20px',
//         padding: '11px',
//         background: 'rgba(239,68,68,0.85)',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontSize: '14px',
//         fontWeight: '500',
//         width: 'calc(100% - 40px)'
//     }
// }

// export default Sidebar

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket, faBolt, faFileCirclePlus, faList } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'
// import GestureNav from './GestureNav'

// function Sidebar({ activePage, setActivePage }) {
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         localStorage.removeItem('token')
//         navigate('/login')
//     }

//     const menuItems = [
//         { key: 'allEntries', label: 'All Entries', icon: faList },
//         { key: 'newEntry', label: 'New Entry', icon: faFileCirclePlus },
//     ]

//     return (
//         <div style={styles.sidebar}>
//             <div>
//                 {/* Logo */}
//                 <div style={styles.logoWrapper}>
//                     <FontAwesomeIcon icon={faBolt} style={styles.logoIcon} />
//                     <h2 style={styles.logo}>Admin Panel</h2>
//                 </div>

//                 <div style={styles.divider} />

//                 <p style={styles.menuLabel}>MENU</p>

//                 {/* Nav Items */}
//                 {menuItems.map(item => (
//                     <div
//                         key={item.key}
//                         style={{
//                             ...styles.navItem,
//                             background: activePage === item.key ? 'rgba(255,255,255,0.15)' : 'transparent',
//                             borderLeft: activePage === item.key ? '4px solid #818cf8' : '4px solid transparent',
//                         }}
//                         onClick={() => setActivePage(item.key)}
//                     >
//                         <FontAwesomeIcon icon={item.icon} style={styles.navIcon} />
//                         <span>{item.label}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Gesture Nav — sidebar ke andar bottom mein */}
//             <div style={styles.gestureWrapper}>
//                 <GestureNav
//                     activePage={activePage}
//                     onNavigate={(page) => {
//                         // GestureNav 'all-entries' / 'new-entry' bhejta hai
//                         // Sidebar keys: 'allEntries' / 'newEntry'
//                         const keyMap = {
//                             'all-entries': 'allEntries',
//                             'new-entry': 'newEntry'
//                         }
//                         if (keyMap[page]) setActivePage(keyMap[page])
//                     }}
//                 />
//             </div>

//             {/* Logout */}
//             <button style={styles.logoutBtn} onClick={handleLogout}>
//                 <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                 Logout
//             </button>
//         </div>
//     )
// }

// const styles = {
//     sidebar: {
//         width: '240px',
//         minWidth: '240px',
//         background: 'linear-gradient(180deg, #1e1b4b 0%, #2d2a6e 100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         padding: '24px 0',
//         height: '100vh',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: 100,
//         boxShadow: '4px 0 12px rgba(0,0,0,0.2)'
//     },
//     logoWrapper: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px',
//         padding: '0 20px',
//         marginBottom: '8px'
//     },
//     logoIcon: { fontSize: '22px', color: '#f59e0b' },
//     logo: { color: '#fff', fontSize: '18px', margin: 0, fontWeight: '700', letterSpacing: '0.5px' },
//     divider: { height: '1px', background: 'rgba(255,255,255,0.1)', margin: '16px 20px' },
//     menuLabel: {
//         color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600',
//         letterSpacing: '1.5px', padding: '0 24px', marginBottom: '8px'
//     },
//     navItem: {
//         display: 'flex', alignItems: 'center', gap: '12px',
//         padding: '13px 24px', cursor: 'pointer',
//         color: 'rgba(255,255,255,0.85)', fontSize: '14px',
//         fontWeight: '500', marginBottom: '4px'
//     },
//     navIcon: { fontSize: '16px', width: '18px' },
//     gestureWrapper: {
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//         paddingBottom: '8px'
//     },
//     logoutBtn: {
//         margin: '0 20px',
//         padding: '11px',
//         background: 'rgba(239,68,68,0.85)',
//         color: '#fff', border: 'none', borderRadius: '8px',
//         cursor: 'pointer', fontSize: '14px', fontWeight: '500',
//         width: 'calc(100% - 40px)'
//     }
// }

// export default Sidebar

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faRightFromBracket, faBolt, faFileCirclePlus, faList, faRobot } from '@fortawesome/free-solid-svg-icons'
// import { useNavigate } from 'react-router-dom'
// import GestureNav from './GestureNav'

// function Sidebar({ activePage, setActivePage }) {
//     const navigate = useNavigate()

//     const handleLogout = () => {
//         localStorage.removeItem('token')
//         navigate('/login')
//     }

//     const menuItems = [
//         { key: 'allEntries', label: 'All Entries', icon: faList },
//         { key: 'newEntry', label: 'New Entry', icon: faFileCirclePlus },
//         { key: 'chatbot', label: 'AI Assistant', icon: faRobot },  // ← yeh add kiya
//     ]

//     return (
//         <div style={styles.sidebar}>
//             <div>
//                 <div style={styles.logoWrapper}>
//                     <FontAwesomeIcon icon={faBolt} style={styles.logoIcon} />
//                     <h2 style={styles.logo}>Admin Panel</h2>
//                 </div>

//                 <div style={styles.divider} />

//                 <p style={styles.menuLabel}>MENU</p>

//                 {menuItems.map(item => (
//                     <div
//                         key={item.key}
//                         style={{
//                             ...styles.navItem,
//                             background: activePage === item.key ? 'rgba(255,255,255,0.15)' : 'transparent',
//                             borderLeft: activePage === item.key ? '4px solid #818cf8' : '4px solid transparent',
//                         }}
//                         onClick={() => setActivePage(item.key)}
//                     >
//                         <FontAwesomeIcon icon={item.icon} style={styles.navIcon} />
//                         <span>{item.label}</span>
//                     </div>
//                 ))}
//             </div>

//             <div style={styles.gestureWrapper}>
//                 <GestureNav
//                     activePage={activePage}
//                     onNavigate={(page) => {
//                         const keyMap = {
//                             'all-entries': 'allEntries',
//                             'new-entry': 'newEntry'
//                         }
//                         if (keyMap[page]) setActivePage(keyMap[page])
//                     }}
//                 />
//             </div>

//             <button style={styles.logoutBtn} onClick={handleLogout}>
//                 <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
//                 Logout
//             </button>
//         </div>
//     )
// }

// const styles = {
//     sidebar: {
//         width: '240px',
//         minWidth: '240px',
//         background: 'linear-gradient(180deg, #1e1b4b 0%, #2d2a6e 100%)',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//         padding: '24px 0',
//         height: '100vh',
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         zIndex: 100,
//         boxShadow: '4px 0 12px rgba(0,0,0,0.2)'
//     },
//     logoWrapper: {
//         display: 'flex',
//         alignItems: 'center',
//         gap: '10px',
//         padding: '0 20px',
//         marginBottom: '8px'
//     },
//     logoIcon: { fontSize: '22px', color: '#f59e0b' },
//     logo: { color: '#fff', fontSize: '18px', margin: 0, fontWeight: '700', letterSpacing: '0.5px' },
//     divider: { height: '1px', background: 'rgba(255,255,255,0.1)', margin: '16px 20px' },
//     menuLabel: {
//         color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: '600',
//         letterSpacing: '1.5px', padding: '0 24px', marginBottom: '8px'
//     },
//     navItem: {
//         display: 'flex', alignItems: 'center', gap: '12px',
//         padding: '13px 24px', cursor: 'pointer',
//         color: 'rgba(255,255,255,0.85)', fontSize: '14px',
//         fontWeight: '500', marginBottom: '4px'
//     },
//     navIcon: { fontSize: '16px', width: '18px' },
//     gestureWrapper: {
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//         paddingBottom: '8px'
//     },
//     logoutBtn: {
//         margin: '0 20px',
//         padding: '11px',
//         background: 'rgba(239,68,68,0.85)',
//         color: '#fff', border: 'none', borderRadius: '8px',
//         cursor: 'pointer', fontSize: '14px', fontWeight: '500',
//         width: 'calc(100% - 40px)'
//     }
// }

// export default Sidebar

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faBolt, faFileCirclePlus, faList, faRobot } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import GestureNav from './GestureNav'

function Sidebar({ activePage, setActivePage }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const menuItems = [
        { key: 'allEntries', label: 'All Entries', icon: faList },
        { key: 'newEntry', label: 'New Entry', icon: faFileCirclePlus },
        { key: 'chatbot', label: 'AI Assistant', icon: faRobot },
    ]

    return (
        <div style={styles.sidebar}>
            <div>
                {/* Logo */}
                <div style={styles.logoWrapper}>
                    <div style={styles.logoIconBox}>
                        <FontAwesomeIcon icon={faBolt} style={{ fontSize: '16px', color: '#fff' }} />
                    </div>
                    <div>
                        <h2 style={styles.logo}>Admin Panel</h2>
                        <p style={styles.logoSub}>Management System</p>
                    </div>
                </div>

                <div style={styles.divider} />
              

                {menuItems.map(item => (
                    <div
                        key={item.key}
                        style={{
                            ...styles.navItem,
                            background: activePage === item.key
                                ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                                : 'transparent',
                            color: activePage === item.key ? '#fff' : '#64748b',
                            boxShadow: activePage === item.key
                                ? '0 4px 12px rgba(99,102,241,0.3)'
                                : 'none',
                            transform: activePage === item.key ? 'translateX(4px)' : 'none',
                        }}
                        onClick={() => setActivePage(item.key)}
                    >
                        <div style={{
                            ...styles.navIconBox,
                            background: activePage === item.key
                                ? 'rgba(255,255,255,0.2)'
                                : '#e0f2fe',
                        }}>
                            <FontAwesomeIcon icon={item.icon} style={{
                                fontSize: '14px',
                                color: activePage === item.key ? '#fff' : '#6366f1'
                            }} />
                        </div>
                        <span style={{ fontWeight: activePage === item.key ? '600' : '500' }}>
                            {item.label}
                        </span>
                        {activePage === item.key && (
                            <div style={styles.activeDot} />
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.gestureWrapper}>
                <GestureNav
                    activePage={activePage}
                    onNavigate={(page) => {
                        const keyMap = {
                            'all-entries': 'allEntries',
                            'new-entry': 'newEntry'
                        }
                        if (keyMap[page]) setActivePage(keyMap[page])
                    }}
                />
            </div>

            {/* Logout */}
            <div style={{ padding: '0 16px' }}>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '13px' }} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

const styles = {
    sidebar: {
        width: '240px',
        minWidth: '240px',
        background: '#f0f9ff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 0 20px',
        height: '100vh',
        position: 'fixed',
        top: 0, left: 0,
        zIndex: 100,
        boxShadow: '1px 0 0 #bae6fd, 4px 0 20px rgba(14,165,233,0.06)',
        borderRight: '1px solid #bae6fd',
    },
    logoWrapper: {
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '0 20px', marginBottom: '4px'
    },
    logoIconBox: {
        width: '38px', height: '38px', borderRadius: '10px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(99,102,241,0.35)',
        flexShrink: 0,
    },
    logo: {
        color: '#0f172a', fontSize: '15px', margin: 0,
        fontWeight: '700', letterSpacing: '-0.3px', lineHeight: 1.2
    },
    logoSub: {
        color: '#94a3b8', fontSize: '10px', margin: 0,
        fontWeight: '500', letterSpacing: '0.5px', marginTop: '1px'
    },
    divider: {
        height: '1px', background: '#bae6fd',
        margin: '16px 20px'
    },
    menuLabel: {
        color: '#7dd3fc', fontSize: '10px', fontWeight: '700',
        letterSpacing: '1.5px', padding: '0 20px', marginBottom: '6px'
    },
    navItem: {
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '10px 16px', cursor: 'pointer',
        fontSize: '13.5px', margin: '2px 12px',
        borderRadius: '10px', transition: 'all 0.2s ease',
        position: 'relative',
    },
    navIconBox: {
        width: '30px', height: '30px', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.2s ease',
    },
    activeDot: {
        width: '6px', height: '6px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.7)',
        marginLeft: 'auto',
    },
    gestureWrapper: {
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', paddingBottom: '8px'
    },
    logoutBtn: {
        width: '100%', padding: '10px 16px',
        background: '#fef2f2', color: '#ef4444',
        border: '1px solid #fecaca', borderRadius: '10px',
        cursor: 'pointer', fontSize: '13px', fontWeight: '600',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', transition: 'all 0.2s ease',
    }
}

export default Sidebar