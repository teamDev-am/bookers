package models

import (
	"api/ent"
	"context"
	"log"
	"strconv"

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

func BookId(c *gin.Context) int {
	book_id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		log.Fatal(err)
	}
	return book_id
}

func UpdateBook(client *ent.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		var book *ent.Book
		c.ShouldBind(&book)
		book, err := client.Book.UpdateOneID(BookId(c)).SetBody(book.Body).SetTitle(book.Title).Save(ctx)
		if err == nil {
			log.Println("book was updated: ", book)
			c.JSON(200, book)
		} else {
			c.JSON(400, gin.H{"message": err.Error()})
		}
	}
}

func DestroyBook(client *ent.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		err := client.Book.DeleteOneID(BookId(c)).Exec(ctx)
		if err == nil {
			log.Println("book was deleted")
		} else {
			log.Fatal(err)
		}
	}
}

func GetBooks(client *ent.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		books, err := client.Book.Query().All(ctx)
		if err == nil {
			log.Println("got books")
			c.JSON(200, books)
		} else {
			c.JSON(400, gin.H{"message": err.Error()})
		}
	}
}

func GetBook(client *ent.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx := context.Background()
		book, err := client.Book.Get(ctx, BookId(c))
		if err == nil {
			log.Println("got book: ", book)
			c.JSON(200, book)
		} else {
			c.JSON(400, gin.H{"message": err.Error()})
		}
	}
}
