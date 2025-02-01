const express = require('express');
const { createEvent, getEvents, registerForEvents ,deleteEvent, updateEvent} = require("../controllers/eventControllers");

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router()

router.post('/', authMiddleware, roleMiddleware('organizer'), createEvent);
router.get('/', authMiddleware, getEvents);
router.post('/:id/register', authMiddleware, registerForEvents);
router.delete('/:id', authMiddleware, roleMiddleware('organizer'), deleteEvent);
router.put('/:id', authMiddleware, roleMiddleware('organizer'), updateEvent);

module.exports = router;