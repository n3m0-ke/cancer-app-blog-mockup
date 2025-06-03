// import { generateUniqueSlug } from "../utility/slugify";

const db = require('../db');

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanum with dashes
    .replace(/^-+|-+$/g, ''); // Trim dashes

const generateUniqueSlug = async (title, db, postId = null) => {
  let baseSlug = slugify(title);
  let uniqueSlug = baseSlug;
  let suffix = 1;

  let query = `SELECT COUNT(*) FROM posts WHERE slug = $1`;
  let values = [uniqueSlug];

  if (postId) {
    // Avoid counting the current post if updating
    query += ` AND id != $2`;
    values.push(postId);
  }

  let { rows } = await db.query(query, values);

  while (parseInt(rows[0].count) > 0) {
    uniqueSlug = `${baseSlug}-${suffix++}`;
    values[0] = uniqueSlug;
    rows = (await db.query(query, values)).rows;
  }

  return uniqueSlug;
};

exports.getDashboardStats = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.user;

    const { rows } = await db.query(
      `SELECT
        COUNT(*) AS total,
        COALESCE(SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END), 0) AS published,
        COALESCE(SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END), 0) AS draft
      FROM posts
      WHERE author_id = $1`,
      [id]
    );

    const stats = rows[0]; // This is the object with total, published, draft
    res.json(stats);
  } catch (err) {
    console.error('Dashboard query error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};



exports.getAuthorDashboard = async (req, res) => {
  const authorId = req.user.id;
  try {
    const totalPosts = await Post.count({ where: { author_id: authorId } });
    const publishedPosts = await Post.count({ where: { author_id: authorId, status: 'published' } });
    const draftPosts = await Post.count({ where: { author_id: authorId, status: 'draft' } });

    res.json({ totalPosts, publishedPosts, draftPosts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const result = await db.query(
      `SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};


exports.createPost = async (req, res) => {
  const { title, content, status } = req.body;

  try {
    const slug = await generateUniqueSlug(title, db);

    const result = await db.query(
      `INSERT INTO posts (id, author_id, title, content, slug, status)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user.id, title, content, slug, status || 'draft']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};


exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, content, status } = req.body;

  try {
    // First, get the post and make sure it belongs to the user
    const existing = await db.query(
      'SELECT * FROM posts WHERE id = $1 AND author_id = $2',
      [postId, req.user.id]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const slug = await generateUniqueSlug(title, db, postId);

    const updated = await db.query(
      `UPDATE posts
       SET title = $1, content = $2, status = $3, slug = $4
       WHERE id = $5
       RETURNING *`,
      [title, content, status || 'draft', slug, postId]
    );

    res.json(updated.rows[0]);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ error: 'Failed to update post' });
  }
};


exports.deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const result = await db.query(
      `DELETE FROM posts
       WHERE id = $1 AND author_id = $2
       RETURNING *`,
      [postId, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};


exports.getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const result = await db.query(
      'SELECT id, name, email FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.user;

  try {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found or not updated' });
    }

    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

