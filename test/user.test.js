import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import {User} from '../modals/users.modal';

jest.useFakeTimers();

describe('general Testing',()=>{
    beforeAll(()=>{
        mongoose.connect( 'mongodb://localhost/fidele_testing_db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // let token;
    let user1;

    beforeEach(async()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        user1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password",
            createdDate : "2020-10-28",
            role : "user"
        }
        // token = generateToken(user);
    })

    afterEach(async()=> await User.deleteMany());

    it("it should post a new user", async()=>{
        await request(app)
        .post('/api/users/signUp')
        // .set('auth-token', token)
        .send(user1);

    expect(user1).not.toBe(null);
    });
    
    jest.useFakeTimers();
    // jest.setTimeout(30000);
    
    it('read all users', async (done) =>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        user1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password",
            createdDate : "2020-10-28",
            role : "user"
        }
    const newUser = await User(user1)
    const savedUser = await newUser.save()
        const res = await request(app)
        .get('/api/users/allUsers')
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    })
    
    it('update user', async (done) =>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        user1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password",
            createdDate : "2020-10-28",
            role : "user"
        }
    const newUser = await User(user1)
    const savedUser = await newUser.save();
    const id = savedUser._id;
        const res = await request(app)
        .get(`/api/users/${id}`)
        // .set('auth-token',token);

        expect(res.status).toBe(404);
        done();
    })
});


describe('Login Testing',()=>{
    beforeAll(()=>{
        mongoose.connect( 'mongodb://localhost/fidele_testing_db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // let token;
    let user1;

    beforeEach(async()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        
        await request(app)
            .post('/api/users/signUp')
            .send(user);        
    })
    
    afterEach(async () => await User.deleteMany());
    
    it('Login user', async (done) =>{
        const user1 = {
            email : "fidele@gmail.com",
            password : "password"
        }
        
        const res = await request(app)
        .post('/api/users/login')
        .send(user1);

        expect(res.status).toBe(200);
        done();
    });
    
    it('Not email for login user', async (done) =>{
        const user1 = {
            email : "fide@gmail.com",
            password : "password"
        }
        
        const res = await request(app)
        .post('/api/users/login')
        .send(user1);

        expect(res.status).toBe(200);
        done();
    });
    
    it('Not password for login user', async (done) =>{
        const user1 = {
            email : "fidele@gmail.com",
            password : "password12345"
        }
        
        const res = await request(app)
        .post('/api/users/login')
        .send(user1);

        expect(res.status).toBe(200);
        done();
    });
});