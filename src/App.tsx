import { useState, useEffect, EventHandler, ChangeEvent } from "react";
import { Post } from "./types/Post";
import { PostForm } from "./components/PostForm";
import { PostItem } from "./components/PostItem";

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
  /*
  const handleAddClick = async () => {
    if (addTitleText && addBodyText) {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: addTitleText,
          body: addBodyText,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      let json = await response.json();
      if (json.id) {
        alert("Post adicionado com sucesso!");
      } else {
        alert("Ocorreu algum erro!");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };
  */

  const handleAddPost = async (title: string, body: string) => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body, userId: 1 }),
      headers: { "Content-type": "application/json" },
    });
    let json = await response.json();
    if (json.id) {
      alert("Post adicionado com sucesso!");
    } else {
      alert("Ocorreu algum erro!");
    }
  };

  return (
    <div className="p-5">
      {loading && <div>Carregando...</div>}

      <PostForm onAdd={handleAddPost} />

      {!loading && posts.length > 0 && (
        <>
          <p>Total de posts: {posts.length}</p>
          <div>
            {posts.map((item, index) => (
              <PostItem data={item} />
            ))}
          </div>
        </>
      )}
      {!loading && posts.length === 0 && <p>Não há posts para exibir.</p>}
    </div>
  );
};

export default App;
