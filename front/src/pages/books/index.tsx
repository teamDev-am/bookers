import axios from "axios";
import { useEffect, useState } from "react";
import styles from "@/styles/BookIndex.module.scss";
//  @/って書くとsrc/という意味になる
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Index() {
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Book>();

  const onSubmit: SubmitHandler<Book> = async (data) => {
    await axios.post(`http://localhost:8080/books`, data).then((res) => {
      router.push(`/books/${res.data.id}`);
    });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/books").then((res) => {
      setBooks(res.data);
    });
  }, []);

  const onClickBookDelete = async (bookId: number) => {
    await axios
      .delete(`http://localhost:8080/books/${bookId}`)
      .then(() => {
        setBooks(books.filter((book: Book) => book.id !== bookId));
      })
      .catch(() => {
        console.log(bookId);
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>title</label>
            <input
              {...register("title", {
                required: "titleが入力必須されていません"
              })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div>
            <label>body</label>
            <input
              {...register("body", {
                required: "bodyが入力されていません" 
              })}
            />
            {errors.body && <p>{errors.body.message}</p>}
          </div>
          <div>
            <button type="submit">create book</button>
          </div>
        </form>
      </div>
    </>
  );
}
