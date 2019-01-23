import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const LoginForm = ({ login, mdp, onLogin, handleChange }) => (
  <form
    onSubmit={() => onLogin(login, mdp)}
    style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "80vw",
      margin: "auto",
      marginTop: "20px"
    }}
  >
    <input
      type="text"
      placeholder="login"
      value={login}
      onChange={handleChange("login")}
    />
    <input
      type="password"
      placeholder="password"
      value={mdp}
      onChange={handleChange("mdp")}
    />
    <button type="submit">Login</button>
  </form>
);

class App extends Component {
  state = {
    login: "",
    mdp: "",
    posts: []
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  getPosts = async () => {
    try {
      const access_token = localStorage.getItem("token");
      const options = {
        method: "get",
        headers: {
          Authorization: `${access_token}`,
          "Content-Type": "application/json"
        },
        url: "http://localhost:5000/api/v1/posts"
      };
      let res = await axios(options);
      this.setState({ posts: res.data.posts });
    } catch (err) {
      alert("erreur");
    }
  };

  login = async (email, password) => {
    console.log(email, password);
    try {
      let res = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password
      });
      localStorage.setItem("token", res.data.token);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className="App">
        <LoginForm
          handleChange={this.handleChange}
          onLogin={this.login}
          login={this.state.login}
          mdp={this.state.mdp}
        />
        <button onClick={this.getPosts}>Get posts</button>
        {this.state.posts.map(p => (
          <div>{p.title}</div>
        ))}
      </div>
    );
  }
}

export default App;
