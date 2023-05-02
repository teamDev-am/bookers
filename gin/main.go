package main

import (
	"api/models"
	"api/ent"
	"context"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

func main() {
	router := gin.Default()
	client, err := ent.Open("mysql", "root:root@tcp(db:3306)/mysql?parseTime=True")
	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
	}
	defer client.Close()
	// Run the auto migration tool.
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}


	router.POST("/books", models.CreateBook(client))
	router.PATCH("/books/:id", models.UpdateBook(client))
	router.DELETE("/books/:id", models.DestroyBook(client))
	router.GET("/books", models.GetBooks(client))

	router.Run()
}
