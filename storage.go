package main

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

type Storage interface {
	Migrate() error

	CreateUser(u *User) error
	GetUserByUsername(username string) (*User, error)

	CreatePost(p *Post) error
	GetPostByID(id int) (*Post, error)
	GetAllPosts() ([]*Post, error)
	UpdatePost(p *Post) error
	DeletePost(id int) error
}

type PostgresStorage struct {
	db *sql.DB
}

func NewPostgresStorage() (*PostgresStorage, error) {
	db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		goDotEnvVariable("POSTGRES_HOST"),
		goDotEnvVariable("POSTGRES_PORT"),
		goDotEnvVariable("POSTGRES_USER"),
		goDotEnvVariable("POSTGRES_PASSWORD"),
		goDotEnvVariable("POSTGRES_DB")))
	if err != nil {
		return nil, err
	}
	return &PostgresStorage{db: db}, nil
}

func (ps *PostgresStorage) Close() {
	ps.db.Close()
}

func (ps *PostgresStorage) Migrate() error {
	_, err := ps.db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			username VARCHAR(255) UNIQUE NOT NULL,
			password VARCHAR(255) NOT NULL
		);
		CREATE TABLE IF NOT EXISTS posts (
			id SERIAL PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			content TEXT NOT NULL,
			user_id INTEGER NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users (id)
		);
	`)
	return err
}

func (ps *PostgresStorage) CreateUser(u *User) error {
	row := ps.db.QueryRow(`
		INSERT INTO users (username, password)
		VALUES ($1, $2)
		RETURNING id;
	`, u.Username, u.Password)

	err := row.Scan(&u.ID)
	if err != nil {
		return err
	}

	return nil
}

func (ps *PostgresStorage) GetUserByUsername(username string) (*User, error) {
	row := ps.db.QueryRow(`
		SELECT id, username, password FROM users WHERE username = $1;
	`, username)

	u := &User{}
	err := row.Scan(&u.ID, &u.Username, &u.Password)
	if err != nil {
		return nil, err
	}
	return u, nil
}

func (ps *PostgresStorage) CreatePost(p *Post) error {
	row := ps.db.QueryRow(`
		INSERT INTO posts (title, content, user_id)
		VALUES ($1, $2, $3)
		RETURNING id;
	`, p.Title, p.Content, p.UserID)

	err := row.Scan(&p.ID)
	if err != nil {
		return err
	}
	return nil
}

func (ps *PostgresStorage) GetPostByID(id int) (*Post, error) {
	row := ps.db.QueryRow(`
		SELECT id, title, content, user_id FROM posts WHERE id = $1;
	`, id)

	p := &Post{}
	err := row.Scan(&p.ID, &p.Title, &p.Content, &p.UserID)
	if err != nil {
		return nil, err
	}
	return p, nil
}

func (ps *PostgresStorage) GetAllPosts() ([]*Post, error) {
	rows, err := ps.db.Query(`
		SELECT id, title, content, user_id FROM posts;
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	posts := []*Post{}
	for rows.Next() {
		p := &Post{}
		err := rows.Scan(&p.ID, &p.Title, &p.Content, &p.UserID)
		if err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func (ps *PostgresStorage) UpdatePost(p *Post) error {
	res, err := ps.db.Exec(`
		UPDATE posts SET title = $1, content = $2 WHERE id = $3;
	`, p.Title, p.Content, p.ID)
	if err != nil {
		return err
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("no rows affected")
	}

	return nil
}

func (ps *PostgresStorage) DeletePost(id int) error {
	_, err := ps.db.Exec(`
		DELETE FROM posts WHERE id = $1;
	`, id)
	return err
}
