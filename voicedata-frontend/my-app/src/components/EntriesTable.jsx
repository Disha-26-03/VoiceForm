import { useEffect, useRef, useState } from 'react'
import API from '../utils/api'
import $ from 'jquery'
import 'datatables.net-dt'
import 'datatables.net-dt/css/dataTables.dataTables.css'


function EntriesTable({ refresh, onEdit }) {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(false)
    const [deletingIndex, setDeletingIndex] = useState(null)
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

    useEffect(() => { fetchEntries() }, [refresh])

    useEffect(() => {
        if (entries.length === 0) return
        if (dtRef.current) { dtRef.current.destroy(); dtRef.current = null }

        dtRef.current = $(tableRef.current).DataTable({
            pageLength: 10,
            ordering: true,
            searching: true,
            responsive: true,
            language: {
                search: 'Search:',
                lengthMenu: 'Show _MENU_ entries',
                info: 'Showing _START_ to _END_ of _TOTAL_ entries',
                emptyTable: 'No entries found!'
            }
        })

        return () => {
            if (dtRef.current) { dtRef.current.destroy(); dtRef.current = null }
        }
    }, [entries])

    const handleDelete = async (index) => {
        if (!window.confirm('Delete this entry?')) return
        setDeletingIndex(index)
        try {
            const res = await API.delete(`/entries/delete/${index}`)
            if (res.data.success) fetchEntries()
        } catch (err) {
            alert('Delete failed!')
        } finally {
            setDeletingIndex(null)
        }
    }

    const get = (entry, ...keys) => {
        for (const key of keys) {
            if (entry[key] !== undefined && entry[key] !== null && entry[key] !== '') return entry[key]
        }
        return '-'
    }

    const dsBadge = (val) => {
        const classMap = {
            'Subah': 'et-badge-subah',
            'Dopahar': 'et-badge-dopahar',
            'Sham': 'et-badge-sham',
            'Raat': 'et-badge-raat',
        }
        const iconMap = { 'Subah':'🌅', 'Dopahar':'☀️', 'Sham':'🌆', 'Raat':'🌙' }
        const cls = classMap[val] || 'et-badge-default'
        return (
            <span className={`et-badge ${cls}`}>
                {iconMap[val] || '⏰'} {val !== '-' ? val : '-'}
            </span>
        )
    }

    if (loading) return (
        <div className="et-loading">
            <div className="et-spinner" />
            <p className="et-loading-text">Loading entries...</p>
        </div>
    )

    return (
        <div className="et-wrapper">
            <div className="et-header">
                <div>
                    <h3 className="et-title">📋 All Entries</h3>
                    <p className="et-subtitle">{entries.length} total records</p>
                </div>
            </div>

            <div className="et-table-wrapper">
                <table ref={tableRef} className="et-table display" width="100%">
                    <thead>
                        <tr className="et-thead-row">
                            <th className="et-th">#</th>
                            <th className="et-th">Name</th>
                            <th className="et-th">City</th>
                            <th className="et-th">Gender</th>
                            <th className="et-th">DS1</th>
                            <th className="et-th">DS1 Time</th>
                            <th className="et-th">DS1 Place</th>
                            <th className="et-th">DS2</th>
                            <th className="et-th">DS2 Time</th>
                            <th className="et-th">DS2 Place</th>
                            <th className="et-th">Date In</th>
                            <th className="et-th">Date Out</th>
                            <th className="et-th">Timestamp</th>
                            <th className="et-th">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, index) => {
                            const name      = get(entry, 'Name', 'name')
                            const city      = get(entry, 'City', 'city')
                            const gender    = get(entry, 'Gender', 'gender')
                            const ds1       = get(entry, 'DS1', 'ds1')
                            const ds1Time   = get(entry, 'DS1 Time', 'ds1Time')
                            const ds1Place  = get(entry, 'DS1 Place', 'ds1Place')
                            const ds2       = get(entry, 'DS2', 'ds2')
                            const ds2Time   = get(entry, 'DS2 Time', 'ds2Time')
                            const ds2Place  = get(entry, 'DS2 Place', 'ds2Place')
                            const dateIn    = get(entry, 'Date In', 'dateIn')
                            const dateOut   = get(entry, 'Date Out', 'dateOut')
                            const timestamp = get(entry, 'Timestamp', 'timestamp')

                            return (
                                <tr key={index} className="et-tr">
                                    <td className="et-td-num">{index + 1}</td>
                                    <td className="et-td-bold">{name}</td>
                                    <td className="et-td">{city}</td>
                                    <td className="et-td">
                                        <span className={`et-badge ${gender === 'Female' ? 'et-badge-female' : 'et-badge-male'}`}>
                                            {gender === 'Female' ? '👩' : '👨'} {gender}
                                        </span>
                                    </td>
                                    <td className="et-td">{dsBadge(ds1)}</td>
                                    <td className="et-td-mono">{ds1Time}</td>
                                    <td className="et-td">{ds1Place}</td>
                                    <td className="et-td">{dsBadge(ds2)}</td>
                                    <td className="et-td-mono">{ds2Time}</td>
                                    <td className="et-td">{ds2Place}</td>
                                    <td className="et-td-mono">{dateIn}</td>
                                    <td className="et-td-mono">{dateOut}</td>
                                    <td className="et-td-small">{timestamp}</td>
                                    <td>
                                        <div className="et-action-group">
                                            <button
                                                className="et-edit-btn"
                                                onClick={() => onEdit({ ...entry, rowIndex: index })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="et-delete-btn"
                                                onClick={() => handleDelete(index)}
                                                disabled={deletingIndex === index}
                                            >
                                                {deletingIndex === index ? '...' : 'Delete'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EntriesTable