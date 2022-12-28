import { useState, useEffect, EventHandler, ChangeEvent } from "react";
import { Post } from "./types/Post";

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [addTitleText, setAddTitleText] = useState("");
  const [addBodyText, setAddBodyText] = useState("");

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

  const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTitleText(e.target.value);
  };

  const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAddBodyText(e.target.value);
  };

  const handleAddClick = () => {};

  return (
    <div className="p-5">
      {loading && <div>Carregando...</div>}
      <fieldset className="border-2 mb-3 p-3">
        <legend>Adicionar novo post</legend>
        <input
          value={addTitleText}
          onChange={handleAddTitleChange}
          className="block border"
          type="text"
          placeholder="Digite um título"
        />
        <textarea
          value={addBodyText}
          onChange={handleAddBodyChange}
          className="block border"
        ></textarea>
        <button className="block border" onClick={handleAddClick}>
          Adicionar
        </button>
      </fieldset>
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
