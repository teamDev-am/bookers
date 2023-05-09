import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export const BookDetail = () => {
  const router = useRouter();
  const bookId = router.query.id;

  const [book, setBook] = useState<Book>();
  useEffect(() => {
    if (!bookId) return;
    //リロードしたらクエリがなくなるからbookIdが使えないので、そのときは関数を走らせない。
    axios.get(`http://localhost:8080/books/${bookId}`).then((res) => {
      setBook(res.data);
    });
  }, [bookId]);

  return (
    <>
      <p>{book?.title}</p>
      <p>{book?.body}</p>
      {/* ?はbookがからの場合何も表示しない。オプショナルチェーン。useStateの初期値が殻判定されててなってる */}
      <Link href={`/books/edit/${bookId}`}>編集</Link>
      <br />
      <Link href={`/books`}>全体画面へ</Link>
    </>
  );
};
export default BookDetail;
//こっち表記じゃないとエラーになる。
