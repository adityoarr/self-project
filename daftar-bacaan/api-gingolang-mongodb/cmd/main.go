package main

import (
	"api-gingolang-mongodb/internal/handlers"
	"api-gingolang-mongodb/internal/repositories"
	"api-gingolang-mongodb/pkg/database"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	mongoURI := os.Getenv("MONGO_URI")
	dbName := os.Getenv("DB_NAME")

	client := database.ConnectDB(mongoURI)
	defer client.Disconnect(nil)

	db := client.Database(dbName)

	itemRepo := repositories.NewItemRepository(db)
	itemHandler := handlers.NewItemHandler(itemRepo)

	r := gin.Default()

	r.POST("/items", itemHandler.CreateMultipleItems)
	r.GET("/items", itemHandler.GetItems)
	r.GET("/items/:id", itemHandler.GetItemByID)
	r.PUT("/items/:id", itemHandler.UpdateItem)
	r.DELETE("/items/:id", itemHandler.DeleteItem)

	r.Run(":8080")
}
