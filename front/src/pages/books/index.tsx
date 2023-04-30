import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/BookIndex.module.scss";
//  @/って書くとsrc/という意味になる

export default function Index() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

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
            </div>
          );
        })}
      </div>
    </>
  );
}
