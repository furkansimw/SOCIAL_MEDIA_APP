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
    postCount numeric not null default 0,
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
    // -------- TRIGGERS
    // TRIGGER 1 posts -> likecount
    yield db_1.default.query(`
    DROP TRIGGER IF EXISTS update_like_count ON postlikes;
    CREATE OR REPLACE  FUNCTION update_post_like_count()
    RETURNS TRIGGER AS $$
    BEGIN
      IF (TG_OP = 'INSERT') THEN
        UPDATE posts
        SET likecount = likecount + 1
        WHERE id = NEW.post;
      ELSIF (TG_OP = 'DELETE') THEN
        UPDATE posts
        SET likecount = likecount - 1
        WHERE id = OLD.post;
      END IF; 
      RETURN NULL;
    END;
      $$ LANGUAGE plpgsql;
      CREATE TRIGGER update_like_count
      AFTER INSERT OR DELETE ON postlikes
      FOR EACH ROW
      EXECUTE FUNCTION update_post_like_count();
    ;`);
    // TRIGGER 2 posts -> commentcount
    yield db_1.default.query(`
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
      WHERE id = NEW.comment;
    ELSIF (TG_OP = 'DELETE') THEN
      UPDATE subcomments
      SET likecount = likecount - 1
      WHERE id = OLD.comment;
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
});
exports.default = create;
