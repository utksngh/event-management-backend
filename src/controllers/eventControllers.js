const { events } = require('../models/eventModel');
const { createUpdateEventSchema } = require('../validations/authValidation');
const { sendEmail } = require('../config/email');

exports.createEvent = (req, res) => {
    const {error} = createUpdateEventSchema.validate(req.body);
    if (error) return res.status(400).json({ message : error.details[0].message })
    const { title, date, time, description } = req.body;
    const event = { id: events.length +1, title, date, time, description, organizer: req.user.id, participants: []}
    events.push(event);
    res.status(201).json({ message : "Event created successfully!"})
}

exports.getEvents = (req, res) => res.json(events);

exports.registerForEvents = async (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));

    if(!event) return res.status(404).json({ message : "Event not found"});
    requestingUser = req.user.id
    if (event.organizer === requestingUser){
        res.status(200).json({ message : "Organizer cannot be participant of the event"})
    }

    if(!event.participants.includes(requestingUser)){
        event.participants.push(req.user.id)
        await sendEmail(req.user.email, `Registration Confirmed : ${event.title}`, `Hello ${req.user.name}, \n\n You have successfully registered for ${event.title} \n\n\ Event Details ${event.date},${event.time},${event.description}`)
    }

    res.status(201).json({ message : "Registered for the event successfully"})
};

exports.deleteEvent = async (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));

    if(!event) return res.status(404).json({ message : "Event not found"})
    events.pop(event)
    eventParticipants = event["participants"]
    if (eventParticipants.length > 0){
        for (eventParticipant of eventParticipants)
        {
            eventParticipantUser = users.find(u => u.id === eventParticipant)
            await sendEmail(eventParticipantUser.email, `Event Deleted : ${event.title}`, `Hello ${eventParticipantUser.name}, \n\n Event ${event.title} has been cancelled \n\n\ Event Details ${event.date},${event.time},${event.description}`)
        }
    }
    return res.status(200).json({ message : "Event deleted successfully" })
}

exports.updateEvent = async (req, res) => {
    const {error} = createUpdateEventSchema.validate(req.body);
    if (error) return res.status(400).json({ message : error.details[0].message })
    const event = events.find(e => e.id === parseInt(req.params.id));
    const { title, date, description } = req.body;

    if(!event) return res.status(404).json({ message : "Event not found"})
    event.title = title;
    event.date = date;
    event.description = description;
    eventParticipants = event["participants"]
    if (eventParticipants.length > 0){
        for (eventParticipant of eventParticipants)
        {
            eventParticipantUser = users.find(u => u.id === eventParticipant)
            await sendEmail(eventParticipantUser.email, `Event Deleted : ${event.title}`, `Hello ${eventParticipantUser.name}, \n\n Event ${event.title} has been cancelled \n\n\ Event Details ${event.date},${event.time},${event.description}`)
        }
    }
    return res.status(200).json({ message : "Event updated successfully" , event})
}