import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
      {/* bookがからの場合何も表示しない。オプショナルチェーン。useStateの初期値が殻判定されててなってる */}
    </>
  );
};
export default BookDetail;
//こっち表記じゃないとエラーになる。
