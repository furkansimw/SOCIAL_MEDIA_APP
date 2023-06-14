import db from "./db";
import triggers from "./triggers";

const create = async () => {
  await db.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  await db.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    username VARCHAR(36) NOT NULL UNIQUE  ,
    email VARCHAR(255) NOT NULL UNIQUE ,
    pp VARCHAR(500),
    bio VARCHAR(200), 
    fullname VARCHAR(50),
    password VARCHAR(1000) not null,
    ispublic BOOLEAN DEFAULT TRUE not null,
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
    text varchar(200),
    processid uuid not null,
    type numeric not null default 0,
    owner UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    created TIMESTAMP DEFAULT NOW()
  );
  `);
  // 0 = text, 1 = image, 2 = post, 3 = messagereply
  await db.query(`create table if not exists messages (
      id uuid primary key not null default uuid_generate_v4(),
      owner uuid references users(id) on delete cascade,
      type numeric not null default 0,
      content varchar(500) not null,
      reply varchar(537),
      created TIMESTAMP DEFAULT NOW()
    )`);

  // i dont use uuid[] because query is very limited with uuid and there are no references in the lists anyway.
  await db.query(`create table if not exists rooms (
      id uuid primary key not null default uuid_generate_v4(),
      last_msg uuid references messages(id) ON DELETE SET NULL,
      members uuid[] not null,      
      created TIMESTAMP DEFAULT NOW()
    );
  `);
  await db.query(
    `alter table messages add column if not exists room uuid references rooms(id) on delete cascade not null;`
  );
  //--
  // if delete chat message getting start with cursor date and seen date
  await db.query(`create table if not exists cursor (
    id uuid primary key not null default uuid_generate_v4(),
    owner uuid references users(id) on delete cascade not null, 
    room uuid references rooms(id) on delete cascade not null,
    is_active boolean default true not null,
    created TIMESTAMP DEFAULT NOW(),
    delete TIMESTAMP DEFAULT NOW(),
    inbox boolean not null default true,
    seen timestamp default now()
  );`);

  await triggers();
};

export default create;
