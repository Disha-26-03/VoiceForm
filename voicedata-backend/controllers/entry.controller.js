import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataDir = path.join(__dirname, '../data')
const filePath = path.join(dataDir, 'entries.xlsx')

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
}

const headers = [
    'Name', 'City', 'Gender',
    'DS1', 'DS1 Time', 'DS1 Place',
    'DS2', 'DS2 Time', 'DS2 Place',
    'Date In', 'Date Out', 'Timestamp'
]

const getWorkbook = () => {
    if (fs.existsSync(filePath)) {
        const workbook = xlsx.readFile(filePath)
        return { workbook, worksheet: workbook.Sheets['Entries'] }
    } else {
        const workbook = xlsx.utils.book_new()
        const worksheet = xlsx.utils.aoa_to_sheet([headers])
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Entries')
        return { workbook, worksheet }
    }
}

export const submitEntry = (req, res) => {
    const { name, city, gender, ds1, ds1Time, ds1Place, ds2, ds2Time, ds2Place, dateIn, dateOut } = req.body
    console.log('Submitting:', req.body)
    const { workbook, worksheet } = getWorkbook()
    const newRow = [
        name, city, gender,
        ds1, ds1Time, ds1Place,
        ds2 || '', ds2Time || '', ds2Place || '',
        dateIn, dateOut,
        new Date().toLocaleString()
    ]
    xlsx.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 })
    xlsx.writeFile(workbook, filePath)
    res.json({ success: true, message: 'Entry saved!' })
}

export const getAllEntries = (req, res) => {
    if (!fs.existsSync(filePath)) return res.json({ success: true, data: [] })
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets['Entries']
    const data = xlsx.utils.sheet_to_json(worksheet)
    console.log('Total entries:', data.length)
    res.json({ success: true, data })
}

export const updateEntry = (req, res) => {
    const { rowIndex } = req.params
    const { name, city, gender, ds1, ds1Time, ds1Place, ds2, ds2Time, ds2Place, dateIn, dateOut } = req.body
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'No data file found!' })
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets['Entries']
    const data = xlsx.utils.sheet_to_json(worksheet)
    const index = parseInt(rowIndex)
    if (index < 0 || index >= data.length) return res.status(400).json({ message: 'Invalid row index!' })
    const rowNum = index + 2
    const cols = ['A','B','C','D','E','F','G','H','I','J','K','L']
    const values = [
        name, city, gender,
        ds1, ds1Time, ds1Place,
        ds2 || '', ds2Time || '', ds2Place || '',
        dateIn, dateOut,
        new Date().toLocaleString()
    ]
    cols.forEach((col, i) => {
        worksheet[`${col}${rowNum}`] = { v: values[i] || '', t: 's' }
    })
    xlsx.writeFile(workbook, filePath)
    res.json({ success: true, message: 'Entry updated!' })
}



export const deleteEntry = (req, res) => {
    const { rowIndex } = req.params

    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'No data file found!' })
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets['Entries']


    const data = xlsx.utils.sheet_to_json(worksheet)
    const index = parseInt(rowIndex)


    if (index < 0 || index >= data.length) return res.status(400).json({ message: 'Invalid row index!' })
    data.splice(index, 1)
    const newWorksheet = xlsx.utils.aoa_to_sheet([headers, ...data.map(row => [
        row['Name'] || '', row['City'] || '', row['Gender'] || '',
        row['DS1'] || '', row['DS1 Time'] || '', row['DS1 Place'] || '',
        row['DS2'] || '', row['DS2 Time'] || '', row['DS2 Place'] || '',
        row['Date In'] || '', row['Date Out'] || '', row['Timestamp'] || ''
    ])])
    workbook.Sheets['Entries'] = newWorksheet
    xlsx.writeFile(workbook, filePath)
    res.json({ success: true, message: 'Entry deleted!' })
}

export const downloadExcel = (req, res) => {
    if (fs.existsSync(filePath)) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
        res.download(filePath)
    } else {
        res.status(404).json({ message: 'No data found yet!' })
    }
}

// CSV endpoint — Excel Power 
export const getCSV = (req, res) => {
    if (!fs.existsSync(filePath)) {
        return res.send('Name,City,Gender,DS1,DS1 Time,DS1 Place,DS2,DS2 Time,DS2 Place,Date In,Date Out,Timestamp\n')
    }
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets['Entries']
    const data = xlsx.utils.sheet_to_json(worksheet)



    const csvRows = [
        'Name,City,Gender,DS1,DS1 Time,DS1 Place,DS2,DS2 Time,DS2 Place,Date In,Date Out,Timestamp',
        ...data.map(row => [
            row['Name']||'', row['City']||'', row['Gender']||'',
            row['DS1']||'', row['DS1 Time']||'', row['DS1 Place']||'',
            row['DS2']||'', row['DS2 Time']||'', row['DS2 Place']||'',
            row['Date In']||'', row['Date Out']||'', row['Timestamp']||''
        ].map(v => `"${v}"`).join(','))
    ]

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(csvRows.join('\n'))
}
``
