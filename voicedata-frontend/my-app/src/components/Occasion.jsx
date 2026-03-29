import { useEffect, useRef, useState } from 'react'
import API from '../utils/api'
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.css'

function Occasion({ refresh }) {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(false)
    const [holiday, setHoliday]=useState(null)
    const tableRef = useRef(null)
    const dtRef = useRef(null)

    const fetchEntries = async () => {
        setLoading(true)
        try {
            const res = await API.get('/entries/all')
            if (res.data.success) setEntries(res.data.data)
        } catch (err) {
            console.error('Error:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEntries()
    }, [refresh])

    useEffect(() => {
        if (entries.length === 0) return

   
        if (dtRef.current) {
            dtRef.current.destroy()
            dtRef.current = null
        }

      
        dtRef.current = $(tableRef.current).DataTable({
            pageLength: 10,
            ordering: true,
            searching: true,
            responsive: true,
            language: {
                search: 'Search:',
                lengthMenu: 'Show _MENU_ entries',
                info: 'Showing _START_ to _END_ of _TOTAL_ entries',
                emptyTable: 'No entries found!',
            }
        })

        return () => {
            if (dtRef.current) {
                dtRef.current.destroy()
                dtRef.current = null
            }
        }
    }, [entries])

    if (loading) return <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>

    return (
        <div style={styles.wrapper}>
            <div style={styles.header}>
                <div>
                    <h3 style={styles.title}>All Entries</h3>
                    <p style={styles.subtitle}>{entries.length} total records</p>
                </div>
            </div>

            <div style={styles.tableWrapper}>
                <table ref={tableRef} style={styles.table} className="display" width="100%">
                    <thead>
                        <tr style={styles.theadRow}>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Name</th>
                            <th style={styles.th}>City</th>
                            <th style={styles.th}>Date In</th>
                            <th style={styles.th}>Date Out</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Gender</th>
                            <th style={styles.th}>Entry/Exit</th>
                            <th style={styles.th}>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{entry.Name}</td>
                                <td>{entry.City}</td>
                                <td>{entry['Date In']}</td>
                                <td>{entry['Date Out']}</td>
                                <td>{entry.Location}</td>
                                
                                 <td>{entry.gender}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        color: '#fff',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        background: entry['Entry/Exit'] === 'Entry' ? '#10b981' : '#ef4444'
                                    }}>
                                        {entry['Entry/Exit']}
                                    </span>
                                </td>
                                <td>{entry.Timestamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        background: '#fff',
        padding: '28px',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    title: {
        margin: 0,
        color: '#1e1b4b',
        fontSize: '20px',
        fontWeight: '700'
    },
    subtitle: {
        margin: '4px 0 0',
        color: '#888',
        fontSize: '13px'
    },
    tableWrapper: {
        overflowX: 'auto',
        width: '100%'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
    },
    theadRow: {
        background: '#4f46e5',
        color: '#fff'
    },
    th: {
        padding: '14px 16px',
        textAlign: 'left',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        color: '#fff'
    }
}

export default EntriesTable