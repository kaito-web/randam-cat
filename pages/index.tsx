import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
// cssの読み込み追加
import styles from "./index.module.css"

//  getseversidepropsから渡されるpropsの型
type IndexPageProps = {
    initialCatImageUrl: string;
};

const IndexPage: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
    const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
    const handleClick = async () => {
      const image = await fetchCatImage();
      setCatImageUrl(image.url);
    };
    
return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px",
        }}
      >
        きょうのにゃんこ🐱
      </button>
      <div style={{ marginTop: 8, maxWidth: 500 }}>
        <img src={catImageUrl} width="100%" height="auto" alt="猫" />
      </div>
    </div>
  );
};
export default IndexPage;

//サーバーサイドで実行する処理
export const getServerSideProps:  GetServerSideProps<IndexPageProps> = async () => {
    const image = await fetchCatImage();
    return{
        props: {
            initialCatImageUrl: image.url,
    },
 };
};
type Image = {
    url: string;
};
const fetchCatImage = async ():Promise<Image> =>{
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};
// fetchImage().then((image) => {
//     // (parameter) image: any 
//     console.log(image.alt);
// });
