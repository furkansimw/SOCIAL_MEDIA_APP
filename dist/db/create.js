"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const create = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    yield db_1.default.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    yield db_1.default.query(`alter table users add column if not exists is_online boolean not null default false;`);
    yield db_1.default.query(`alter table users add column if not exists lastonline timestamp not null default now();`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS users (
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
    
    nfollowcount numeric not null default 0,
    nreqcount numeric not null default 0,
    npostlikescount numeric not null default 0,
    ncreatedcommentcount numeric not null default 0,
    
    unreadmessagescount numeric not null default 0,

    is_online boolean not null default false,
    lastonline timestamp not null default now(),

    created TIMESTAMP DEFAULT NOW()
    );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    content VARCHAR(1000),
    images VARCHAR(500)[] NOT NULL CHECK (cardinality(images)<=10),
    likeCount numeric not null default 0,
    commentCount numeric not null default 0,
    created TIMESTAMP DEFAULT NOW()
  );`);
    // 0 following - 1 requested - 2 blocked
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    target UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    type int not null default 1,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS postlikes (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    post UUID REFERENCES posts(ID) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    post UUID REFERENCES posts(ID) ON DELETE CASCADE NOT NULL,
    content VARCHAR(200) NOT NULL,
    likeCount numeric not null default 0,
    subCommentCount numeric not null default 0,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS saved (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(ID) ON DELETE CASCADE NOT NULL,
    post UUID REFERENCES posts(ID) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS subcomments (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    comment UUID REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
    content VARCHAR(200) NOT NULL,
    likeCount numeric not null default 0,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS commentlikes (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    comment UUID REFERENCES comments(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS subcommentlikes (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    subcomment UUID REFERENCES subcomments(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );`);
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS sessions(
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    refreshid UUID DEFAULT uuid_generate_v4(),
    created TIMESTAMP DEFAULT NOW()
  );`);
    //
    yield db_1.default.query(`CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    target UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    url uuid not null,
    text varchar(200),
    processid uuid not null,
    type numeric not null default 0,
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );
  `);
    // 0 = text, 1 = image, 2 = post, 3 = messagereply
    yield db_1.default.query(`create table if not exists messages (
      id uuid primary key not null default uuid_generate_v4(),
      owner uuid references users(id) on delete cascade,
      type numeric not null default 0,
      content varchar(500) not null,
      reply varchar(237),
      created TIMESTAMP DEFAULT NOW()
    )`);
    // i dont use uuid[] because query is very limited with uuid and there are no references in the lists anyway.
    yield db_1.default.query(`create table if not exists rooms (
      id uuid primary key not null default uuid_generate_v4(),
      last_msg uuid references messages(id) ON DELETE SET NULL,
      members uuid[] not null,      
      created TIMESTAMP DEFAULT NOW()
    );
  `);
    yield db_1.default.query(`alter table messages add column if not exists room uuid references rooms(id) on delete cascade not null;`);
    // if delete chat message getting start with cursor date and seen date
    yield db_1.default.query(`create table if not exists cursor (
    id uuid primary key not null default uuid_generate_v4(),
    owner uuid references users(id) on delete cascade not null, 
    room uuid references rooms(id) on delete cascade not null,
    delete timestamp default now(),
    inbox boolean not null default true,
    seen timestamp default now()
  );`);
    yield db_1.default.query(`alter table cursor add column if not exists inbox boolean not null default true;`);
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
    yield db_1.default.query(`
      DROP TRIGGER IF EXISTS update_relationships ON users;
      CREATE OR REPLACE  FUNCTION update_relationships()
      RETURNS TRIGGER AS $$
      BEGIN
      IF NEW.ispublic = true THEN
          UPDATE relationships
          SET type = 0
          WHERE target = NEW.id AND type = 1;
          
      END IF;
      return new;
      END;
    $$ LANGUAGE plpgsql;
    CREATE TRIGGER update_relationships
    AFTER UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_relationships();
  `);
    yield db_1.default.query(`
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
    yield db_1.default.query(`
  DROP TRIGGER IF EXISTS update_comment_count ON comments;
  CREATE OR REPLACE  FUNCTION update_post_comment_count()
  RETURNS TRIGGER AS $$
  DECLARE
        owner_id uuid;
  BEGIN
  owner_id := (SELECT owner FROM posts WHERE id = NEW.post);

    IF (TG_OP = 'INSERT') THEN
      UPDATE posts
      SET commentcount = commentcount + 1
      WHERE id = NEW.post;
      INSERT INTO notifications (target, url, processid, type, owner, text)
      VALUES (owner_id, NEW.post, NEW.id, 3, NEW.owner, new.content);

    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE posts
      SET commentcount = commentcount - 1
      WHERE id = OLD.post;
      DELETE FROM notifications where processid = old.id;
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
    yield db_1.default.query(`
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
    yield db_1.default.query(`
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
    yield db_1.default.query(`
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
    yield db_1.default.query(`
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
    yield db_1.default.query(`
  DROP TRIGGER IF EXISTS update_relationships_counts ON relationships;
  CREATE OR REPLACE FUNCTION update_relationships_counts()
    RETURNS TRIGGER AS $$
  BEGIN
    IF TG_OP = 'INSERT' THEN
      IF NEW.type = 0 THEN
        UPDATE users SET followercount = followercount + 1 WHERE id = NEW.target;
        UPDATE users SET followingcount = followingcount + 1 WHERE id = NEW.owner;
        INSERT INTO notifications (target, url, processid, type, owner)
        VALUES (NEW.target, NEW.owner, NEW.id, 0, NEW.owner);
      ELSIF NEW.type = 1 THEN
        UPDATE users SET reqcount = reqcount + 1, nreqcount = nreqcount + 1 WHERE id = NEW.target;
      ELSIF NEW.type = 2 THEN
        DELETE FROM relationships WHERE (owner = NEW.owner AND target = NEW.target AND type != 2);
        DELETE FROM relationships WHERE (target = NEW.owner AND owner = NEW.target AND type != 2);
      END IF;
    ELSIF TG_OP = 'DELETE' THEN
      DELETE FROM notifications WHERE processid = OLD.id;
      IF OLD.type = 0 THEN
        UPDATE users SET followercount = followercount - 1 WHERE id = OLD.target and followercount > 0;
        UPDATE users SET followingcount = followingcount - 1 WHERE id = OLD.owner and followingcount > 0;
      ELSIF OLD.type = 1 THEN
        UPDATE users SET reqcount = reqcount - 1 WHERE id = OLD.target and reqcount > 0;
        UPDATE users SET nreqcount = nreqcount - 1 WHERE id = OLD.target and nreqcount > 0;
      END IF;

    ELSIF TG_OP = 'UPDATE' THEN
      IF NEW.type = 0 THEN
        UPDATE users SET followercount = followercount + 1 WHERE id = NEW.target;
        UPDATE users SET followingcount = followingcount + 1 WHERE id = NEW.owner;
        UPDATE users SET reqcount = reqcount - 1 WHERE id = NEW.target and reqcount > 0;
        INSERT INTO notifications (target, url, processid, type, owner)
        VALUES (NEW.target, NEW.owner, NEW.id, 0, NEW.owner);
      END IF;
    END IF;

    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  
  CREATE TRIGGER update_relationships_counts
  AFTER INSERT OR DELETE OR UPDATE ON relationships
  FOR EACH ROW
  EXECUTE FUNCTION update_relationships_counts();
  
  `);
    yield db_1.default.query(`
  DROP TRIGGER IF EXISTS update_notification_count ON notifications;
  CREATE OR REPLACE  FUNCTION update_notification_count()
  RETURNS TRIGGER AS $$
      BEGIN
      IF (TG_OP = 'INSERT') THEN
        IF (new.type = 0) THEN
          UPDATE users SET nfollowcount = nfollowcount + 1 where id =  new.target;
        ELSIF (new.type = 2) THEN
          UPDATE users SET npostlikescount = npostlikescount + 1 where id =  new.target;
        ELSIF (new.type = 3) THEN
          UPDATE users SET ncreatedcommentcount = ncreatedcommentcount + 1 where id =  new.target;
        END IF;
      ELSIF (TG_OP = 'DELETE') THEN
        IF (old.type = 0) THEN
          UPDATE users SET nfollowcount = nfollowcount - 1 where id =  old.target and nfollowcount > 0;
        ELSIF (old.type = 2) THEN
          UPDATE users SET npostlikescount = npostlikescount - 1 where id =  old.target and npostlikescount > 0;
        ELSIF (old.type = 3) THEN
          UPDATE users SET ncreatedcommentcount = ncreatedcommentcount - 1 where id =  old.target and ncreatedcommentcount > 0;
        END IF;
      END IF;
      return new;
    END;
    $$ LANGUAGE plpgsql; 
    CREATE TRIGGER update_notification_count
    AFTER INSERT OR DELETE ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_notification_count();
  ;`);
});
exports.default = create;
