const request = require('supertest');
const app = require('../app'); 

let token;

describe('Auth Routes', () => {

  test('User Registration - Should create a new user', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      role: 'organizer'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  test('User Login - Should return a JWT token after successful registration', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'johndoe@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('Login with Invalid Credentials - Should return an error', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'johndoe@example.com',
      password: 'wrongpassword'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});

describe('Event Routes', () => {

  test('Create Event - Should create a new event for authenticated users', async () => {
    console.log(token);
    const res = await request(app)
      .post('/events/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Tech Conference',
        date: '21/01/2025',
        time: '14:00',
        description: 'A fun event for developers'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Event created successfully!');
  });

  test('Create Event - Should return error if not authenticated', async () => {
    const res = await request(app)
      .post('/events/')
      .send({
        title: 'Tech Conference',
        date: '21/01/2025',
        time: '14:00',
        description: 'A fun event for developers'
      });

    expect(res.statusCode).toBe(401); 
    expect(res.body).toHaveProperty('message', 'Access Denied');
  });

  test('Update Event - Should update event details by organizer', async () => {
    const res = await request(app)
      .put('/events/1')  
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Tech',
        date: '21/01/2025',
        time: '16:00',
        description: 'Updated description'
      });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Event updated successfully');
  });

  test('Event Registration - Should prevent organizers from registering', async () => {
    const eventId = '1';

    const res = await request(app)
      .post(`/events/${eventId}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send();
    console.log(res.body)
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Organizer cannot be participant of the event');
  });

  test('Delete Event - Should delete event by organizer', async () => {
    const res = await request(app)
      .delete('/events/1') 
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Event deleted successfully');
  });
});
