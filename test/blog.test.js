import request from 'supertest';
// import config from '/config';
import app from '../index';

// import generateToken from '../helper/Token';
import mongoose from 'mongoose';
// import { iteratee } from 'lodash';
import Blog from '../modals/blogs.modal'
// import { request } from 'express';

// const dbUrl='mongodb://localhost/fidele_testing_db';

describe('general Testing',()=>{
    beforeAll(()=>{
        mongoose.connect( 'mongodb://localhost/fidele_testing_db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // let token;
    let blog;

    beforeEach(async()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        blog = {
            author : user.name,
            title : 'software engineering',
            content : 'computer science',
        }
        // token = generateToken(user);
    })

    afterEach(async()=>await Blog.remove());

    it("it should post a new blog", async()=>{
        await request(app)
        .post('/api/blogs/addBlog')
        // .set('auth-token', token)
        .send(blog);

    expect(blog).not.toBe(null);
    });

});


/////Read blogue////

describe('Read bloge',()=>{
    let blog;
    beforeAll(()=>{
        mongoose.connect( 'mongodb://localhost/fidele_testing_db',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });
    // let token;

    beforeEach(async()=>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        // token = generateToken(user);
    })

    afterEach(async()=>await Blog.remove());

    it('read all blogs', async (done) =>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        blog = {
            author : user.name,
            title : 'software engineering',
            content : 'computer science',
        }
    const newBlog = await Blog(blog)
    await newBlog.save()
        const res = await request(app)
        .get('/api/blogs/allBlogs')
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    })
});
