import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import {Inquiry} from '../modals/inquiry.modal';

// jest.useFakeTimers();
jest.setTimeout(30000);

describe('general Testing',()=>{
    beforeAll(()=>{
        mongoose.connect( 'mongodb://localhost/fidele_testing_db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // let token;
    let inquiry1;

    beforeEach(async()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        inquiry1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            message : "your password is not recognised",
            date : "2020-10-28"
            // role : "inquiry"
        }
        // token = generateToken(user);
    })

    afterEach(async()=> await Inquiry.deleteMany());

    it("it should post a new inquiry", async()=>{
        const res = await request(app)
        .post('/api/inquiries')
        // .set('auth-token', token)
        .send(inquiry1);

    expect(inquiry1).not.toBe(null);
    expect(res.status).toBe(404);
    });
    
    it('read all inquiries', async (done) =>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        inquiry1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            message : "your password is not recognised",
            date : "2020-10-28"
        }
    const newinquiry = await Inquiry(inquiry1)
    const savedinquiry = await newinquiry.save()
        const res = await request(app)
        .get('/api/inquiries/allInquiries')
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    })
    
    
    it('read one inquiry by Id', async (done) =>{
        // const user = {
        //     _id: mongoose.Types.ObjectId().toHexString(),
        //     name : "fidele",
        //     email : "fidele@gmail.com",
        //     password : "password"
        // };
        const inquiry1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            message : "your password is not recognised",
            date : "2020-10-28",
            status : "good"
        }
    const newinquiry = await Inquiry(inquiry1)
    const savedinquiry = await newinquiry.save()
    const id = savedinquiry._id;
        const res = await request(app)
        .get(`/api/inquiries/byInquiryId/${id}`)
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    })
    
    // it('read one inquiry by Status', async (done) =>{
        // const user = {
        //     _id: mongoose.Types.ObjectId().toHexString(),
        //     name : "fidele",
        //     email : "fidele@gmail.com",
        //     password : "password"
        // };
    //     const inquiry1 = {
    //         name : "fidele",
    //         email : "fidele@gmail.com",
    //         message : "your password is not recognised",
    //         date : "2020-10-28",
    //         status : "good"
    //     }
    // const newinquiry = await Inquiry(inquiry1)
    // const savedinquiry = await newinquiry.save()
    // const id = savedinquiry._id;
    //     const res = await request(app)
    //     .get(`/api/inquiries/byInquiryStatus/${id}`)
    //     // .set('auth-token',token);

    //     expect(res.status).toBe(200);
    //     done();
    // })
    
    it('update', async (done) =>{
        const inquiry1 = {
            name : "fidele",
            email : "fidele@gmail.com",
            message : "your password is not recognised",
            date : "2020-10-28",
            status : "good"
        }
    const newinquiry = await Inquiry(inquiry1)
    const savedinquiry = await newinquiry.save()
    const id = savedinquiry._id;
    const status = savedinquiry.status;
        const res = await request(app)
        .put(`/api/inquiries/updateStatus/inquiry/${id}/status${status}`)
        // .set('auth-token',token);

        expect(res.status).toBe(404);
        done();
    })
});
