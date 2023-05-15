import ReactLoading from "react-loading";

const Loading = () => (
  <div className="loading">
    <ReactLoading
      type={"spinningBubbles"}
      color={"#313131"}
      height={100}
      width={100}
    />
  </div>
);

export default Loading;
