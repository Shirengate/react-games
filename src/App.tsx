import instance from "./api/axios";

export default function App() {
  instance({
    url: "/games",
    method: "get",
  }).then((e) => {
    console.log(e);
    return e;
  });

  return <div>App</div>;
}
