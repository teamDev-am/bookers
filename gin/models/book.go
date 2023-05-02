package models

import (
	"api/ent"
	"context"
	"log"

	"github.com/gin-gonic/gin"
)

func CreateBook(client *ent.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		var book *ent.Book
		c.ShouldBind(&book)
		book, err := client.Book.Create().SetTitle(book.Title).SetBody(book.Body).Save(ctx)
		if err == nil {
			log.Println("book was created: ", book)
			c.JSON(200, book)
		} else {
			c.JSON(400, gin.H{"message": err.Error()})
		}
	}
}
