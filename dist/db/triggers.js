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
//
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query(`

    DROP TRIGGER IF EXISTS room_member_check ON messages;
      CREATE OR REPLACE FUNCTION room_member_check()
      RETURNS TRIGGER AS $$
      BEGIN
  
      IF (TG_OP = 'INSERT') THEN
        IF NOT (NEW.owner = ANY(SELECT unnest(members) FROM rooms WHERE id = NEW.room)) THEN
            RAISE EXCEPTION 'Invalid room member';
        END IF;
      ELSIF (TG_OP = 'DELETE') THEN
          IF NOT (OLD.owner = ANY(SELECT unnest(members) FROM rooms WHERE id = OLD.room)) THEN
              RAISE EXCEPTION 'Invalid room member';
          END IF;
      END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER room_member_check
      BEFORE INSERT OR DELETE ON messages
      FOR EACH ROW
      EXECUTE FUNCTION room_member_check();
    `);
    yield db_1.default.query(`
      DROP TRIGGER IF EXISTS room_last_msg_and_cursor ON messages;
      CREATE OR REPLACE FUNCTION room_last_msg_and_cursor()
      RETURNS TRIGGER AS $$
        DECLARE
        user_id uuid;
        members_array uuid[];
      BEGIN
      
      IF (TG_OP = 'INSERT') THEN
        UPDATE rooms SET last_msg = NEW.id WHERE id = NEW.room;
    
        IF NOT EXISTS (SELECT 1 FROM cursor WHERE room = NEW.room AND owner = NEW.owner) THEN
            INSERT INTO cursor (owner, room, created, delete)
            VALUES (NEW.owner, NEW.room, new.created, new.created);
        END IF;

        SELECT ARRAY(SELECT unnest(members)) INTO members_array
        FROM rooms
        WHERE id = NEW.room;
    
        user_id := members_array[array_position(members_array, NEW.owner) % 2 + 1];

        IF NOT EXISTS (SELECT 1 FROM cursor WHERE room = NEW.room AND cursor.owner = user_id) THEN
            INSERT INTO cursor (owner, room, inbox, created, delete)
            VALUES (user_id, NEW.room, (SELECT CASE WHEN EXISTS (SELECT 1 FROM relationships WHERE owner = user_id AND target = new.owner AND type = 0) THEN true ELSE false END), new.created, new.created);
        END IF;
    
      ELSIF (TG_OP = 'DELETE') THEN
          UPDATE rooms SET last_msg = (SELECT id FROM messages WHERE room = OLD.room ORDER BY created DESC LIMIT 1) WHERE id = OLD.room;
      END IF;
        
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER room_last_msg_and_cursor
      AFTER INSERT OR DELETE ON messages
      FOR EACH ROW
      EXECUTE FUNCTION room_last_msg_and_cursor();
`);
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
