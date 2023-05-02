import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/BookIndex.module.scss";
import Link from "next/link";
//  @/って書くとsrc/という意味になる

export default function Index() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

  const onClickBookDelete = async (book_id: number) => {
    await axios
      .delete(`http://localhost:3000/books/${book_id}`)
      .then(() => {
        setBooks(books.filter((book: Book) => book.id !== book_id));
      })
      .catch(() => {
        console.log(book_id);
      });
  };

  return (
    <>
      <div>
        <h1>Books/index</h1>
        {books.map((book: Book, index) => {
          return (
            <div className={styles.book} key={index}>
              {/* 一番上の要素にkeyを入れる */}
              {book.title}
              {book.body}
              <button onClick={() => onClickBookDelete(book.id)}>削除</button>
              <Link href={`books/${book.id}`}>詳細</Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
