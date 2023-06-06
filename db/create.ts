import db from "./db";

const create = async () => {
  await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await db.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  //
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(36) NOT NULL UNIQUE CHECK (username ~ '^(?!.*[_.]{2})[a-zd._]{5,35}[^_.]$'),
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    pp VARCHAR(500),
    bio VARCHAR(200), 
    fullname VARCHAR(50),
    password VARCHAR(1000) not null,
    ispublic BOOLEAN DEFAULT TRUE,
    followerCount numeric not null default 0,
    followingCount numeric not null default 0,
    reqcount numeric not null default 0,
    postcount numeric not null default 0,
    
    nreqcount numeric not null default 0,
    npostlikescount numeric not null default 0,
    ncreatedcommentcount numeric not null default 0,
    
    unreadmessagescount numeric not null default 0,

    created TIMESTAMP DEFAULT NOW()
    );`);

  await db.query(`CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    content VARCHAR(1000),
    images VARCHAR(500)[] NOT NULL CHECK (cardinality(images)<=10),
    likeCount numeric not null default 0,
    commentCount numeric not null default 0,
    created TIMESTAMP DEFAULT NOW()
  );`);

  // 0 following - 1 requested - 2 blocked
  await db.query(`CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    target UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    type int not null default 1,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS postlikes (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    post UUID REFERENCES posts(ID) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    post UUID REFERENCES posts(ID) ON DELETE CASCADE NOT NULL,
    content VARCHAR(200) NOT NULL,
    likeCount numeric not null default 0,
    subCommentCount numeric not null default 0,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS saved (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    post UUID REFERENCES posts(ID) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS subcomments (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    comment UUID REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
    content VARCHAR(200) NOT NULL,
    likeCount numeric not null default 0,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS commentlikes (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    comment UUID REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS subcommentlikes (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    subcomment UUID REFERENCES subcomments(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);

  await db.query(`CREATE TABLE IF NOT EXISTS sessions(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    refreshid UUID DEFAULT uuid_generate_v4(),
    created TIMESTAMP DEFAULT NOW()
  );`);
  //
  await db.query(`CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    target UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    url uuid not null,
    processid uuid not null,
    type numeric not null default 0,
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );
  `);

  // -------- TRIGGERS

  // target me
  /*
  0 "following",
  1 "postlike",
  2 "commentlike",
  3 "createdcomment",
  */
  // NOTIFICATIONS TRIGGERS

  // TRIGGER 1 posts -> likecount

  await db.query(`
      DROP TRIGGER IF EXISTS update_relationships ON users;
      CREATE OR REPLACE  FUNCTION update_relationships()
      RETURNS TRIGGER AS $$
      BEGIN
      IF NEW.ispublic = true THEN
          UPDATE relationships
          SET type = 0
          WHERE id = NEW.id AND type = 1;
      END IF;
      return null;
      END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER update_relationships
    AFTER UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_relationships();
  `);

  await db.query(`
      DROP TRIGGER IF EXISTS update_like_count ON postlikes;
      CREATE OR REPLACE FUNCTION update_post_like_count()
      RETURNS TRIGGER AS $$
      DECLARE
        owner_id uuid;
      BEGIN
        owner_id := (SELECT owner FROM posts WHERE id = NEW.post);
        
        IF (TG_OP = 'INSERT') THEN
          UPDATE posts
          SET likecount = likecount + 1
          WHERE id = NEW.post;
          
          INSERT INTO notifications (target, url, type, owner,processid)
          VALUES (owner_id, owner_id, 2, NEW.owner, NEW.id);

        ELSIF (TG_OP = 'DELETE') THEN
          UPDATE posts
          SET likecount = likecount - 1
          WHERE id = OLD.post;

        DELETE FROM notifications where processid = OLD.id;

        END IF;
        
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER update_like_count
      AFTER INSERT OR DELETE ON postlikes
      FOR EACH ROW
      EXECUTE FUNCTION update_post_like_count();
      `);

  // TRIGGER 2 posts -> commentcount
  await db.query(`
  DROP TRIGGER IF EXISTS update_comment_count ON comments;
  CREATE OR REPLACE  FUNCTION update_post_comment_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      UPDATE posts
      SET commentcount = commentcount + 1
      WHERE id = NEW.post;
    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE posts
      SET commentcount = commentcount - 1
      WHERE id = OLD.post;
    END IF; 
    RETURN NULL;
  END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER update_comment_count
    AFTER INSERT OR DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_post_comment_count();
  ;`);

  // TRIGGER 3 commentlikes -> likecount (comments)
  await db.query(`
  DROP TRIGGER IF EXISTS update_comment_like_count ON commentlikes;
  CREATE OR REPLACE  FUNCTION update_comment_like_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      UPDATE comments
      SET likecount = likecount + 1
      WHERE id = NEW.comment;
    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE comments
      SET likecount = likecount - 1
      WHERE id = OLD.comment;
    END IF; 
    RETURN NULL;
  END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER update_comment_like_count
    AFTER INSERT OR DELETE ON commentlikes
    FOR EACH ROW
    EXECUTE FUNCTION update_comment_like_count();
  ;`);

  // TRIGGER 4 subcommentlikes -> likecount (subcomments)
  await db.query(`
  DROP TRIGGER IF EXISTS update_subcomment_like_count ON subcommentlikes;
  CREATE OR REPLACE  FUNCTION update_subcomment_like_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      UPDATE subcomments
      SET likecount = likecount + 1
      WHERE id = NEW.subcomment;
    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE subcomments
      SET likecount = likecount - 1
      WHERE id = OLD.subcomment;
    END IF; 
    RETURN NULL;
  END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER update_subcomment_like_count
    AFTER INSERT OR DELETE ON subcommentlikes
    FOR EACH ROW
    EXECUTE FUNCTION update_subcomment_like_count();
  ;`);

  // TRIGGER 5 subcomments -> subcommentcount (comments)
  await db.query(`
  DROP TRIGGER IF EXISTS update_subcomment_count ON subcomments;
  CREATE OR REPLACE  FUNCTION update_subcomment_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      UPDATE comments
      SET subcommentcount = subcommentcount + 1
      WHERE id = NEW.comment;
    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE comments
      SET subcommentcount = subcommentcount - 1
      WHERE id = OLD.comment;
    END IF; 
    RETURN NULL;
  END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER update_subcomment_count
    AFTER INSERT OR DELETE ON subcomments
    FOR EACH ROW
    EXECUTE FUNCTION update_subcomment_count();
  ;`);

  // TRIGGER 6 posts -> users (postcount)
  await db.query(`
  DROP TRIGGER IF EXISTS update_post_count ON posts;
  CREATE OR REPLACE  FUNCTION update_post_count()
  RETURNS TRIGGER AS $$
  BEGIN
    IF (TG_OP = 'INSERT') THEN
      UPDATE users
      SET postcount = postcount + 1
      WHERE id = NEW.owner;
    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE users
      SET postcount = postcount - 1
      WHERE id = OLD.owner;
    END IF; 
    RETURN NULL;
  END;
    $$ LANGUAGE plpgsql; 
    CREATE TRIGGER update_post_count
    AFTER INSERT OR DELETE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_post_count();
  ;`);

  // TRIGGER 7 relationships -> users followingcount

  await db.query(`
      DROP TRIGGER IF EXISTS relationships_trigger ON relationships;
        CREATE OR REPLACE FUNCTION add_notification_and_update_counts()
        RETURNS TRIGGER AS $$
      BEGIN
        IF (NEW.type = 0) THEN
          INSERT INTO notifications (target, url, type, owner,processid)
          VALUES (NEW.target, NEW.owner, NEW.type, NEW.owner, NEW.ID);
          
          UPDATE users
          SET followingcount = followingcount + 1 
          WHERE id = NEW.owner;
          
          UPDATE users
          SET followercount = followercount + 1
          WHERE id = NEW.target;

        ELSIF (NEW.type = 1) THEN
          INSERT INTO notifications (target, url, type, owner, processid)
          VALUES (NEW.target, NEW.owner, NEW.type, NEW.owner, NEW.id);
          update users set reqcount = reqcount + 1 where id = new.target;

        ELSIF (NEW.type = 2) THEN
          IF EXISTS (SELECT 1 FROM relationships WHERE owner = NEW.target AND target = NEW.owner AND type = 0) THEN
              UPDATE users SET followingcount = followingcount - 1 WHERE owner = NEW.target;
              DELETE FROM relationships WHERE owner = NEW.target AND target = NEW.owner;
          END IF;
          IF EXISTS (SELECT 1 FROM relationships WHERE owner = NEW.owner AND target = NEW.target AND type = 0) THEN
          UPDATE users SET followingcount = followingcount - 1 WHERE owner = NEW.owner ;
          DELETE FROM relationships WHERE target = NEW.target AND owner = NEW.owner and type != 2;
          END IF;
        return NEW;

        ELSIF (OLD.type = 0) THEN 
          UPDATE users
          SET followingcount = followingcount - 1 
          WHERE id = OLD.owner;
          
          UPDATE users
          SET followercount = followercount - 1
          WHERE id = OLD.target;  

          DELETE FROM notifications where processid = old.id;

        ELSIF (OLD.type = 1) THEN 
          update users set reqcount = reqcount - 1 where id = old.target;
          DELETE FROM notifications where processid = old.id;
        END IF;
        
        RETURN OLD;

      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER relationships_trigger
      AFTER INSERT OR DELETE OR UPDATE ON relationships
      FOR EACH ROW
      EXECUTE FUNCTION add_notification_and_update_counts();
  `);

  await db.query(`
  DROP TRIGGER IF EXISTS update_notification_count ON notifications;
  CREATE OR REPLACE  FUNCTION update_notification_count()
  RETURNS TRIGGER AS $$
      BEGIN
      IF (TG_OP = 'INSERT') THEN
        IF (new.type = 0 OR new.type = 1) THEN
          UPDATE users SET nreqcount = nreqcount + 1;
        ELSIF (new.type = 2) THEN
          UPDATE users SET npostlikescount = npostlikescount + 1;
        ELSIF (new.type = 3) THEN
          UPDATE users SET ncreatedcommentcount = ncreatedcommentcount + 1;
        END IF;
      ELSIF (TG_OP = 'DELETE') THEN
        IF (old.type = 0 OR old.type = 1) THEN
          UPDATE users SET nreqcount = nreqcount - 1;
        ELSIF (old.type = 2) THEN
          UPDATE users SET npostlikescount = npostlikescount - 1;
        ELSIF (old.type = 3) THEN
          UPDATE users SET ncreatedcommentcount = ncreatedcommentcount - 1;
        END IF;
      END IF;
      
      RETURN NULL;
    END;

    $$ LANGUAGE plpgsql; 
    CREATE TRIGGER update_notification_count
    AFTER INSERT OR DELETE ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_notification_count();
  ;`);
};

export default create;
