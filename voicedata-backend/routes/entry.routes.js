// import express from 'express'
// import { submitEntry, downloadExcel, getAllEntries } from '../controllers/entry.controller.js'
// import verifyToken from '../middleware/auth.js'

// const router = express.Router()

// router.post('/submit', verifyToken, submitEntry)
// router.get('/download', verifyToken, downloadExcel)
// router.get('/all', verifyToken, getAllEntries)

// export default router

// import express from 'express'
// import {
//     submitEntry,
//     downloadExcel,
//     getAllEntries,
//     updateEntry
// } from '../controllers/entry.controller.js'
// import verifyToken from '../middleware/auth.js'

// const router = express.Router()

// router.post('/submit', verifyToken, submitEntry)
// router.get('/all', verifyToken, getAllEntries)
// router.put('/update/:rowIndex', verifyToken, updateEntry)
// router.get('/download', verifyToken, downloadExcel)

// export default router


// import express from 'express'
// import { submitEntry, getAllEntries, updateEntry, deleteEntry, downloadExcel } from '../controllers/entry.controller.js'
// import verifyToken from '../middleware/auth.js'

// const router = express.Router()

// router.post('/submit', verifyToken, submitEntry)
// router.get('/all', verifyToken, getAllEntries)
// router.put('/update/:rowIndex', verifyToken, updateEntry)
// router.delete('/delete/:rowIndex', verifyToken, deleteEntry)
// router.get('/download', verifyToken, downloadExcel)

// export default router



import express from 'express'
import { submitEntry, downloadExcel, getAllEntries, updateEntry, deleteEntry, getCSV } from '../controllers/entry.controller.js'
import verifyToken from '../middleware/auth.js'

const router = express.Router()

router.post('/submit', verifyToken, submitEntry)
router.get('/all', verifyToken, getAllEntries)
router.put('/update/:rowIndex', verifyToken, updateEntry)
router.delete('/delete/:rowIndex', verifyToken, deleteEntry)
router.get('/download', verifyToken, downloadExcel)
router.get('/csv', getCSV)   // excel file
        
export default router