import { useState, useEffect } from "react";
import { Post } from "./types/Post";

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);
  /*
  const loadMovies = () => {
    setLoading(true);
    fetch("https://api.b7web.com.br/cinema/")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setMovies(json);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  };
  */

  const loadPosts = async () => {
    setLoading(true);
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let json = await response.json();
    setLoading(false);
    setPosts(json);
  };

  return (
    <div className="p-5">
      {loading && <div>Carregando...</div>}
      {!loading && posts.length > 0 && (
        <>
          <p>Total de posts: {posts.length}</p>
          <div>
            {posts.map((item, index) => (
              <div key={index} className="my-4">
                <h4 className="font-bold">{item.title}</h4>
                <small>
                  #{item.id} - Usuário: {item.userId}
                </small>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {!loading && posts.length === 0 && <p>Não há posts para exibir.</p>}
    </div>
  );
};

export default App;
