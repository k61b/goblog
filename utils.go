package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
)

func (s *APIServer) createToken(userID int) (string, error) {
	claims := &jwt.MapClaims{
		"user_id":   userID,
		"expiresAt": strconv.Itoa(int(time.Now().Add(time.Hour * 24).Unix())),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(goDotEnvVariable("JWT_SECRET")))
}

func (s *APIServer) parseToken(token string) (int, error) {
	claims := &jwt.MapClaims{}

	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(goDotEnvVariable("JWT_SECRET")), nil
	})

	if err != nil {
		return 0, err
	}

	userId, err := strconv.Atoi(fmt.Sprintf("%v", (*claims)["user_id"]))
	if err != nil {
		return 0, err
	}

	return userId, nil
}

func (s *APIServer) authMiddleware(c *fiber.Ctx) error {
	token := c.Cookies("token")
	if token == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid token",
		})
	}

	userId, err := s.parseToken(token)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Invalid token",
		})
	}

	c.Locals("userId", userId)

	return c.Next()
}

func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
