const express = require('express');
const cors = require('cors');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');
const categoriesRoutes = require('./routes/categories');
const tagsRoutes = require('./routes/tags');
const likesRoutes = require('./routes/likes');
const viewsRoutes = require('./routes/views');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/tags', tagsRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/views', viewsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});