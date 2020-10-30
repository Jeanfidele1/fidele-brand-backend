import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import Blog from '../modals/blogs.modal'

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
            date : '2020-10-28',
            content : 'computer science',
        }
    const newBlog = await Blog(blog)
    await newBlog.save()
        const res = await request(app)
        .get('/api/blogs/allBlogs')
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    });
    
    it('No blogs blogs', async (done) =>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        const res = await request(app)
        .get('/api/blogs/allBlogs')
        // .set('auth-token',token);

        expect(res.status).toBe(404);
        done();
    })
    
    it('update blog', async (done) =>{
        const user = {
            _id: mongoose.Types.ObjectId().toHexString(),
            name : "fidele",
            email : "fidele@gmail.com",
            password : "password"
        };
        const blog = {
            author : user.name,
            title : 'software engineering',
            date : '2020-10-28',
            content : 'computer science',
        }
    const newBlog = await Blog(blog)
    const savedBlog = await newBlog.save();
    const id = savedBlog._id;
        const res = await request(app)
        .put(`/api/blogs/updateBlog/${id}`)
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    });
    
    it('not update blog', async (done) =>{
        const blog = {
            author : 'Fidele',
            title : 'software engineering',
            date : '2020-10-28',
            content : 'computer science',
        }
    const newBlog = await Blog(blog)
    const savedBlog = await newBlog.save();
    const id = savedBlog._id;
        const res = await request(app)
        .put(`/api/blogs/updateBlog/${id}`)
        // .set('auth-token',token);

        expect(res.status).toBe(200);
        done();
    });
    
    it('delete blog', async (done) =>{
        const blog = {
            author : 'Fidele',
            title : 'software engineering',
            date : '2020-10-28',
            content : 'computer science',
        }
    const newBlog = await Blog(blog)
    const savedBlog = await newBlog.save();
    const id = savedBlog._id;
        const res = await request(app)
        .put(`/api/blogs/delete/${id}`)
        // .set('auth-token',token);

        expect(res.status).toBe(404);
        done();
    });
});