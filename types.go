package main

type APIServer struct {
	listenAddr string
	store      Storage
}

type User struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Post struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	UserID  int    `json:"user_id"`
}
